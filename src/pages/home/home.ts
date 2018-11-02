import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import {IonicPage, NavController, Platform} from 'ionic-angular';

import { Helper } from '../../classes/Helper';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LanguageService } from '../../services/language-service';

@IonicPage()
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public static nav: NavController;
  tab1Root = 'RoutesListPage';
  tab2Root = 'MapPage';

  constructor(private navCtrl: NavController, private platform: Platform,
              private splashScreen: SplashScreen, private languageService: LanguageService) {
    HomePage.nav = navCtrl;
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
        this.languageService.initialize().then(() => {
            console.log('Platform is ready!');
            this.splashScreen.hide();
        });

    })
  }
}