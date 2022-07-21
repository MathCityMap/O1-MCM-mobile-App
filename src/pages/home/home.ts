import { Component } from '@angular/core';
import {IonicPage, NavController, Platform} from 'ionic-angular';

import { Helper } from '../../classes/Helper';
import { LanguageService } from '../../services/language-service';


@IonicPage()
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public static nav: NavController;
  tab1Root = 'DashboardPage';
  tab2Root = 'RoutesListPage';
  tab3Root = 'PortalPage';

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private languageService: LanguageService,
              private helper: Helper) {
    HomePage.nav = navCtrl;
  }

  async ionViewWillEnter() {
    this.platform.ready().then(() => {
        this.languageService.initialize().then(() => {
            console.log('Platform is ready!');
            (navigator as any).splashscreen.hide();
        });
    });
  }
}
