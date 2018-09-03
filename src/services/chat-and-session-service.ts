import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
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

    constructor(private http: HttpClient,
                private events: Events,
                private storage: Storage,
                private sessionService: SessionService,
                private sessionUserService: SessionUserService,
                private gpsService: GpsService) {
        this.init();
    }

    async init() {
        let sessionInfo = await this.getActiveSession();
        this.subscribeForAndSendEvents(sessionInfo);
    }

    mockNewMsg(msg) {
        const mockMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'Hancock',
            userAvatar: './assets/to-user.jpg',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.message,
            status: 'success'
        };

        setTimeout(() => {
            this.events.publish('chat:received', mockMsg, Date.now())
        }, Math.random() * 1800)
    }

    // TODO change function for database
    getMsgList(): Observable<ChatMessage[]> {
        const msgListUrl = '../assets/mock/msg-list.json';
        return this.http.get<any>(msgListUrl).map((value => value.array));
    }

    sendMsg(msg: ChatMessage) {
        return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
            .then(() => this.mockNewMsg(msg));
    }

    getUserInfo(): Promise<UserInfo> {
        const userInfo: UserInfo = {
            id: '140000198202211138',
            name: 'Catrin',
            avatar: './assets/user.jpg'
        };
        return new Promise(resolve => resolve(userInfo));
    }

    async setActiveSession(session: Session, teamName: string, teamMembers: string[]) {

        let sessionUser = await this.sessionService.joinSession({
            sessionId: session.id,
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
            console.info("ChatAndSessionService: subscribe for watchPosition()");
            this.positionSubscription = this.gpsService.watchPosition().subscribe(async next => {
                let currentTimestamp = new Date().getTime();
                if (next && next.coords
                    && currentTimestamp - ChatAndSessionService.POSITION_PUSH_INTERVAL_IN_SECS * 1000 > this.lastPositionPush) {
                    this.lastPositionPush = currentTimestamp;
                    console.log(`Pushing location for session user: ${next.coords.latitude}, ${next.coords.longitude}`);
                    try {
                        await this.sessionUserService.updatePosition({
                            userToken: sessionInfo.sessionUser.token,
                            latitude: next.coords.latitude,
                            longitude: next.coords.longitude
                        }).toPromise();
                    } catch (e) {
                        console.error('Could not push position', e);
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
}

