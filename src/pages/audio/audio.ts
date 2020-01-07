import { File } from '@ionic-native/file';
import { Component } from '@angular/core';
import { Media , MediaObject }  from '@ionic-native/media';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the AudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
})
export class AudioPage {

  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  recording: boolean = false;

  constructor(protected file: File,
              protected media: Media,
              protected platform: Platform,
              protected navParams: NavParams,
              protected navCtrl: NavController) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad AudioPage');
    this.getAudioList();
  }

  getAudioList() {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log('Audio List: ', this.audioList);
    }
  }

  startRecording() {

    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() +
        new Date().getHours() + + new Date().getMinutes() +  new Date().getSeconds() + new Date().getSeconds() + '.m4a';

      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
    } else if (this.platform.is('android')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() +
        new Date().getHours() + + new Date().getMinutes() +  new Date().getSeconds() + new Date().getSeconds() + '.3gp';

      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    }

    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecording() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
    }
    this.audio = this.media.create(this.filePath);
    this.audio.play();
    this.audio.setVolume(0.8);
  }
}
