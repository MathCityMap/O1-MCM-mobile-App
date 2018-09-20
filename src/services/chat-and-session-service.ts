import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { Session } from '../app/api/models/session';
import { Storage } from "@ionic/storage";
import { SessionService } from '../app/api/services/session.service';
import { SessionUser } from '../app/api/models/session-user';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { GpsService } from './gps-service';
import { Subscription } from 'rxjs/Subscription';
import { SessionUserService } from '../app/api/services/session-user.service';
import { SessionChatMessageResponse } from "../app/api/models/session-chat-message-response";
import { SessionChatService } from "../app/api/services/session-chat.service";
import { SessionChatResponse } from "../app/api/models/session-chat-response";
import { Geoposition } from "@ionic-native/geolocation";

export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
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
}

@Injectable()
export class ChatAndSessionService {
    private static POSITION_PUSH_INTERVAL_IN_SECS = 15;
    private static CHAT_PULL_INTERVAL_IN_SECS = 15;
    private static STORAGE_KEY_SESSION = 'ChatAndSessionService.activeSession';

    private subject = new ReplaySubject<SessionInfo>(1);
    private timer = Observable.interval(ChatAndSessionService.CHAT_PULL_INTERVAL_IN_SECS * 1000).timeInterval();
    private positionSubscription: Subscription;
    private chatSubscription: Subscription;
    private lastPositionPush: number = 0;
    private lastPositionPushLatency: number = 0;

    // TODO should be reloaded if session changes
    // if a new team enters session, authors receiver list should be updated
    private receivers : SessionUser[] = [];

    constructor(private events: Events,
                private storage: Storage,
                private sessionService: SessionService,
                private sessionUserService: SessionUserService,
                private sessionChatService: SessionChatService,
                private gpsService: GpsService) {
        this.init();
    }

    async init() {
        let sessionInfo = await this.getActiveSession();
        let receivers = await this.determineDefaultReceivers(sessionInfo);
        this.setReceivers(receivers);
        this.subscribeForAndSendEvents(sessionInfo);
    }

    /**
     * Converts api SessionChatMessageResponse to ChatMessage
     * @param msg
     * @param sessionUser
     */
    static getChatMessage(msg: SessionChatMessageResponse, sessionUser : SessionUser): ChatMessage {
        let chatMessage = {
            messageId: msg.messageId,
            userId: msg.senderId, // if author id eq current user
            userName: msg.username, // team user name
            userAvatar: './assets/to-user.jpg', // TODO User Avatar
            toUserId: msg.receiverId, // toUserId (depends if this is written  or received
            time: Date.parse(msg.time),
            message: msg.message,
            status: msg.status
        };
        return chatMessage;
    }

    /**
     * Returns all Chat Messages
     * @param sessionInfo
     * @param receiverToken
     */
    getMsgList(sessionInfo : SessionInfo, receiverToken : string): Observable<ChatMessage[]> {
      let params : SessionChatService.GetMessagesParams = {
        sessionCode: sessionInfo.session.code,
        senderToken: sessionInfo.sessionUser.token,
        receiverToken: receiverToken
      };
        return this.sessionChatService.getMessages(params).map(
            (chatResponse : SessionChatResponse) : ChatMessage[] => {
                let chatMessages : ChatMessage[] = [];
                chatResponse.messages.forEach((msg : SessionChatMessageResponse) => {
                    chatMessages.push(ChatAndSessionService.getChatMessage(msg, sessionInfo.sessionUser));
                });
                return chatMessages;
            }
        );
    }

    getNewMsgs(sessionInfo : SessionInfo, receiverToken : string): Observable<ChatMessage[]> {
        let params : SessionChatService.GetNewMessagesParams = {
            sessionCode: sessionInfo.session.code,
            senderToken: sessionInfo.sessionUser.token,
            receiverToken: receiverToken
        };
        return this.sessionChatService.getNewMessages(params).map(
            (newMessages : SessionChatMessageResponse[]) : ChatMessage[] => {
                let chatMessages : ChatMessage[] = [];
                newMessages.forEach((msg : SessionChatMessageResponse) => {
                    chatMessages.push(ChatAndSessionService.getChatMessage(msg, sessionInfo.sessionUser));
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
        let msgsSend : Array<any> = [];
        console.log("Sending chat message: ", msg);
        this.receivers.forEach(receiver => {
            msgsSend.push(this.sessionChatService.sendMessageToUser({
                receiverToken: receiver.token,
                senderToken: sessionInfo.sessionUser.token,
                sessionCode: sessionInfo.session.code,
                chatMessage: msg // FIXME ChatMessage convert to SessionChatMessageRequest (msg = string)
            }).toPromise().then((msg : SessionChatMessageResponse) => {
                return ChatAndSessionService.getChatMessage(msg, sessionInfo.sessionUser);
            }));
        });

        return Promise.all(msgsSend).then((msgs : ChatMessage[]) => {
            console.info("New Chat Messages were send: [".concat( msgs.length.toString() , "]"));
            return msgs;
        });
    }

    async getUserInfo(): Promise<UserInfo> {
        let sessionInfo = await this.getActiveSession();
        const userInfo: UserInfo = {
            id: sessionInfo.sessionUser.id,
            name: sessionInfo.sessionUser.team_name,
            token: sessionInfo.sessionUser.token,
            avatar: './assets/user.jpg' // FIXME User Avatar
        };
        return new Promise<UserInfo>(resolve => resolve(userInfo));
    }

    async setActiveSession(session: Session, teamName: string, teamMembers: string[]) {

        let sessionUser = await this.sessionService.joinSession({
            sessionCode: session.code,
            request: {teamName: teamName, teamMembers: teamMembers}
        }).toPromise();
        let sessionInfo = {
            session: session,
            sessionUser: sessionUser
        };
        await this.storage.set(ChatAndSessionService.STORAGE_KEY_SESSION, sessionInfo);
        this.subscribeForAndSendEvents(sessionInfo);
    }

    async getActiveSession(): Promise<SessionInfo> {
        return this.storage.get(ChatAndSessionService.STORAGE_KEY_SESSION);
    }

    async exitActiveSession() {
        await this.storage.remove(ChatAndSessionService.STORAGE_KEY_SESSION);
        this.subscribeForAndSendEvents(null);
    }

    getSubject(): Subject<SessionInfo> {
        return this.subject;
    }

    private subscribeForAndSendEvents(sessionInfo: SessionInfo) {
        this.subject.next(sessionInfo);
        if (sessionInfo) {
            if (this.positionSubscription) {
                this.positionSubscription.unsubscribe();
            }

            if(this.chatSubscription) {
                this.chatSubscription.unsubscribe();
            }

            this.positionSubscription = this.gpsService.watchPosition().subscribe(async (geoposition : Geoposition) => {
                let currentTimestamp = new Date().getTime();
                if (geoposition && geoposition.coords
                    && currentTimestamp - ChatAndSessionService.POSITION_PUSH_INTERVAL_IN_SECS * 1000 > this.lastPositionPush) {
                    this.lastPositionPush = currentTimestamp;
                    try {
                        await this.sessionUserService.updatePosition({
                            sessionCode: sessionInfo.session.code,
                            userToken: sessionInfo.sessionUser.token,
                            latitude: geoposition.coords.latitude,
                            longitude: geoposition.coords.longitude
                        }).toPromise();
                    } catch (e) {
                        console.error("ChatAndSessionService: Could not push position", e);
                    }
                    this.lastPositionPushLatency = new Date().getTime() - currentTimestamp;
                }
            });

            this.chatSubscription = this.timer.subscribe(tick => {
                let chatMsgs : Array<any> = [];
                console.log("check for new msgs ...");
                this.receivers.forEach(receiver => {
                    chatMsgs.push(this.getNewMsgs(sessionInfo, receiver.token).toPromise().then((messages) => {
                        // foreach msg -> publish new event
                        messages.forEach((msg : ChatMessage) => {
                            // console.log("chat msgs received: ", msg);
                            this.events.publish('chat:received', msg);
                        });
                    }));
                });
            });

            // use rxjs timer for recurring checks

        } else {
            if (this.positionSubscription) {
                this.positionSubscription.unsubscribe();
                this.positionSubscription = null;
            }

            // TODO i think this type of code is a little bit confusing. refactor to subscribe/unsubscribe methods.
            if(this.chatSubscription) {
                this.chatSubscription.unsubscribe();
                this.chatSubscription = null;
            }
        }
    }

    private async determineDefaultReceivers(sessionInfo : SessionInfo) : Promise<SessionUser[]> {
        let receivers : SessionUser[] = [];
        if(!sessionInfo.sessionUser.wp_user_id || sessionInfo.sessionUser.wp_user_id <= 0) {
            let admin : SessionUser = await this.sessionService.getSessionAdmin(sessionInfo.session.code).toPromise().then(res => {
                return res;
            });
            receivers.push(admin);
        } else {
            let users: SessionUser[] = await this.sessionService.getSessionUsers(sessionInfo.session.code)
                .toPromise()
                .then((users: SessionUser[]) => {
                    return users;
            });

            users.filter((user : SessionUser) => {
                return !(user.id === sessionInfo.sessionUser.id)
            })

            receivers = users;
        }

        return Promise.all(receivers);
    }

    private setReceivers(receivers : SessionUser[]) : void {
        this.receivers = receivers;
    }

    public getReceivers() : SessionUser[] {
        return this.receivers;
    }
}

