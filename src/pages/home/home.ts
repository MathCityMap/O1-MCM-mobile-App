import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import {IonicPage, NavController, Platform, Events} from 'ionic-angular';

import { Helper } from '../../classes/Helper';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LanguageService } from '../../services/language-service';

@IonicPage()
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public static nav: NavController;
  tab1Root = 'DashboardPage';
  tab2Root = 'RoutesListPage';
  tab3Root = 'MapPage';


  constructor(private navCtrl: NavController, private platform: Platform,
              private splashScreen: SplashScreen, private languageService: LanguageService,
              public events: Events) {
    HomePage.nav = navCtrl;

    events.subscribe('changeViewType', (isList) => {
          // user and time are the same arguments passed in `events.publish(user, time)`
          if(isList) this.tab2Root = 'RoutesListPage';
          else this.tab2Root = 'MapPage';
      });
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