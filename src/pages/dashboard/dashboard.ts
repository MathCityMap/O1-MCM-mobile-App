import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Helper} from "../../classes/Helper";
import { Storage } from "@ionic/storage";
import {GpsService} from "../../services/gps-service";
import {timeout} from 'promise-timeout';
import {MCMIconModal} from '../../modals/MCMIconModal/MCMIconModal';
import {MCMModalType} from '../../app/app.component';
import {ChatAndSessionService} from '../../services/chat-and-session-service';
import {OrmService} from '../../services/orm-service';
import {ModalsService} from '../../services/modals-service';

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
                private gpsService: GpsService,
                private chatAndSessionService: ChatAndSessionService,
                private ormService: OrmService,
                private modalCtrl: ModalController,
                private modalsService: ModalsService) {
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
        console.log('check for active session');
        let activeSession = await this.chatAndSessionService.getActiveSession();
        if (activeSession != null) {
            console.log('active session found');
            let that = this;
            let route = await this.ormService.findRouteById(activeSession.session.trail_id);
            let modal = this.modalCtrl.create(MCMIconModal, {
                title: 'a_session_return_title',
                message: 'a_session_return_text',
                type: 'text',
                modalType: MCMModalType.hint,
                narrativeEnabled: route.isNarrativeEnabled(),
                narrative: route.isNarrativeEnabled() ? route.getAttributes().narrativeName : '',
                buttons: [
                    {
                        title: 'a_session_return_stay',
                        callback: function () {
                            modal.dismiss();
                            that.modalsService.showRoute(route, that.navCtrl);
                        }
                    },
                    {
                        title: 'a_private_session_quit',
                        callback: function () {
                            if (this.sessionInfo != null) {
                                let details = JSON.stringify({});
                                that.chatAndSessionService.addUserEvent("event_session_leave", details, "0");
                            }
                            that.chatAndSessionService.exitActiveSession();
                            modal.dismiss();
                            clearInterval(this.refreshIntervalId);
                        }
                    }
                ]
            }, {showBackdrop: true, enableBackdropDismiss: true});

            modal.present();
        }

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
       if(index == 3 && !this.devMode){
           return;
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
