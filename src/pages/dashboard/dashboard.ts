import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Helper} from "../../classes/Helper";
import { Storage } from "@ionic/storage";
import {GpsService} from "../../services/gps-service";
import {timeout} from 'promise-timeout';

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    devMode: boolean;
    tabBarElement: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private helper: Helper,
                private storage: Storage,
                private gpsService: GpsService) {
                this.tabBarElement = document.querySelector('.tabbar');
    }

    async ngOnInit(){
        /**
         * The first time the app is opened it will ask for geolocation to prevent the map and list to show data
         * from the default one (Frankfurt) for a few seconds
         * The devmode variable is fetched due to not being able to do it trhough the helper service because of the delayed response.
         */
        this.devMode = (await this.storage.get('devMode') === 'true')

        if (!this.gpsService.getLastPosition()) {
            // try to get position
            try {
                await timeout(this.gpsService.getCurrentPosition().catch(err => {
                    console.error("Error loading GPS data", err)
                }), 2000);
            } catch (e) {
                console.log("could not obtain position: " + e.message);
                // make position check async
                this.gpsService.getCurrentPosition().then((position) => {
                    if (position && position.coords) {
                    }
                }, err => {
                    console.error("Error loading GPS data", err)
                });
            }
        }
        //await this.gpsService.isLocationOn();

    }

    pushSettingsPage() {
        this.navCtrl.push('SettingsPage');
    }
    pushInfoPage() {
        this.navCtrl.push('InfoPage');
    }

    switchTab(index: number, addRoute = false){
       if(addRoute){
           this.helper.setActivateAddRoute(true);
       }
       this.navCtrl.parent.select(index);
    }

    ionViewWillEnter(){
        this.devMode = this.helper.getDevMode();
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'none';
        }
    }
    ionViewDidLeave() {
        this.tabBarElement.style.display = 'flex';
    }
}
