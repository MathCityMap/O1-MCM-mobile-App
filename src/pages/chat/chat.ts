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

    private audio: MediaObject;
    private audioIndex: number = null;
    private canPlayback: boolean = true;
    private showSpinner: boolean = false;
    private audioPlaying: boolean = false;
    private showTextArea: boolean = true;
    private showAudioButtons: boolean = true;
    private showPictureButtons: boolean = true;

    private localPath: string = null;
    private audioFilePath: string = null;
    private fileDirectory: string = null;

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
        this.chatService.getActiveSession().then((res: SessionInfo) => {
            this.sessionUser = res.sessionUser;
            this.session = res.session;
            this.sessionInfo = res;
            // TODO sender, receiver(s) is handlet automaticly from session parameters.
            // teams, which are *not* admin of a session, get as receiver the admin
            // the admin of a sessionget as recivers *all* users from a session
            // TODO gui should have an option to select a team as active receiver.
            let defaultReceiver: SessionUserResponse = this.chatService.getReceivers()[0];
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

        if (this.sessionInfo != null) {
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
        let chatMsgs: Array<any> = [];
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
        this.setInputWrapButtons(true);

        if (this.editorMsg && this.editorImg &&
            !this.editorMsg.trim() && !this.editorImg.trim() &&
            this.recordState != RecordStateEnum.Stop) return;
        let timezoneOffset = new Date().getTimezoneOffset();

        let newMsg: ChatMessage = {
            messageId: null,
            userId: this.user.token,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.token,
            time: Date.now() - (timezoneOffset * 60000),
            message: this.editorMsg,
            media: [],
            status: 'pending'
        };


        //If we are sending an image
        if (this.editorImg) {
            this.localPath = null;
            console.log('hello??');
            let blob = new Blob([this.editorImg], {type: 'image/jpeg'});
            let myFormData = new FormData();
            myFormData.append('media', blob, 'image.jpeg');
            let resultPath = await this.chatAndSessionService.postMedia(myFormData, this.sessionInfo);
            this.editorImg = null;
            if (resultPath) {
                newMsg.media.push(resultPath);
                //TODO: ask Iwan about how wordpress interprets event messages
                let details = JSON.stringify({'message': resultPath});
                this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
            } else {
                console.log("ERROR: unnable to send media");
                return;
            }
        }

        //If we are sending audio file
        else if (this.recordState == RecordStateEnum.Stop) {
            if (!this.canPlayback) {
                this.pauseAudio();
            }

            this.recordState = RecordStateEnum.Idle;

            let audioType: string;
            if (this.platform.is('ios')) {
                audioType = 'aac';
            } else if (this.platform.is('android')) {
                audioType = 'aac';
            }

            await this.file.readAsArrayBuffer(this.fileDirectory, 'audioFile.aac').then(async (data) => {
                const blob = new Blob([data], {type: 'audio/' + audioType});
                let myFormData = new FormData();
                myFormData.append('media', blob, 'audio.' + audioType);
                let resultPath = await this.chatAndSessionService.postMedia(myFormData, this.sessionInfo);
                //newMsg.isAudio = true;
                this.audio = null;
                if (resultPath) {
                    newMsg.media.push(resultPath);
                    //TODO: ask Iwan about how wordpress interprets event messages
                    let details = JSON.stringify({'message': resultPath});
                    this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
                } else {
                    console.log("ERROR: unnable to send media");
                    return;
                }
            }).catch(err => {
                console.log("ERROR: ", err)
            });
        }
        //If we are sending just text message
        else {
            newMsg.message = this.editorMsg;
            if (this.sessionInfo != null) {
                let details = JSON.stringify({'message': this.editorMsg});
                this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
            }
            this.editorMsg = '';
        }

        this.setToDefaultHeight();

        if (!this.showEmojiPicker) {
            this.focus();
        }

        await this.chatService.checkForNewMessages(this.sessionInfo);
        this.chatService.sendMsg(newMsg, this.sessionInfo)
            .then((msgs: ChatMessage[]) => {
                msgs.forEach((msg: ChatMessage) => {
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
        this.setInputWrapButtons(false);

        const options: CameraOptions = {
            quality: 100,
            targetHeight: 512,
            targetWidth: 512,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            //saveToPhotoAlbum: false,
            allowEdit: true
        };

        this.camera.getPicture(options).then(async (imageData) => {
           this.showSpinner = true;
           this.editorImg = imageData;
           this.localPath = 'data:image/jpeg;base64,' + imageData;
           this.showSpinner = false;
        }, (err) => {
            console.log("ERROR#####: ", err);
            this.setInputWrapButtons(true);
            // Handle error
        });
    }

    openCamera() {
        this.showSpinner = true;
        this.setInputWrapButtons(false);

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then(async (imageData) => {
            this.editorImg = imageData;
            this.localPath = 'data:image/jpeg;base64,' + imageData;
            this.showSpinner = false;
        }, (err) => {
            // Handle error
            this.showSpinner = false;
            console.log("Camera issue:" + err);
            this.setInputWrapButtons(true);
        });
    }

    removeImage() {
        this.localPath = null;
        this.editorImg = null;
        this.setInputWrapButtons(true);
    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {
        let userId = this.user.token;

        // check if msg already displayed

        if (this.getMsgIndexById(msg.messageId) >= 0) {
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
        const textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    }

    setToDefaultHeight() {
        if (this.messageInput && this.messageInput.nativeElement){
            this.messageInput.nativeElement.style.height = '40px';
        }
    }

    micButtonClick() {
        this.showTextArea = false;
        this.showPictureButtons = false;

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

        if(this.platform.is('android')){
            this.fileDirectory = this.file.externalDataDirectory;
        } else if(this.platform.is('ios')){
            this.fileDirectory = this.file.documentsDirectory;
        }
        this.file.createFile(this.fileDirectory, 'audioFile.aac', true).then(filePath => {
            this.audio = this.media.create(this.fileDirectory.replace(/^file:\/\//, '') + 'audioFile.aac');
            //this.audio.release();
            this.audio.startRecord();
            this.audioFilePath = filePath.toInternalURL();

        }).catch(err => {console.log("creation file error:", err)});

        // Stop Recording after 1 minute
        setTimeout(() => {
            if (this.recordState != RecordStateEnum.Idle) {
                this.recordState = RecordStateEnum.Stop;
                this.stopRecording();
            }
        }, 60000);
    }

    stopRecording() {
        this.audio.stopRecord();
        this.canPlayback = true;
    }

    playAudio(filePath?, index?) {
        if (this.audioPlaying) {
            this.pauseAudio();
        }

        if (filePath) this.audioIndex = index;
        else {
            this.canPlayback = false;
            filePath = this.audioFilePath;
        }

        this.audio = this.media.create(filePath);
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

                    this.audio.release();
                    this.audioPlaying = false;
                    break;
            }
        });
    }

    setInputWrapButtons(setValue: boolean) {
        this.showTextArea = setValue;
        this.showAudioButtons = setValue;
        this.showPictureButtons = setValue;
    }

    pauseAudio() {
        if (this.audio) {
          this.audio.pause();
        }
    }

    cancelRecording() {
        //todo:remove file;
        this.showTextArea = true;
        this.showPictureButtons = true;
    }

    isAudio(path: string) {
        return (path.substring(path.lastIndexOf('.')) == '.aac' || path.substring(path.lastIndexOf('.')) == '.3gp');
    }

    changeButtonsStatus() {
        this.showAudioButtons = false;
        this.showPictureButtons = false;
    }
}


