import { Component } from '@angular/core';
import {DeepLinker, IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  versionNumber: string = 'unknown';
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public appVersion: AppVersion,
      public platform: Platform,
      public viewCtrl: ViewController,
      private deepLinker: DeepLinker) {

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    if (this.platform.is('cordova')) {
        this.versionNumber = await this.appVersion.getVersionNumber();
    }
  }

    goBack() {
        this.navCtrl.pop({}, () => {
            this.deepLinker.navChange('back');
        });
    }
}
