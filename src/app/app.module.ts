import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { DB_Updater } from '../classes/DB_Updater';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ModalsService } from '../services/modals-service';
import { LanguageService } from '../services/language-service';
import { Globalization } from '@ionic-native/globalization';

import { MyApp } from './app.component';

/* Translation */
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../providers/translate-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { OrmService } from '../services/orm-service';
import { ImagesService } from '../services/images-service';
import { RouteInfo } from '../modals/RouteInfo/RouteInfo';
import { LinkyModule } from 'angular-linky';
import { MCMDownloadProgressPopupComponent } from '../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import { BroadcastService } from '../services/broadcast-service';
import { MCMIconModal } from '../modals/MCMIconModal/MCMIconModal';
import { MCMInputModal } from '../modals/MCMInputModal/MCMInputModal';
import { MCMRouteByCodeModal } from '../modals/MCMRouteByCodeModal/MCMRouteByCodeModal';
import { MCMTermsAndConditionsModal } from "../modals/MCMTermsAndConditionsModal/MCMTermsAndConditionsModal";
import { MCMJoinSessionModal } from "../modals/MCMJoinSessionModal/MCMJoinSessionModal";
import { MCMSessionFinishedModal } from "../modals/MCMSessionFinishedModal/MCMSessionFinishedModal";
import { CenteredTask } from '../modals/CenteredTask/CenteredTask';
import { GpsService } from '../services/gps-service';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { YoutubePlayerModule } from '../components/ngx-youtube-player/modules/ngx-youtube-player.module';
import { ComponentsModule } from '../components/components.module';
import { Helper } from '../classes/Helper';
import { ChatPage } from "../pages/chat/chat";
import {Autoresize} from "../directives/autoresize";
import { ApiModule } from './api/api.module';
import { ChatAndSessionService } from '../services/chat-and-session-service';



@NgModule({
  declarations: [
    MyApp,
    RouteInfo,
    MCMDownloadProgressPopupComponent,
    MCMIconModal, MCMInputModal, MCMRouteByCodeModal, MCMTermsAndConditionsModal, MCMJoinSessionModal, MCMSessionFinishedModal,
    CenteredTask,
    ChatPage,
    Autoresize
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    ApiModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RouteInfo,
    MCMDownloadProgressPopupComponent,
    MCMIconModal, MCMInputModal, MCMRouteByCodeModal, MCMTermsAndConditionsModal, MCMJoinSessionModal, MCMSessionFinishedModal,
    CenteredTask,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
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
    Helper,
    ChatAndSessionService,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
