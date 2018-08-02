import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

    msgList: ChatMessage[] = [];
    editorMsg = '';
    user: UserInfo;
    toUser: UserInfo;
    showEmojiPicker = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ChatPage');
    }

    sendMsg() {

      if (!this.editorMsg.trim()) return;
      console.log(this.editorMsg);

    }

    onFocus() {

    }
}

