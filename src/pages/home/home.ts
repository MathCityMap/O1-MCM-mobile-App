import { Component } from '@angular/core';
import {IonicPage, NavController, Platform} from 'ionic-angular';

import { Helper } from '../../classes/Helper';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LanguageService } from '../../services/language-service';
import {ModalsService} from "../../services/modals-service";
import {DB_Updater} from "../../classes/DB_Updater";
import {OrmService} from "../../services/orm-service";


@IonicPage()
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public static nav: NavController;
  tab1Root = 'DashboardPage';
  tab2Root = 'RoutesListPage';
  tab3Root = 'PortalPage';

  constructor(private navCtrl: NavController, private platform: Platform,
              private splashScreen: SplashScreen, private languageService: LanguageService,
              private helper: Helper, private modalService: ModalsService, private dbUpdater: DB_Updater,
              private ormService: OrmService) {
    HomePage.nav = navCtrl;
  }

  async ionViewWillEnter() {
    this.platform.ready().then(async () => {
        this.languageService.initialize().then(async () => {
            console.log('Platform is ready!');
            await this.modalService.showNoInternetModalIfOffline();

            //first time opening the app, check online status and update DB
            try {
                await this.dbUpdater.checkForUpdates();
            } catch (e) {
                console.error('caught error while checking for updates:');
                console.error(e);
            }
            await this.ormService.setNewActiveUser('Me');
            this.splashScreen.hide();
        });
    });
  }
}