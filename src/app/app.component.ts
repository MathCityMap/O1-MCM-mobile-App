import { Component } from '@angular/core';
import {AlertController, App, Events, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomKeyBoard } from '../components/customKeyBoard/custom-keyboard';

import { LanguageService } from '../services/language-service';
import { ChatAndSessionService } from '../services/chat-and-session-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {Helper} from "../classes/Helper";



export enum MCMModalType {
  hint = 1 ,
  error = 2,
  solved = 3,
  sampleSolution = 4,
  solvedLow = 5,
  saved = 6,
  subtask = 7,
  calculation = 8
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'HomePage';

  public activeNarrative: string = 'default';
  keysTab: string[];

  constructor(platform: Platform, statusBar: StatusBar,private splashScreen: SplashScreen,
              languageService: LanguageService, chatService: ChatAndSessionService,
              events: Events, app: App, alertCtrl: AlertController, translate: TranslateService, screenOrientation: ScreenOrientation,private storage: Storage) {

    let that = this;
    platform.ready().then(async () => {
        await languageService.initialize();
        await this.setRootPage();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // statusBar.show();
        if(platform.is('cordova')){
            if ((<any>window).wkWebView) {
                (<any>window).wkWebView.injectCookie(Helper.WEBSERVER_URL);
            }
            if(platform.is('tablet')){
                //force landscape mode on tablets
                screenOrientation.lock(screenOrientation.ORIENTATIONS.LANDSCAPE);
            }else{
                //force portrait mode on phones
                screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            }
        }
    });

    platform.registerBackButtonAction(async () => {
      let nav = app.getActiveNavs()[0];

      if (!nav.canGoBack()) {
        const alert = alertCtrl.create({
          title: translate.instant("a_alert_confirm_close"),
          buttons: [{
            text:  translate.instant("no"),
            role: 'cancel'
          },{
            text:  translate.instant("yes"),
            handler: () => {
              platform.exitApp();
            }
          }]
        });
        alert.present();
      }
    });
    statusBar.backgroundColorByHexString('#035f87'); // set status bar color
      // Keyboard key tab (used in the app.html template)
      let decimalSeparator = window.navigator.language.substring(0, 2) == 'en' ? '.' : ',';

      this.keysTab = [
          "1", "2", "3", "C",
          "4", "5", "6", "",
          "7", "8", "9", "",
          "-", "0", decimalSeparator, "✔"]; // ✔
      // chatService.init();

      events.subscribe('narrativeChange', (narrative) => {
          this.activeNarrative = narrative;
      });

  }

    ngOnInit()
    {
        CustomKeyBoard.hide();
    }

    // Event emitter
    keyClick(k: string) {
        console.log('Event emitter - key: ', k);
    }

    async isFirstStart(): Promise<boolean> {
        let OnboardingHasAlreadyBeenShown = await this.storage.get('OnboardingHasBeenShown');
        if (!OnboardingHasAlreadyBeenShown) {
            this.storage.set('OnboardingHasBeenShown', true);
        }
        return !OnboardingHasAlreadyBeenShown;
    }

    async setRootPage() {
        if (await this.isFirstStart()) {
            this.rootPage = 'OnboardingPage';
        } else {
            this.rootPage = 'HomePage';
        }
        this.splashScreen.hide()
    }
}

