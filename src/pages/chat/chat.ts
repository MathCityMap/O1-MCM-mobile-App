import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Events, Content } from 'ionic-angular';
import {ChatAndSessionService, ChatMessage, SessionInfo, UserInfo} from "../../services/chat-and-session-service";
import { SessionUser } from "../../app/api/models/session-user";
import {Session} from "../../app/api/models/session";
import {SessionUserResponse} from "../../app/api/models/session-user-response";

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
    isScrolledToBottom = true;
    private scrollEndSubscription: any;

    constructor(navParams: NavParams,
                private chatService: ChatAndSessionService,
                private events: Events,
                private changeDetector: ChangeDetectorRef,
                private chatAndSessionService: ChatAndSessionService) {

        this.chatService.getUserInfo()
            .then((res) => {
                this.user = res;
            });

        // TODO Does chat.ts need access to all session objects? refactor!
        this.chatService.getActiveSession().then((res : SessionInfo) => {
           this.sessionUser = res.sessionUser;
           this.session = res.session;
           this.sessionInfo = res;
            // TODO sender, receiver(s) is handlet automaticly from session parameters.
            // teams, which are *not* admin of a session, get as receiver the admin
            // the admin of a sessionget as recivers *all* users from a session
            // TODO gui should have an option to select a team as active receiver.
            let defaultReceiver : SessionUserResponse = this.chatService.getReceivers()[0];
            this.toUser = {
                id: defaultReceiver.id,
                name: defaultReceiver.team_name,
                token: defaultReceiver.token
            };
        });
    }

    async ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
        if (this.scrollEndSubscription) {
            this.scrollEndSubscription.unsubscribe();
            this.scrollEndSubscription = null;
        }
        this.chatService.setUserSeesNewMessages(false);

        if(this.sessionInfo != null){
            let details = JSON.stringify({});
            this.chatAndSessionService.addUserEvent("event_trail_chat_close", details, "0");
        }
    }

    ionViewDidEnter() {
        //get message list
        this.getMsg();

        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        });
        this.scrollEndSubscription = this.content.ionScrollEnd.subscribe(event => {
            if (!event || !event.scrollElement) return;
            let height = event.scrollElement.children[0].scrollHeight;
            let scrolledToBottom = height - event.scrollHeight - event.scrollTop < 0;

            if (this.isScrolledToBottom != scrolledToBottom) {
                console.debug(`isScrolledToBottom: ${scrolledToBottom}`);
                this.chatService.setUserSeesNewMessages(scrolledToBottom);
            }
            this.isScrolledToBottom = scrolledToBottom;
        });
        this.chatService.setUserSeesNewMessages(true);
        this.chatAndSessionService.setNewMsgNumber(0);
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
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
            console.debug('received all messages!');
        });
    }

    /**
     * @name sendMsg
     */
    async sendMsg() {
        if (!this.editorMsg.trim()) return;
        let timezoneOffset = new Date().getTimezoneOffset();

        // Mock message
        let newMsg: ChatMessage = {
            messageId: null,
            userId: this.user.token,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.token,
            time: Date.now() - (timezoneOffset * 60000),
            message: this.editorMsg,
            status: 'pending',
            //temporary use of media to avoid error
            media: []
        };

        console.debug("new message: ", newMsg);

        if(this.sessionInfo != null){
            let details = JSON.stringify({'message': this.editorMsg});
            this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
        }

        this.editorMsg = '';
        this.setToDefaultHeight();
        if (!this.showEmojiPicker) {
            this.focus();
        }

        await this.chatService.checkForNewMessages(this.sessionInfo);
        this.chatService.sendMsg(newMsg, this.sessionInfo)
            .then((msgs : ChatMessage[]) => {
                msgs.forEach((msg : ChatMessage) => {
                    let index = this.getMsgIndexById(msg.messageId);
                    if (msg.messageId && index !== -1) {
                        this.msgList[index].status = 'success';
                    } else {
                        msg.status = 'success';
                        this.isScrolledToBottom = true;
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
        console.log('pushed new message');

        this.msgList.push(msg);
        this.changeDetector.detectChanges();

        if (this.isScrolledToBottom) {
            this.scrollToBottom();
        }
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content && this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 200)
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


