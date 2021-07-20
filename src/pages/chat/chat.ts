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
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Helper} from "../../classes/Helper";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";

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

    private localPath: string = null;
    private audioFilePath: string = null;
    private fileDirectory: string = null;

    private audio: MediaObject;
    private audioIndex: number = null;
    private canPlayback: boolean = true;
    private showTextArea: boolean = true;
    private audioPlaying: boolean = false;
    private showAudioButtons: boolean = true;
    private showPictureButtons: boolean = true;
    private startAudioRecord: number = 0;
    private startAudioPlaying: number = 0;
    private audioDuration: number = 0;
    private currentPosition: number = 0;
    private durationInterval;
    private positionInterval;
    private durCheckInterval;

    private recordState: RecordStateEnum = RecordStateEnum.Idle;

    constructor(navParams: NavParams,
                protected file: File,
                protected media: Media,
                protected platform: Platform,
                private chatService: ChatAndSessionService,
                private events: Events,
                private changeDetector: ChangeDetectorRef,
                private chatAndSessionService: ChatAndSessionService,
                private camera: Camera,
                private photoViewer: PhotoViewer,
                private spinnerDialog: SpinnerDialog) {

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

        //does not allow sending empty messages
        if(this.editorMsg.trim() == '' && !this.editorImg && this.recordState != RecordStateEnum.Stop) return;

        //failsafe to stop you from seding more than 1 time of message
        if ((this.editorMsg && this.editorImg) ||
            (this.editorMsg && this.recordState == RecordStateEnum.Stop) ||
            (this.editorImg && this.recordState == RecordStateEnum.Stop))
            return;

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
        this.editorMsg = '';

        //If we are sending an image
        if (this.editorImg) {
            this.localPath = null;
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
                console.log("ERROR: unable to send media");
                return;
            }
        }

        //If we are sending audio file
        else if (this.recordState == RecordStateEnum.Stop) {
            if (!this.canPlayback) {
                this.pauseAudio();
            }
            this.recordState = RecordStateEnum.Idle;
            let audioType = 'aac';
            await this.file.readAsArrayBuffer(this.fileDirectory, 'audioFile.aac').then(async (data) => {
                const blob = new Blob([data], {type: 'audio/' + audioType});
                let myFormData = new FormData();
                myFormData.append('media', blob, 'audio.' + audioType);
                myFormData.append('mediaDuration', this.audioDuration.toString());
                newMsg.audioDuration = this.audioDuration;
                this.audioDuration = 0;
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
            if (this.sessionInfo != null) {
                let details = JSON.stringify({'message': newMsg.message});
                this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
            }
        }

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
            allowEdit: true
        };

        this.camera.getPicture(options).then(async (imageData) => {
           this.editorImg = imageData;
           this.localPath = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log("ERROR#####: ", err);
            this.setInputWrapButtons(true);
            // Handle error
        });
    }

    openCamera() {
        this.setInputWrapButtons(false);

        const options: CameraOptions = {
            quality: 100,
            targetHeight: 512,
            targetWidth: 512,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };

        this.camera.getPicture(options).then(async (imageData) => {
            this.editorImg = imageData;
            this.localPath = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
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
                this.showTextArea = true;
                this.showPictureButtons = true;
                this.pauseAudio();
                break;
            default:
                this.recordState = RecordStateEnum.Record;
                this.startRecording();
                break;
        }
    }

    updateAudioDuration(){
        let now = new Date().getTime();
        this.audioDuration = now - this.startAudioRecord;
    }

    updateAudioPosition(message?){
        let now = new Date().getTime();
        if(message){
            if((now - this.startAudioPlaying) < message.audioDuration){
                message.currentPosition  = now - this.startAudioPlaying;
            }else{
                message.currentPosition = message.audioDuration;
                setTimeout(() =>{
                    this.clearPositionInterval(message);
                }, 1000);
            }
        }else {
            if((now - this.startAudioPlaying) < this.audioDuration){
                this.currentPosition = now - this.startAudioPlaying;
            }else{
                this.currentPosition = this.audioDuration;
                setTimeout(() =>{
                    this.clearPositionInterval();
                }, 1000);
            }
        }
    }

    startRecording() {
        console.log('start recording');
        this.pauseAudio();

        if(this.platform.is('android')){
            this.fileDirectory = this.file.externalDataDirectory;
        } else if(this.platform.is('ios')){
            this.fileDirectory = this.file.documentsDirectory;
        }
        this.file.createFile(this.fileDirectory, 'audioFile.aac', true).then(filePath => {
            this.audio = this.media.create(this.fileDirectory.replace(/^file:\/\//, '') + 'audioFile.aac');
            //this.audio.release();
            this.startAudioRecord = new Date().getTime();
            this.audio.startRecord();
            this.updateAudioDuration();
            this.durationInterval = window.setInterval(() => {
                this.updateAudioDuration();
            }, 1000);
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

    async stopRecording() {
        this.audio.stopRecord();
        if (this.durationInterval) {
            clearInterval(this.durationInterval);
            this.durationInterval = null;
        }
        if (this.platform.is('ios')) {
            this.audio.setVolume(0);
            this.audio.play();
            this.audioDuration = await this.getAudioDuration();
            this.audio.pause();
            this.audio.setVolume(1);
            this.audio.seekTo(0);
        } else {
            this.audioDuration = await this.getAudioDuration();
        }
        this.startAudioRecord = 0;
        this.canPlayback = true;
    }

    async getAudioDuration (): Promise<number> {
        return new Promise<number>((resolve) => {
            this.durCheckInterval = window.setInterval(() => {
                console.log("Looking for File Duration");
                if (this.audio.getDuration() != -1) {
                    // this.currentAudioFile.setVolume(1.0);
                    this.clearAudioDurationInterval();
                    resolve(this.audio.getDuration() * 1000);
                }
            }, 1000);
        });
    }

    private clearAudioDurationInterval () {
        if (this.durCheckInterval) {
            clearInterval(this.durCheckInterval);
            this.durCheckInterval = null;
        }
    }

    playAudio(message?, index?) {
        if (this.audioPlaying) {
            this.pauseAudio();
        }
        let filePath = null;
        if (message) filePath  = message.media[0];
        if (filePath) this.audioIndex = index;
        else {
            this.canPlayback = false;
            filePath = this.audioFilePath;
        }

        this.audio = this.media.create(filePath);
        this.audio.play();
        this.startAudioPlaying = new Date().getTime();
        this.positionInterval = window.setInterval(() => {
            this.updateAudioPosition(message);
        }, 10);
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
                    this.clearPositionInterval(message);
                    break;
            }
        });
    }

    clearPositionInterval(message?) {
        if(this.positionInterval){
            if(message){
                message.currentPosition = 0;
            }else{
                this.currentPosition = 0;
            }
            clearInterval(this.positionInterval);
            this.positionInterval = null;
        }
    }

    pauseAudio(message?) {
        this.clearPositionInterval(message);
        if (this.audio) {
          this.audio.pause();
        }
    }

    isAudio(path: string) {
        return (path.substring(path.lastIndexOf('.')) == '.aac');
    }

    changeButtonsStatus() {
        if (this.editorMsg.length == 0) {
            this.setInputWrapButtons(true);
        } else {
            this.showAudioButtons = false;
            this.showPictureButtons = false;
        }
    }

    setInputWrapButtons(setValue: boolean) {
        this.showTextArea = setValue;
        this.showAudioButtons = setValue;
        this.showPictureButtons = setValue;
    }

    openInPhotoviewer(image) {
        if (Helper.isPluginAvailable(PhotoViewer)) {
            this.spinnerDialog.show();
            setTimeout(() => {
                // use short timeout to let spinner dialog appear
                this.photoViewer.show(image);
                setTimeout(() => {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    this.spinnerDialog.hide();
                }, 1000);
            }, 100)
        }
    }
}


