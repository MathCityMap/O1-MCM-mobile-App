import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, NavParams, Platform} from 'ionic-angular';
import {ChatAndSessionService, ChatMessage, SessionInfo, UserInfo} from "../../services/chat-and-session-service";
import {SessionUser} from "../../app/api/models/session-user";
import {Session} from "../../app/api/models/session";
import {SessionUserResponse} from "../../app/api/models/session-user-response";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {Media, MediaObject} from "@ionic-native/media";
import {RecordStateEnum} from "./recordStateEnum";

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
    editorImg = null;
    showEmojiPicker = false;
    isScrolledToBottom = true;
    private scrollEndSubscription: any;

    private filePath: string;
    private fileName: string;
    private audio: MediaObject;
    private audioList: any[] = [];
    private audioIndex: number = null;
    private canPlayback: boolean = true;
    private audioPlaying: boolean = false;
    private recordState: RecordStateEnum = RecordStateEnum.Idle;

    constructor(navParams: NavParams,
                protected file: File,
                protected media: Media,
                protected platform: Platform,
                private chatService: ChatAndSessionService,
                private events: Events,
                private changeDetector: ChangeDetectorRef,
                private chatAndSessionService: ChatAndSessionService,
                private camera: Camera) {

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
        if (!this.editorMsg.trim() && !this.editorImg.trim() && this.recordState != RecordStateEnum.Stop) return;
        let timezoneOffset = new Date().getTimezoneOffset();
        let path = [];

        if(this.editorImg){
            let blob = new Blob([this.editorImg], {type: 'image/jpeg'});
            let myFormData = new FormData();
            myFormData.append('media', blob, 'image.jpeg');
            let resultPath = await this.chatAndSessionService.postMedia(myFormData, this.sessionInfo);
            //resets image
            this.editorImg = null;
            if(resultPath) path.push(resultPath);
            else {
                console.log("ERROR: unnable to send media");
                return;
            }

        }

        let newMsg: ChatMessage = {
            messageId: null,
            userId: this.user.token,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.token,
            time: Date.now() - (timezoneOffset * 60000),
            message: this.editorMsg,
            media: path,
            status: 'pending'
        };

        if (this.recordState == RecordStateEnum.Stop) {
            if (!this.canPlayback) {
                this.pauseAudio();
            }

            this.recordState = RecordStateEnum.Idle;
            newMsg.isAudio = true;
            this.msgList.push(newMsg);

            newMsg.media = [this.editorImg];
        } else {
            newMsg.message = this.editorMsg;
            newMsg.media = [this.editorImg];
        }

        if (this.sessionInfo != null){
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
     * @name imageChat
     */
    async getImage() {
        const options: CameraOptions = {
            quality: 100,
            targetHeight: 300,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum: true,
            allowEdit: true
        }

        this.camera.getPicture(options).then((imageData) => {

            // now you can do whatever you want with the base64Image, I chose to update the db
           this.editorImg = imageData;

        }, (err) => {
            console.log("ERROR#####: ", err);
            // Handle error
        });
        console.log("done###", this.editorMsg);
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

    micButtonClick() {
        switch (this.recordState) {
            case RecordStateEnum.Record:
                this.recordState = RecordStateEnum.Stop;
                this.stopRecording();
                break;
            case RecordStateEnum.Stop:
                this.recordState = RecordStateEnum.Idle;
                this.cancelRecording();
                break;
            default:
                this.recordState = RecordStateEnum.Record;
                this.startRecording();
                break;
        }
    }

    startRecording() {
        this.pauseAudio();

        if (this.platform.is('ios')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() +
              new Date().getHours() + + new Date().getMinutes() +  new Date().getSeconds() + new Date().getSeconds() + '.m4a';

            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
        } else if (this.platform.is('android')) {
            this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() +
              new Date().getHours() + + new Date().getMinutes() +  new Date().getSeconds() + new Date().getSeconds() + '.png';

            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
        }

        this.audio = this.media.create(this.filePath);
        this.audio.startRecord();

        // Stop Recording after 1 minute
        setTimeout(() => {
            if(this.recordState != RecordStateEnum.Idle) {
                this.recordState = RecordStateEnum.Stop;
                this.stopRecording();
            }
        }, 60000);
    }

    stopRecording() {
        this.audio.stopRecord();
        // This way we can identify the audio clip that needs to be played by using the msgList index
        this.audioList[this.msgList.length] = { filename: this.fileName };
        this.canPlayback = true;
    }

    playAudio(file, index?) {
        if (this.audioPlaying) this.pauseAudio();

        if(!isNaN(index)) this.audioIndex = index;
        else this.canPlayback = false;

        if (this.platform.is('ios')) {
            this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
        } else if (this.platform.is('android')) {
            this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
        }

        this.audio = this.media.create(this.filePath);
        this.audio.play();
        this.audio.setVolume(0.8);

        this.audio.onStatusUpdate.subscribe(status => {
            switch (status) {
                case 2: // Running
                    this.audioPlaying = true;
                    break;
                case 3: // Paused
                case 4: // Finished/Stopped
                    if (!isNaN(index)) this.audioIndex = null;
                    else this.canPlayback = true;

                    this.audioPlaying = false;
                    break;
            }
        });
    }

    pauseAudio() {
        if (this.audio) {
          this.audio.pause();
        }
    }

    cancelRecording() {
        this.audioList.pop();
    }
}


