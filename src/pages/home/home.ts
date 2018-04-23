import { Component } from '@angular/core';
import { Network } from '@ionic-native/network';
import {IonicPage, NavController, Platform} from 'ionic-angular';

import { Helper } from '../../classes/Helper';

@IonicPage()
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  private disconnectSubscription: any;
  private connectSubscription: any;
  public static nav: NavController;
  tab1Root = 'RoutesListPage';
  tab2Root = 'MapPage';

  constructor(private navCtrl: NavController, private network: Network, private platform: Platform) {
    HomePage.nav = navCtrl;
  }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      Helper.isOnline = navigator.onLine;
      console.warn(`Connection status: ${Helper.isOnline}`);
      Helper.windowWidth = this.platform.width();
      Helper.windowHeight = this.platform.height();
      this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        console.warn('Network disconnected!');
        Helper.isOnline = false;
      });

      this.connectSubscription = this.network.onConnect().subscribe(() => {
        console.log('Network connected!');
        Helper.isOnline = true;
      });
    })
  }

  ionViewDidLeave() {
    this.disconnectSubscription.unsubscribe();
    this.connectSubscription.unsubscribe();
    console.log("Unsubscribing from network events!")
  }
}