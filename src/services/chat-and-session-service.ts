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

    private static STORAGE_KEY_SESSION = 'ChatAndSessionService.activeSession';

    private subject = new ReplaySubject<SessionInfo>(1);

    constructor(private http: HttpClient,
                private events: Events,
                private storage: Storage,
                private sessionService: SessionService) {
        this.init();
    }

    async init() {
        let sessionInfo = await this.getActiveSession();
        this.subject.next(sessionInfo);
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

        this.subject.next(sessionInfo);

        console.log(session);
        console.log(teamName);
        console.log(teamMembers);
    }

    async getActiveSession(): Promise<SessionInfo> {
        return this.storage.get(ChatAndSessionService.STORAGE_KEY_SESSION);
    }

    async exitActiveSession(){
        await this.storage.remove(ChatAndSessionService.STORAGE_KEY_SESSION);
        this.subject.next(null);
    }

    getSubject(): Subject<SessionInfo> {
        return this.subject;
    }
}

