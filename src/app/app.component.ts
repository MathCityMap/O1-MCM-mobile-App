import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LanguageService } from '../services/language-service';


export enum MCMModalType {
  hint = 1 ,
  error = 2,
  solved = 3,
  sampleSolution = 4,
  solvedLow = 5
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, languageService: LanguageService) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // statusBar.show();
    });
    languageService.initialize().then(() => splashScreen.hide());
    statusBar.backgroundColorByHexString('#035f87'); // set status bar color
  }

}

