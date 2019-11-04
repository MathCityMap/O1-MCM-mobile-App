import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Helper} from "../../classes/Helper";
import {Deeplinks} from "@ionic-native/deeplinks";
import {ModalsService} from "../../services/modals-service";
import {DB_Updater} from "../../classes/DB_Updater";
import {OrmService} from "../../services/orm-service";


@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    devMode: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private helper: Helper,
                private deeplinks: Deeplinks,
                private modalService: ModalsService,
                private dbUpdater: DB_Updater,
                private ormService: OrmService) {
    }

    ionViewWillEnter(){
        this.devMode = this.helper.getDevMode();
        this.setupDeeplinks();
    }

    pushSettingsPage() {
        this.navCtrl.push('SettingsPage');
    }
    pushInfoPage() {
        this.navCtrl.push('InfoPage');
    }

    switchTab(index: number){
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



    augmentedMode(){
        this.navCtrl.push('AumentedRealityPage');
    }


}
