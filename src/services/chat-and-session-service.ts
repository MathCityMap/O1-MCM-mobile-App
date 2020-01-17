import {Injectable} from '@angular/core';
import {Events, Platform, ToastController} from 'ionic-angular';
import {Observable, TimeInterval} from "rxjs/Rx";
import {Session} from '../app/api/models/session';
import {Storage} from "@ionic/storage";
import {SessionService} from '../app/api/services/session.service';
import {SessionUser} from '../app/api/models/session-user';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {GpsService} from './gps-service';
import {Subscription} from 'rxjs/Subscription';
import {SessionUserService} from '../app/api/services/session-user.service';
import {SessionChatMessageResponse} from "../app/api/models/session-chat-message-response";
import {SessionChatService} from "../app/api/services/session-chat.service";
import {SessionChatResponse} from "../app/api/models/session-chat-response";
import {
    ILocalNotification, ILocalNotificationActionType,
    LocalNotifications
} from '@ionic-native/local-notifications';
import {TranslateService} from '@ngx-translate/core';
import {checkAvailability} from '@ionic-native/core';
import {SessionEventService} from "../app/api/services/session-event.service";
import {EventsAddRequest} from "../app/api/models/events-add-request";
import {EventAddRequest} from "../app/api/models/event-add-request";
import {SessionUserLeaderboardService} from "../app/api/services/session-user-leaderboard.service";
import {LeaderboardResponse} from "../app/api/models/leaderboard-response";
import * as moment from 'moment';
import {SessionUserResponse} from "../app/api/models/session-user-response";
import {SessionUsersResponse} from "../app/api/models/session-users-response";
import {forEach} from "typescript-collections/dist/lib/arrays";

export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    media: string[];
    status: string;
}

export class LeaderBoardItemRespone {

}

export class UserInfo {
    id: string;
    name?: string;
    token: string;
    avatar?: string;
}

// TODO Refactor, so that only important session params are exposed
export class SessionInfo {
    session: Session;
    sessionUser: SessionUser;
    started: boolean;
    authorEvents_lastPull: number; // Unix timestamp
}

@Injectable()
export class ChatAndSessionService {
    private static POSITION_PUSH_INTERVAL_IN_SECS = 1;
    private static CHAT_PULL_INTERVAL_IN_SECS = 15;
    private static EVENTS_POST_INTERVAL_IN_SECS = 10;
    private static CHAT_PULL_INTERVAL_USER_SEES_MESSAGES_IN_SECS = 2;
    private static STORAGE_KEY_SESSION = 'ChatAndSessionService.activeSession';
    private static USER_EVENTS = [];

    private subject = new ReplaySubject<SessionInfo>(1);
    private timerBackground = Observable.interval(ChatAndSessionService.CHAT_PULL_INTERVAL_IN_SECS * 1000).timeInterval();
    private timerUserSeesMessages = Observable.interval(ChatAndSessionService.CHAT_PULL_INTERVAL_USER_SEES_MESSAGES_IN_SECS * 1000).timeInterval();
    private sendEventsTimer = Observable.interval(ChatAndSessionService.EVENTS_POST_INTERVAL_IN_SECS * 1000);
    private getLeaderboardTimer = Observable.interval(ChatAndSessionService.EVENTS_POST_INTERVAL_IN_SECS * 1000);
    private getAuthorEventsTimer = Observable.interval(ChatAndSessionService.CHAT_PULL_INTERVAL_IN_SECS * 1000);
    private pushPositionTimer = Observable.interval(ChatAndSessionService.POSITION_PUSH_INTERVAL_IN_SECS * 1000);
    private getLeaderboardSubscription: Subscription;
    private sendEventsSubscription: Subscription;
    private positionSubscription: Subscription;
    private chatSubscription: Subscription;
    private getAuthorEventsSubscription: Subscription;
    private lastPositionPush: number = 0;
    private transientActiveSession: SessionInfo;
    private coordinatesList: Coordinates[] = [];


    // TODO should be reloaded if session changes
    // if a new team enters session, authors receiver list should be updated
    private receivers: SessionUserResponse[] = [];
    private userSeesNewMessages: boolean;
    private alreadySeenMessages = {};
    private pastLocalNotifications: ILocalNotification[] = [];

    private leaderBoard: LeaderboardResponse = {leaderboard: []};
    private newMsgNumber: number = 0;

    constructor(private events: Events,
                private storage: Storage,
                private sessionService: SessionService,
                private sessionUserService: SessionUserService,
                private sessionChatService: SessionChatService,
                private sessionEventService: SessionEventService,
                private gpsService: GpsService,
                private localNotifications: LocalNotifications,
                private translate: TranslateService,
                private toast: ToastController,
                private leaderBoardService: SessionUserLeaderboardService,
                private platform: Platform) {
    }

    public async updateSession(sessionInfo) {
        await this.storage.set(ChatAndSessionService.STORAGE_KEY_SESSION, sessionInfo);
    }

    public async init() {
        console.log("Init chatservice");
        await this.getActiveSession();
        this.subscribeForAndSendEvents(this.transientActiveSession);
        if (checkAvailability(LocalNotifications.pluginRef, null, LocalNotifications.pluginName) === true) {
            this.localNotifications.on('click')
                .subscribe((next) => {
                    console.log('local notification has been pressed');
                    console.log(next);
                });
        }
    }

    async exit() {
        this.subscribeForAndSendEvents(null);
    }

    /**
     * Converts api SessionChatMessageResponse to ChatMessage
     * @param msg
     * @param sessionUser
     */
    private getChatMessage(msg: SessionChatMessageResponse, sessionUser: SessionUser): ChatMessage {
        msg.time = this.formatTime(msg.time);
        let timezoneOffset = new Date().getTimezoneOffset();
        let chatMessage = {
            messageId: msg.messageId,
            userId: msg.senderId, // if author id eq current user
            userName: msg.username, // team user name
            userAvatar: './assets/to-user.jpg', // TODO User Avatar
            toUserId: msg.receiverId, // toUserId (depends if this is written  or received
            time: Date.parse(msg.time) - (timezoneOffset * 60000),
            message: msg.message,
            status: msg.status,
            media: msg.media
        };
        return chatMessage;
    }

    /**
     * Helper: Converts formats time field because iOS does not accept yyyy-mm-dd (ISO 8601) date format
     * @param time
     */
    private formatTime(time: string) {
        if (this.platform.is('ios')) {
            let originalTime = time;
            let dateParts = originalTime.substring(0, 10).split('-');
            let timePart = originalTime.substr(11);
            return dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timePart;
        } else return time;
    }

    /**
     * Returns all Chat Messages
     * @param sessionInfo
     * @param receiverToken
     */
    getMsgList(sessionInfo: SessionInfo, receiverToken: string): Observable<ChatMessage[]> {
        let params: SessionChatService.GetMessagesParams = {
            sessionCode: sessionInfo.session.code,
            senderToken: sessionInfo.sessionUser.token,
            receiverToken: receiverToken
        };
        return this.sessionChatService.getMessages(params).map(
            (chatResponse: SessionChatResponse): ChatMessage[] => {
                let chatMessages: ChatMessage[] = [];
                chatResponse.messages.forEach((msg: SessionChatMessageResponse) => {
                    chatMessages.push(this.getChatMessage(msg, sessionInfo.sessionUser));
                });
                return chatMessages;
            }
        );
    }

    getNewMsgs(sessionInfo: SessionInfo, receiverToken: string): Observable<ChatMessage[]> {
        let params: SessionChatService.GetNewMessagesParams = {
            sessionCode: sessionInfo.session.code,
            senderToken: sessionInfo.sessionUser.token,
            receiverToken: receiverToken
        };
        return this.sessionChatService.getNewMessages(params).map(
            (newMessages: SessionChatMessageResponse[]): ChatMessage[] => {
                this.newMsgNumber += newMessages.length;
                let chatMessages: ChatMessage[] = [];
                newMessages.forEach((msg: SessionChatMessageResponse) => {
                    chatMessages.push(this.getChatMessage(msg, sessionInfo.sessionUser));
                });
                return chatMessages;
            }
        );
    }

    /**
     * Sends a message to all receivers
     *
     * FIXME Send message to selected receivers
     *
     * @param msg
     * @param sessionInfo
     */
    sendMsg(msg: ChatMessage, sessionInfo: SessionInfo) {
        let msgsSend: Array<any> = [];
        console.log("Sending chat message: ", msg);
        this.receivers.forEach(receiver => {
            msgsSend.push(this.sessionChatService.sendMessageToUser({
                receiverToken: receiver.token,
                senderToken: sessionInfo.sessionUser.token,
                sessionCode: sessionInfo.session.code,
                chatMessage: msg // FIXME ChatMessage convert to SessionChatMessageRequest (msg = string)
            }).toPromise().then((msg: SessionChatMessageResponse) => {
                return this.getChatMessage(msg, sessionInfo.sessionUser);
            }));
        });

        return Promise.all(msgsSend).then((msgs: ChatMessage[]) => {
            console.info("New Chat Messages were send: [".concat(msgs.length.toString(), "]"));
            return msgs;
        });
    }

    async postMedia(file: FormData, sessionInfo: SessionInfo){
        try {
            let x = await this.sessionChatService.postMedia(file, sessionInfo.session.code, sessionInfo.sessionUser.token);
            return this.sessionService.rootUrl.replace("index.php", "") + x.body;
        }
        catch (e) {
            console.log("ERROR sending media to chat: ", e);
            return null;
        }
    }

    async getUserInfo(): Promise<UserInfo> {
        let sessionInfo = await this.getActiveSession();
        if (sessionInfo != null) {
            const userInfo: UserInfo = {
                id: sessionInfo.sessionUser.id,
                name: sessionInfo.sessionUser.team_name,
                token: sessionInfo.sessionUser.token,
                avatar: './assets/user.jpg' // FIXME User Avatar
            };
            return new Promise<UserInfo>(resolve => resolve(userInfo));
        }
    }

    async setActiveSession(session: Session, teamName: string, teamMembers: string[]) {
        console.log("Joining session.");
        let sessionUser = await this.sessionService.joinSession({
            sessionCode: session.code,
            request: {teamName: teamName, teamMembers: teamMembers}
        }).toPromise();
        if (sessionUser) {
            console.log("Successfully joined. Storing active session");
            let sessionInfo = {
                session: session,
                sessionUser: sessionUser,
                started: false,
                authorEvents_lastPull: moment().unix()
            };
            await this.storage.set(ChatAndSessionService.STORAGE_KEY_SESSION, sessionInfo);
            this.transientActiveSession = sessionInfo;
            console.log("Session stored");
        } else {
            console.log("Error joining session.");
        }
    }

    async getActiveSession(): Promise<SessionInfo> {
        console.log("Getting Active session.");
        this.transientActiveSession = await this.storage.get(ChatAndSessionService.STORAGE_KEY_SESSION);
        console.log(this.transientActiveSession);
        if (this.transientActiveSession) {
            console.log("Found active session. Checking if still active.");
            // Leave Session automatically when time has run out
            let currentTimeUnix = moment().unix();
            console.log("Current time: " + currentTimeUnix);
            let endTimeInUnix = moment(this.transientActiveSession.session.ends_at).unix();
            console.log("End time: " + endTimeInUnix);
            if (currentTimeUnix > endTimeInUnix) {
                console.log("Session ended. Exit session.")
                this.exitActiveSession();
            } else {
                console.log("Session running.");
            }
        }
        return this.transientActiveSession;
    }

    public getSessionInfo(): SessionInfo {
        return this.transientActiveSession;
    }

    async exitActiveSession() {
        await this.sendUserEvents();
        await this.storage.remove(ChatAndSessionService.STORAGE_KEY_SESSION);
        this.subscribeForAndSendEvents(null);
        if (this.transientActiveSession != null) {
            await this.sessionUserService.leaveSession({
                userToken: this.transientActiveSession.sessionUser.token,
                sessionCode: this.transientActiveSession.session.code
            }).toPromise();
        }
        // Reset watch parameters
        this.receivers = [];
        this.alreadySeenMessages = {};
        this.pastLocalNotifications = [];
        this.leaderBoard = {leaderboard: []};
        this.newMsgNumber = 0;
        this.transientActiveSession = null;
    }

    getSubject(): Subject<SessionInfo> {
        return this.subject;
    }

    private async subscribeForAndSendEvents(sessionInfo: SessionInfo) {
        this.subject.next(sessionInfo);
        if (sessionInfo) {
            if (this.positionSubscription) {
                this.positionSubscription.unsubscribe();
            }

            this.positionSubscription = this.pushPositionTimer.subscribe(async tick => {
                let position = this.gpsService.getLastPosition();
                this.coordinatesList.push(position.coords);
                if (this.coordinatesList.length >= 15) {
                    console.log("calculate sums");
                    let lat = 0;
                    let lon = 0;
                    forEach(this.coordinatesList, function (coords) {
                        lat += coords.latitude;
                        lon += coords.longitude;
                    });
                    lat = lat / this.coordinatesList.length;
                    lon = lon / this.coordinatesList.length;
                    console.log(lat + ", " + lon);
                    this.coordinatesList = [];
                    try {
                        await this.sessionUserService.updatePosition({
                            sessionCode: sessionInfo.session.code,
                            userToken: sessionInfo.sessionUser.token,
                            latitude: lat,
                            longitude: lon
                        }).toPromise();
                    } catch (e) {
                        console.error("ChatAndSessionService: Could not push position", e);
                    }
                }
            });

            if (this.sendEventsSubscription) {
                this.sendEventsSubscription.unsubscribe()
            }

            this.sendEventsSubscription = this.sendEventsTimer.subscribe(tick => {
                this.sendUserEvents()
            });

            if (this.getLeaderboardSubscription) {
                this.getLeaderboardSubscription.unsubscribe()
            }

            this.getLeaderboardSubscription = this.getLeaderboardTimer.subscribe(tick => {
                this.fetchLeaderboard();
            });

            if (this.getAuthorEventsSubscription) {
                this.getAuthorEventsSubscription.unsubscribe()
            }

            this.getAuthorEventsSubscription = this.getAuthorEventsTimer.subscribe(tick => {
                this.fetchAuthorEvents();
            });

            this.determineDefaultReceivers(sessionInfo).then(receivers => {
                this.receivers = receivers;
            });

            this.refreshChatSubscription(sessionInfo);
            if (!await this.localNotifications.hasPermission()) {
                await this.localNotifications.requestPermission();
            }
        } else {
            this.receivers = [];
            if (this.positionSubscription) {
                this.positionSubscription.unsubscribe();
                this.positionSubscription = null;
            }

            // TODO i think this type of code is a little bit confusing. refactor to subscribe/unsubscribe methods.
            if (this.chatSubscription) {
                this.chatSubscription.unsubscribe();
                this.chatSubscription = null;
            }
            if (this.sendEventsSubscription) {
                this.sendEventsSubscription.unsubscribe();
                this.sendEventsSubscription = null;
            }
            if (this.getLeaderboardSubscription) {
                this.getLeaderboardSubscription.unsubscribe();
                this.getLeaderboardSubscription = null;
            }
            if (this.getAuthorEventsSubscription) {
                this.getAuthorEventsSubscription.unsubscribe();
                this.getAuthorEventsSubscription = null;
            }
        }
    }

    private refreshChatSubscription(sessionInfo: SessionInfo) {
        console.debug('refreshChatSubscription()');
        if (this.chatSubscription) {
            this.chatSubscription.unsubscribe();
        }

        this.chatSubscription = this.getRelevantTimer().subscribe(tick => {
            this.checkForNewMessages(sessionInfo);
        });
    }

    private getRelevantTimer(): Observable<TimeInterval<any>> {
        if (this.userSeesNewMessages) {
            return this.timerUserSeesMessages;
        } else {
            return this.timerBackground;
        }
    }

    public async checkForNewMessages(sessionInfo: SessionInfo) {
        console.log("check for new msgs ...");
        this.receivers.forEach(async receiver => {
            let messages = await this.getNewMsgs(sessionInfo, receiver.token).toPromise();
            // foreach msg -> publish new event
            messages.forEach((msg: ChatMessage) => {
                // console.log("chat msgs received: ", msg);
                this.events.publish('chat:received', msg);
                let alreadySeen = this.alreadySeenMessages[msg.messageId];
                if (!alreadySeen) {
                    this.alreadySeenMessages[msg.messageId] = true;
                    if (!this.userSeesNewMessages) {
                        console.info(`scheduling notfication for ${msg.userName}: ${msg.message}`);
                        let notification;
                        this.pastLocalNotifications.push(notification = {
                            id: this.pastLocalNotifications.length + 1,
                            title: msg.userName,
                            text: msg.message,
                            silent: false,
                            actions: [<any>{
                                id: 'reply',
                                type: ILocalNotificationActionType.INPUT,
                                title: this.translate.instant('a_chat_reply'),
                                emptyText: this.translate.instant('a_chat_type_message'),
                                submitTitle: this.translate.instant('a_chat_reply'),
                                foreground: true,
                                launch: true
                            }],

                        });
                        this.localNotifications.schedule(notification);
                        this.toast.create({
                            message: `${msg.userName}: ${msg.message}`,
                            duration: 3000,
                            position: 'bottom'
                        }).present();
                    }
                }
            });
        });
    }

    public async determineDefaultReceivers(sessionInfo: SessionInfo): Promise<SessionUserResponse[]> {
        let receivers: SessionUserResponse[] = [];
        if (!sessionInfo.sessionUser.wp_user_id || sessionInfo.sessionUser.wp_user_id <= 0) {

            let admin: SessionUserResponse = await this.sessionService.getSessionAdmin({
                sessionCode: sessionInfo.session.code,
                userToken: sessionInfo.sessionUser.token
            }).toPromise().then(res => {
                return res;
            });
            receivers.push(admin);
        } else {
            let users: SessionUserResponse[] = await this.sessionService.getSessionUsers(sessionInfo.session.code)
                .toPromise()
                .then((users: SessionUsersResponse) => {
                    return users.users;
                });

            users.filter((user: SessionUserResponse) => {
                return !(user.id === sessionInfo.sessionUser.id)
            })

            receivers = users;
        }

        return Promise.all(receivers);
    }

    public getReceivers(): SessionUserResponse[] {
        return this.receivers;
    }

    public setUserSeesNewMessages(value: boolean) {
        let refreshSubscription = value != this.userSeesNewMessages && this.transientActiveSession;
        this.userSeesNewMessages = value;
        if (refreshSubscription) {
            this.refreshChatSubscription(this.transientActiveSession);
        }
    }

    /*
    Session User Events
    Was haben Krokodile und Italiener gemeinsam?
     */
    private async sendUserEvents() {
        let sessionInfo = this.transientActiveSession;
        if (sessionInfo) {
            if (ChatAndSessionService.USER_EVENTS.length > 0) {
                let position = this.gpsService.getLastPosition();
                console.log(position.coords);
                if(position.coords){
                    ChatAndSessionService.USER_EVENTS.forEach(event => {
                        event.lat = position.coords.latitude.toString();
                        event.lon = position.coords.longitude.toString();
                    });
                }
                let eventsAddRequest = new EventsAddRequest();
                eventsAddRequest.events = ChatAndSessionService.USER_EVENTS;
                let params = {
                    events: eventsAddRequest,
                    sessionCode: sessionInfo.session.code,
                    userToken: sessionInfo.sessionUser.token
                };
                let sessionEventsResponse = await this.sessionEventService.addEvents(params).toPromise();
                console.log(ChatAndSessionService.USER_EVENTS);
                ChatAndSessionService.USER_EVENTS = [];
            }
        }
    }

    public addUserEvent(title: string, details: string, task_id: string) {
        let eventAddRequest = new EventAddRequest();
        eventAddRequest.title = title;
        eventAddRequest.details = details;
        eventAddRequest.task_id = task_id;
        eventAddRequest.lat = "999";
        eventAddRequest.lon = "999";
        ChatAndSessionService.USER_EVENTS.push(eventAddRequest)
    }

    private async fetchLeaderboard() {
        let sessionInfo = this.transientActiveSession;
        if (sessionInfo) {
            if (sessionInfo.session.has_leaderboard) {
                let params = new class implements SessionUserLeaderboardService.GetLeaderboardParams {
                    sessionCode: string;
                    userToken: string;
                };
                params.sessionCode = sessionInfo.session.code;
                params.userToken = sessionInfo.sessionUser.token;
                let leaderboard = await this.leaderBoardService.getLeaderboard(params).toPromise();
                console.log(leaderboard);
                this.leaderBoard = leaderboard;
            }
        }
    }

    private async fetchAuthorEvents() {
        let sessionInfo = this.transientActiveSession;
        if (sessionInfo) {
            let params = new class implements SessionEventService.GetAuthorEventsParams {
                sessionCode: string;
                userToken: string;
                unixTime: string
            };
            params.sessionCode = sessionInfo.session.code;
            params.userToken = sessionInfo.sessionUser.token;
            params.unixTime = sessionInfo.authorEvents_lastPull.toString();
            let authorEvents = await this.sessionEventService.getAuthorEvents(params).toPromise();
            console.log(authorEvents);

            // Update this sessions last update info
            sessionInfo.authorEvents_lastPull = moment().unix();
            this.transientActiveSession = sessionInfo;
            await this.updateSession(sessionInfo);
            this.parseAuthorEvents(authorEvents);
        }
    }

    private parseAuthorEvents(events) {
        /*
        Two cases right now:
        1. Author kicks a user: If user == current session user > Leave active session
        2. Author updates session: Get updated session
         */
        let that = this;
        events.events.forEach(function (event) {
            if (event.title === 'event_author_kick_user') {
                try {
                    let details = JSON.parse(event.details);
                    if (details.userToken == that.transientActiveSession.sessionUser.token) {
                        that.events.publish('user:kicked', 'self');
                    } else {
                        that.events.publish('user:kicked', 'other');
                    }
                } catch (e) {
                    console.log("Could not parse details of author event.");
                }

            } else if (event.title === 'event_author_update_session') {
                that.sessionService.getSessionByCode(that.transientActiveSession.session.code).toPromise().then(async session => {
                    that.transientActiveSession.session = session;
                    await that.updateSession(that.transientActiveSession);
                    that.events.publish('session:updated', that.transientActiveSession);
                });

            } else if (event.title === 'event_author_assign_task') {
                try {
                    let details = JSON.parse(event.details);
                    if (details.userToken == that.transientActiveSession.sessionUser.token) {
                        that.transientActiveSession.sessionUser.assigned_task_id = details.assigned_task_id;
                        that.updateSession(that.transientActiveSession);
                        that.events.publish('user:assigned_task', details.assigned_task_id);
                    }
                } catch (e) {
                    console.log(e);
                }
            } else {

            }
        });
    }

    public getLeaderboard() {
        return this.leaderBoard.leaderboard;
    }

    public getNewMsgNumber(): number {
        return this.newMsgNumber;
    }

    public setNewMsgNumber(n: number) {
        this.newMsgNumber = n;
    }
}

