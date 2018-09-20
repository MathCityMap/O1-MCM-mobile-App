import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import {ChatAndSessionService, ChatMessage, SessionInfo, UserInfo} from "../../services/chat-and-session-service";
import { SessionUser } from "../../app/api/models/session-user";
import {Session} from "../../app/api/models/session";

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class ChatPage {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: ElementRef;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    sessionInfo: SessionInfo;
    sessionUser: SessionUser;
    session: Session;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;

    constructor(navParams: NavParams,
                private chatService: ChatAndSessionService,
                private events: Events,) {

        // TODO sender, receiver(s) is handlet automaticly from session parameters.
        // teams, which are *not* admin of a session, get as receiver the admin
        // the admin of a sessionget as recivers *all* users from a session
        // TODO gui should have an option to select a team as active receiver.
        let defaultReceiver : SessionUser = this.chatService.getReceivers()[0];
        this.toUser = {
            id: defaultReceiver.id,
            name: defaultReceiver.team_name,
            token: defaultReceiver.token
        };

        this.chatService.getUserInfo()
            .then((res) => {
                this.user = res;
            });

        // TODO Does chat.ts need access to all session objects? refactor!
        this.chatService.getActiveSession().then((res : SessionInfo) => {
           this.sessionUser = res.sessionUser;
           this.session = res.session;
           this.sessionInfo = res;
        });
    }

    ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    }

    ionViewDidEnter() {
        //get message list
        this.getMsg();

        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        })
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        } else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    getMsg() {
        let chatMsgs : Array<any> = [];
        this.chatService.getReceivers().forEach(receiver => {
            chatMsgs.push(this.chatService
                .getMsgList(this.sessionInfo, receiver.token).toPromise()
                .then(res => {
                    this.msgList = res;
                    this.scrollToBottom();
                }));
        });

        Promise.all(chatMsgs).then(() => {
            console.log('received all messages!');
        });
    }

    /**
     * @name sendMsg
     */
    sendMsg() {
        if (!this.editorMsg.trim()) return;

        // Mock message
        let newMsg: ChatMessage = {
            messageId: null,
            userId: this.user.token,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.token,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        console.log("new message: ", newMsg);

        this.editorMsg = '';
        this.setToDefaultHeight();
        if (!this.showEmojiPicker) {
            this.focus();
        }

        this.chatService.sendMsg(newMsg, this.sessionInfo)
            .then((msgs : ChatMessage[]) => {
                msgs.forEach((msg : ChatMessage) => {
                    let index = this.getMsgIndexById(msg.messageId);
                    if (msg.messageId && index !== -1) {
                        this.msgList[index].status = 'success';
                    } else {
                        msg.status = 'success';
                        this.pushNewMsg(msg);
                    }
                });
            })
    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {
        let userId = this.user.token;

        // check if msg already displayed

        if(this.getMsgIndexById(msg.messageId) >= 0) {
            return;
        }

        // Verify user relationships
        if (!(msg.userId === userId || msg.toUserId === userId)) {
            return;
        }

        this.msgList.push(msg);
        this.scrollToBottom();
        console.log("scroll to bottm and display msg: " + msg.messageId);
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content && this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }

    private focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }

    private setTextareaScroll() {
        const textarea =this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    }

    setToDefaultHeight() {
        if(this.messageInput.nativeElement){
            this.messageInput.nativeElement.style.height = '40px';
        }
    }
}


