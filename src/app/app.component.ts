import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CustomKeyBoard} from '../components/customKeyBoard/custom-keyboard';

import {LanguageService} from '../services/language-service';
import {ChatAndSessionService} from '../services/chat-and-session-service';
import {Deeplinks} from "@ionic-native/deeplinks";


export enum MCMModalType {
    hint = 1,
    error = 2,
    solved = 3,
    sampleSolution = 4,
    solvedLow = 5
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = 'HomePage';

    public activeNarrative: string = 'default';
    keysTab: string[];

    @ViewChild(Nav) nav: Nav;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                languageService: LanguageService, chatService: ChatAndSessionService,
                events: Events, private deeplinks: Deeplinks) {
        platform.ready().then(async () => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
            // statusBar.show();
        });
        languageService.initialize().then(() => splashScreen.hide());
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

    ngOnInit() {
        CustomKeyBoard.hide();
    }

    // Event emitter
    keyClick(k: string) {
        console.log('Event emitter - key: ', k);
    }

}