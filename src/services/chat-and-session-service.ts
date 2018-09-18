import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
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
import {SessionChatService} from "../app/api/services/session-chat.service";
import {SessionChatResponse} from "../app/api/models/session-chat-response";

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
    private static STORAGE_KEY_SESSION = 'ChatAndSessionService.activeSession';

    private subject = new ReplaySubject<SessionInfo>(1);
    private positionSubscription: Subscription;
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
        let receivers = await this.determineDefaulltReceivers(sessionInfo);
        this.setReceivers(receivers);
        this.subscribeForAndSendEvents(sessionInfo);
    }

    /**
     * Converts api Message to ChatMessage
     * @param msg
     * @param sessionUser
     */
    static getChatMessage(msg: SessionChatMessageResponse, sessionUser : SessionUser): ChatMessage {
        // TODO Think about this flip of ids, is it neccessary?
        const userId  = msg.senderId == sessionUser.id ? msg.senderId : msg.receiverId;
        const toUserId = msg.receiverId == sessionUser.id ? msg.receiverId : msg.senderId;

        return {
            messageId: msg.messageId,
            userId: userId, // if author id eq current user
            userName: msg.username, // team user name
            userAvatar: './assets/to-user.jpg', // TODO User Avatar
            toUserId: toUserId, // toUserId (depends if this is written  or received
            time: Date.parse(msg.time),
            message: msg.message,
            status: msg.status
        };
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
        this.receivers.forEach(receiver => {
            msgsSend.push(this.sessionChatService.sendMessageToUser({
                receiverToken: receiver.token,
                senderToken: sessionInfo.sessionUser.token,
                sessionCode: sessionInfo.session.code,
                chatMessage: msg // FIXME ChatMessage convert to SessionChatMessageRequest (msg = string)
            }).toPromise());
        });

        return Promise.all(msgsSend).then(msgs => {
            console.info("New Chat Messages were send: [".concat( msgs.length.toString() , "]"));
        });
    }

    async getUserInfo(): Promise<UserInfo> {
        let sessionInfo = await this.getActiveSession();
        const userInfo: UserInfo = {
            id: sessionInfo.sessionUser.id,
            name: sessionInfo.sessionUser.team_name,
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
                console.info("ChatAndSessionService: Unsubscribe watchPosition subscription ...");
                this.positionSubscription.unsubscribe();
            }
            console.info("ChatAndSessionService: subscribe for watchPosition()");
            this.positionSubscription = this.gpsService.watchPosition().subscribe(async next => {
                let currentTimestamp = new Date().getTime();
                if (next && next.coords
                    && currentTimestamp - ChatAndSessionService.POSITION_PUSH_INTERVAL_IN_SECS * 1000 > this.lastPositionPush) {
                    this.lastPositionPush = currentTimestamp;
                    console.log("ChatAndSessionService: Pushing location for session user", next.coords.latitude, next.coords.longitude);
                    try {
                        await this.sessionUserService.updatePosition({
                            sessionCode: sessionInfo.session.code,
                            userToken: sessionInfo.sessionUser.token,
                            latitude: next.coords.latitude,
                            longitude: next.coords.longitude
                        }).toPromise();

                        // TODO put this into own subscriber

                        // receive all chats ...
                        // let chatMsgs : Array<any> = [];
                        //
                        // this.receivers.forEach(receiver => {
                        //     console.log(this.receivers);
                        //     console.log(receiver);
                        //     chatMsgs.push(this.getMsgList(sessionInfo, receiver.token).toPromise().then((messages) => {
                        //         console.info("ChatAndSessionService: Messages received", messages);
                        //
                        //
                        //         // foreach msg -> publish new event
                        //         messages.forEach((msg : ChatMessage) => {
                        //             console.log("ChatAndSessionService: messages received", msg, this);
                        //             this.events.publish('chat:received', msg);
                        //         });
                        //     }));
                        // });
                        //
                        // Promise.all(chatMsgs).then(() => {
                        //     console.log('all chats received');
                        // })

                    } catch (e) {
                        console.error("ChatAndSessionService: Could not push position", e);
                    }
                    this.lastPositionPushLatency = new Date().getTime() - currentTimestamp;
                }
            });
        } else {
            if (this.positionSubscription) {
                console.info("ChatAndSessionService: unsubscribe from watchPosition()");
                this.positionSubscription.unsubscribe();
                this.positionSubscription = null;
            }
        }
    }

    private async determineDefaulltReceivers(sessionInfo : SessionInfo) : Promise<SessionUser[]> {
        let receivers : SessionUser[] = [];
        if(!sessionInfo.sessionUser.wp_user_id || sessionInfo.sessionUser.wp_user_id <= 0) {
            let admin : SessionUser = await this.sessionService.getSessionAdmin(sessionInfo.session.code).toPromise().then(res => {
                console.log("Admin is geladen!", res);
                return res;
            });
            console.log("Admin ist:", admin);
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

