import {Component} from '@angular/core';
import {AlertController, App, DeepLinker, Events, ModalCmp, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {CustomKeyBoard} from '../components/customKeyBoard/custom-keyboard';

import {LanguageService} from '../services/language-service';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {Helper} from "../classes/Helper";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {ModalsService} from "../services/modals-service";
import {HomePage} from "../pages/home/home";
import {RoutesMapPage} from "../pages/home/tabs/RoutesMap/RoutesMap";
import {PortalPage} from "../pages/portal/portal";
import {TranslationService} from "./api/services/translation.service";
import {ReadAloudService} from "../services/read-aloud-service";
import {RouteApiService} from "../services/route-api.service";


export enum MCMModalType {
    hint = 1,
    error = 2,
    solved = 3,
    sampleSolution = 4,
    solvedLow = 5,
    saved = 6,
    subtask = 7,
    calculation = 8,
    general = 9
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: string = 'HomePage';

    public activeNarrative: string = 'default';
    keysTab: string[];
    isOpeningRoute: boolean = false;

    constructor(platform: Platform,
                statusBar: StatusBar,
                languageService: LanguageService,
                events: Events,
                app: App,
                alertCtrl: AlertController,
                translate: TranslateService,
                screenOrientation: ScreenOrientation,
                translation: TranslationService,
                routeApiService: RouteApiService,
                protected readAloud: ReadAloudService,
                private storage: Storage,
                private modalService: ModalsService,
                private deepLinker: DeepLinker) {

        let that = this;
        platform.ready().then(async () => {
            await routeApiService.migrateDataFromSQLiteStorage().catch(e => console.error("old data migration failed", e));
            await languageService.initialize().catch(e => console.error("language service init failed", e));
            await translation.init().catch(e => console.error("translation init failed", e));
            try {
                await readAloud.init(await languageService.getLanguage())
            } catch (e) {
                console.error('Failed to init read aloud', e);
            }
            await this.setRootPage().catch(e => console.error('failed to set rootPage', e));
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // statusBar.styleDefault();
            // statusBar.show();
            if (platform.is('cordova')) {
                if ((<any>window).wkWebView) {
                    (<any>window).wkWebView.injectCookie(Helper.WEBSERVER_URL);
                }
                // if (platform.is('tablet')) {
                //     //force landscape mode on tablets
                //     screenOrientation.lock(screenOrientation.ORIENTATIONS.LANDSCAPE);
                // } else {
                //     //force portrait mode on phones
                //     screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
                // }
                console.log(platform._platforms);
                screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            }
        });

        // zoom.init();

        platform.registerBackButtonAction(async () => {
            let activeNav = app.getActiveNavs()[0];
            let rootNav = app.getRootNav();

            if (rootNav.getActive().component.name === HomePage.name
                && (activeNav.getActive().component.name === "RoutesListPage" || activeNav.getActive().component.name === RoutesMapPage.name || activeNav.getActive().component.name === PortalPage.name)) {
                activeNav.parent.select(0);
                return;
            }
            if (activeNav.getActive().component.name === DashboardPage.name) {
                const alert = alertCtrl.create({
                    title: translate.instant("a_alert_confirm_close"),
                    buttons: [{
                        text: translate.instant("no"),
                        role: 'cancel'
                    }, {
                        text: translate.instant("yes"),
                        handler: () => {
                            platform.exitApp();
                        }
                    }]
                });
                alert.present();
                return;
            }
            if (activeNav.getActive().component.name === ModalCmp.name) {
                activeNav.getActive().dismiss();
                return;
            }
            if (rootNav.canGoBack()) {
                if (rootNav.getActive().component.name === 'TasksMap') {
                    let tasksMap = rootNav.getActive().instance;
                    if (tasksMap.sessionInfo != null) {
                        tasksMap.sessionFinished();
                    } else {
                        if (!this.isOpeningRoute) {
                            this.isOpeningRoute = true;
                            rootNav.pop({}, () => {
                                // necessary because of bug which does not update URL
                                this.deepLinker.navChange('back');
                            });
                            this.modalService.showRoute(tasksMap.route, rootNav).then(async () => {
                                this.isOpeningRoute = false;
                            });
                        }
                    }
                    return;
                } else {
                    rootNav.pop();
                    return;
                }
            }
            if (activeNav.canGoBack()) {
                activeNav.pop();
                return;
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
        if ((navigator as any).splashscreen) {
            (navigator as any).splashscreen.hide();
        }
    }
}

