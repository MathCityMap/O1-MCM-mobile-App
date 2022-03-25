import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  versionNumber: string = 'unknown';
  constructor(public navCtrl: NavController, public navParams: NavParams, public appVersion: AppVersion,
              public platform: Platform) {

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    if (this.platform.is('cordova')) {
        this.versionNumber = await this.appVersion.getVersionNumber();
    }
  }

}
