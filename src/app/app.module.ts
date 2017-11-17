import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { DB_Updater } from '../classes/DB_Updater';
import { ImageDownloaderRoutes } from '../classes/ImageDownloaderRoutes';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/home/tabs/Map/Map';
import { RoutesListPage } from '../pages/home/tabs/RoutesList/RoutesList';


@NgModule({
  declarations: [
    MyApp,
    MapPage,
    RoutesListPage,
    HomePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    RoutesListPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    SQLite,
    File,
    FileTransfer,
    DB_Updater,
    ImageDownloaderRoutes,
    SpinnerDialog,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
