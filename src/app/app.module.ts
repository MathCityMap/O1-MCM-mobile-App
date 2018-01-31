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

import { MyApp } from './app.component';

/* Translation */
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { createTranslateLoader } from '../providers/translate-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { OrmService } from '../services/orm-service';
import {ImagesService} from '../services/images-service';
import { RouteInfo } from '../modals/RouteInfo/RouteInfo';
import { MCMHeaderModule } from '../components/mcm-header/mcm-header.module';
import { LinkyModule } from 'angular-linky';
import { MCMDownloadProgressPopupComponent } from '../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import { BroadcastService } from '../services/broadcast-service';
import { MCMIconModal } from '../modals/MCMIconModal/MCMIconModal';
import { MCMInputModal } from '../modals/MCMInputModal/MCMInputModal';
import { MCMRouteByCodeModal } from '../modals/MCMRouteByCodeModal/MCMRouteByCodeModal';

import { CenteredTask } from '../modals/CenteredTask/CenteredTask';
import { gpsService } from '../services/gps-service';
import { LocationAccuracy } from '@ionic-native/location-accuracy';


@NgModule({
  declarations: [
    MyApp,
    RouteInfo,
    MCMDownloadProgressPopupComponent,
    MCMIconModal, MCMInputModal, MCMRouteByCodeModal,
    CenteredTask
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
    MCMHeaderModule,
    LinkyModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RouteInfo,
    MCMDownloadProgressPopupComponent,
    MCMIconModal, MCMInputModal, MCMRouteByCodeModal,
    CenteredTask
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
    gpsService,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
