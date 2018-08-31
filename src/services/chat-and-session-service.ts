import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Session } from '../app/api/models/session';
import { Storage } from "@ionic/storage";

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

@Injectable()
export class ChatAndSessionService {

    private static STORAGE_KEY = 'ChatAndSessionService.activeSession';

        constructor(private http: HttpClient,
                private events: Events,
                private storage: Storage) {
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
        // TODO persist active session
        await this.storage.set(ChatAndSessionService.STORAGE_KEY, session);
        console.log(session);
        console.log(teamName);
        console.log(teamMembers);
    }

    async getActiveSession(): Promise<Session> {
        return this.storage.get(ChatAndSessionService.STORAGE_KEY);
    }

    async exitActiveSession(){
        this.storage.remove(ChatAndSessionService.STORAGE_KEY);
    }
}

