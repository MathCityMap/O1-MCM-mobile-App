import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {Network} from '@ionic-native/network';
import {Geolocation} from '@ionic-native/geolocation';
import {SQLite} from '@ionic-native/sqlite';
import {IonicStorageModule} from '@ionic/storage';
import {DB_Updater} from '../classes/DB_Updater';
import {File} from '@ionic-native/file';
import {FileTransfer} from '@ionic-native/file-transfer';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {Diagnostic} from '@ionic-native/diagnostic';
import {ModalsService} from '../services/modals-service';
import {LanguageService} from '../services/language-service';
import {Globalization} from '@ionic-native/globalization';
import {CustomKeyBoard} from '../components/customKeyBoard/custom-keyboard';
import {Camera} from "@ionic-native/camera";

import {MyApp} from './app.component';

/* Translation */
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {createTranslateLoader} from '../providers/translate-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {OrmService} from '../services/orm-service';
import {ImagesService} from '../services/images-service';
import {RouteInfo} from '../modals/RouteInfo/RouteInfo';
import {LinkyModule} from 'angular-linky';
import {
    MCMDownloadProgressPopupComponent
} from '../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import {BroadcastService} from '../services/broadcast-service';
import {MCMIconModal} from '../modals/MCMIconModal/MCMIconModal';
import {MCMIntroModal} from "../modals/MCMIntroModal/MCMIntroModal";
import {MCMRouteByCodeModal} from '../modals/MCMRouteByCodeModal/MCMRouteByCodeModal';
import {MCMTermsAndConditionsModal} from "../modals/MCMTermsAndConditionsModal/MCMTermsAndConditionsModal";
import {MCMJoinSessionModal} from "../modals/MCMJoinSessionModal/MCMJoinSessionModal";
import {MCMSessionFinishedModal} from "../modals/MCMSessionFinishedModal/MCMSessionFinishedModal";
import {CenteredTask} from '../modals/CenteredTask/CenteredTask';
import {GpsService} from '../services/gps-service';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {YoutubePlayerModule} from '../components/ngx-youtube-player/modules/ngx-youtube-player.module';
import {ComponentsModule} from '../components/components.module';
import {Helper} from '../classes/Helper';
import {Autoresize} from "../directives/autoresize";
import {ApiModule} from './api/api.module';
import {ChatAndSessionService} from '../services/chat-and-session-service';
import {ChatPageModule} from '../pages/chat/chat.module';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {AppVersion} from '@ionic-native/app-version';
import {Media} from '@ionic-native/media';
import {ProgressBarModule} from "angular-progress-bar";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {MCMTrailFinishedModal} from "../modals/MCMTrailFinishedModal/MCMTrailFinishedModal";
import {DirectivesModule} from "../directives/directives.module";
import {MCMReportProblemModal} from "../modals/MCMReportProblemModal/MCMReportProblemModal";
import {ReadAloudService} from "../services/read-aloud-service";


@NgModule({
    declarations: [
        MyApp,
        RouteInfo,
        MCMDownloadProgressPopupComponent,
        MCMIconModal, MCMRouteByCodeModal, MCMTermsAndConditionsModal, MCMJoinSessionModal, MCMSessionFinishedModal, MCMIntroModal, MCMTrailFinishedModal,
        MCMReportProblemModal,
        CenteredTask,
        Autoresize,
        CustomKeyBoard
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            tabsHideOnSubPages: true,
            swipeBackEnabled: false
        }),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient],

            }, useDefaultLang: true
        }),
        ComponentsModule,
        LinkyModule,
        YoutubePlayerModule,
        ApiModule,
        ChatPageModule,
        ProgressBarModule,
        DirectivesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        RouteInfo,
        MCMDownloadProgressPopupComponent,
        MCMIconModal, MCMRouteByCodeModal, MCMTermsAndConditionsModal, MCMJoinSessionModal, MCMSessionFinishedModal, MCMIntroModal, MCMTrailFinishedModal,
        MCMReportProblemModal,
        CenteredTask,
        CustomKeyBoard
    ],
    providers: [
        StatusBar,
        Network,
        Geolocation,
        Diagnostic,
        LocationAccuracy,
        SQLite,
        File,
        FileTransfer,
        DB_Updater,
        SpinnerDialog,
        OrmService,
        ImagesService,
        BroadcastService,
        ModalsService,
        GpsService,
        LanguageService,
        ReadAloudService,
        Helper,
        ChatAndSessionService,
        LocalNotifications,
        InAppBrowser,
        AppVersion,
        Globalization,
        Camera,
        Media,
        ScreenOrientation,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig}
    ]
})
export class AppModule {
}
