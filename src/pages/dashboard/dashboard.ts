import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Helper} from "../../classes/Helper";
import {Deeplinks} from "@ionic-native/deeplinks";
import {ModalsService} from "../../services/modals-service";
import {DB_Updater} from "../../classes/DB_Updater";
import {OrmService} from "../../services/orm-service";
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
                private deeplinks: Deeplinks,
                private modalService: ModalsService,
                private dbUpdater: DB_Updater,
                private ormService: OrmService,
                private storage: Storage,
                private gpsService: GpsService) {
        this.tabBarElement = document.querySelector('.tabbar');
    }

    async ngOnInit() {
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
    }

    ionViewWillEnter(){
        this.devMode = this.helper.getDevMode();
        this.setupDeeplinks();
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'none';
        }
    }

    ionViewDidLeave() {
        this.tabBarElement.style.display = 'flex';
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


    private setupDeeplinks() {
        console.log("entered deeplinks");
        this.deeplinks.route({
            '/:id': 'RouteInfo'
        }).subscribe(async match => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            let regex = new RegExp(`/(\\d+)`);
            if (regex.test(match.$link.path)) {
                if(await this.navCtrl.canGoBack()) {
                    await this.navCtrl.popAll();
                }
                let online = await this.modalService.showNoInternetModalIfOffline();
                if (online) {
                    try {
                        await this.dbUpdater.checkForUpdates();
                    } catch (e) {
                        console.error('caught error while checking for updates:');
                        console.error(e);
                    }
                    await this.ormService.setNewActiveUser('Me');
                }
                let route = await this.ormService.findRouteById(parseInt(match.$args.id));
                console.log("Nav BEFORE presenting stuff: ", this.navCtrl);

                this.modalService.presentRouteInfoModal(route, this.navCtrl);
                console.log("Nav after presenting stuff: ", this.navCtrl);
                console.log('Successfully matched route', JSON.stringify(match));
            } else {
                this.navCtrl.popToRoot();
                console.log('Got an invalid Deeplink "ID invalid: ' + match.$link.path + '"');
            }
        }, nomatch => {
            // nomatch.$link - the full link data
            console.log('Got a deeplink that didn\'t match', nomatch);
        });
    }
}
