import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {ConnectionQuality, Helper} from '../../../../classes/Helper';
import {timeout} from 'promise-timeout';

import {OrmService} from '../../../../services/orm-service';
import {Route} from '../../../../entity/Route';
import {ModalsService} from '../../../../services/modals-service';
import {DB_Updater} from '../../../../classes/DB_Updater';
import {Subscription} from 'rxjs/Subscription';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {TranslateService} from '@ngx-translate/core';
import {MCMRouteByCodeModal} from '../../../../modals/MCMRouteByCodeModal/MCMRouteByCodeModal';
import {GpsService} from '../../../../services/gps-service';
import {ChatAndSessionService} from "../../../../services/chat-and-session-service";
import {MCMIconModal} from "../../../../modals/MCMIconModal/MCMIconModal";
import {MCMModalType, MyApp} from "../../../../app/app.component";
import {SearchPipe} from "../../../../app/pipes/search.pipe";

@IonicPage()
@Component({
    selector: 'routes-list',
    templateUrl: 'RoutesList.html'
})
export class RoutesListPage implements OnDestroy {
    @ViewChild(Content) content: Content;
    public items: Route[] = [];
    public downloadedItems: Route[] = [];
    public filteredItems: Route[] = [];
    private routesListSearch: string = "";

    private pipe: SearchPipe;

    private filteredResult: Route[];

    private showAllRoutes: boolean = true;

    modal: any;
    private eventSubscription: Subscription;
    /**
     * How many elements shall be loaded each time the list is scrolled to the end.
     * @type {number}
     */
    private infiniteScrollBlockSize = 20;

    constructor(private ormService: OrmService,
                public navCtrl: NavController,
                public modalsService: ModalsService,
                private modalCtrl: ModalController,
                private spinner: SpinnerDialog,
                private translateService: TranslateService,
                private dbUpdater: DB_Updater,
                public helper: Helper,
                private gpsService: GpsService,
                private chatAndSessionService: ChatAndSessionService,
                private app: MyApp,
                private navParams: NavParams,
    ) {

        this.eventSubscription = this.ormService.eventEmitter.subscribe(async (event) => {
            this.downloadedItems = await this.ormService.getDownloadedRoutes(this.compareFunction);
            this.items = await this.ormService.getVisibleRoutes(false, this.compareFunction);
            this.sortAndRebuildFilteredItems();
            this.filterItems();

        });
    }

    ngOnDestroy() {
        this.eventSubscription.unsubscribe();
    }

    public getRoutesList() {
        return this.routesListSearch.length > 2 ? this.items : this.filteredItems;
    }

    async ionViewWillEnter() {
        console.log('RoutesList ionViewWillEnter()', this.navParams);
        this.pipe = new SearchPipe();
        this.showAllRoutes = this.navParams.data && this.navParams.data.showAllRoutes;
        let activeUser = await this.ormService.getActiveUser();
        if (!activeUser) {
            // initial app start
            let online = await this.modalsService.showNoInternetModalIfOffline();
            if (online) {
                this.spinner.show(null, this.translateService.instant('a_toast_update_start'), true);
                try {
                    await this.dbUpdater.checkForUpdates();
                } catch (e) {
                    console.error('caught error while checking for updates:');
                    console.error(e);
                }
                await this.ormService.setNewActiveUser('Me');
            }
        } else {
            // we need to check for updates
            let quality = await this.helper.checkConnection();
            if (quality == ConnectionQuality.FAST || quality == ConnectionQuality.SLOW) {
                this.spinner.show(null, this.translateService.instant('a_toast_update_start'), true);
                try {
                    await this.dbUpdater.checkForUpdates();
                } catch (e) {
                    console.error('caught error while checking for updates:');
                    console.error(e);
                }
            }
        }
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
                // imageUrl: this.task.getSolutionSampleImgSrc(),
                message: 'a_session_return_text',
                type: 'text',
                modalType: MCMModalType.hint,
                narrativeEnabled: route.isNarrativeEnabled(),
                narrative: this.app.activeNarrative,
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
                            // activeSession.sessionUser = null;
                            modal.dismiss();
                            clearInterval(this.refreshIntervalId);
                        }
                    }
                ]
            }, {showBackdrop: true, enableBackdropDismiss: true});
            // modal.onDidDismiss(data => {
            //     if(this.sessionInfo != null){
            //         let details = JSON.stringify({});
            //         this.chatAndSessionService.addUserEvent("event_viewed_sample_solution", details, this.task.id.toString());
            //     }
            // });
            modal.present();
        }
        this.items = await this.ormService.getVisibleRoutes(true, this.compareFunction);
        this.downloadedItems = await this.ormService.getDownloadedRoutes(this.compareFunction);
        this.filteredItems = this.items.slice(0, this.infiniteScrollBlockSize);
        this.filterItems();

        if(this.helper.getActivateAddRoute()){
            this.addRouteByCode();
            this.helper.setActivateAddRoute(false);
        }

    }

    async doRefresh(refresher) {
        let online = await this.modalsService.showNoInternetModalIfOffline();
        if (online) {
            try {
                await this.dbUpdater.checkForUpdates();
            } catch (e) {
                console.error('caught error while checking for updates:', e);
            }
            this.items = await this.ormService.getVisibleRoutes(false, null, true);
            this.sortAndRebuildFilteredItems();
        }
        refresher.complete();
    }

    async addRouteByCode() {
        let route = await MCMRouteByCodeModal.show(this.navCtrl, this.modalCtrl, this.translateService, this.modalsService);
        if (route) {
            let alreadyAdded = false;
            for (let i = 0; !alreadyAdded && i < this.items.length; i++) {
                if (this.items[i].id == route.id) {
                    // route has been added twice
                    alreadyAdded = true;
                }
            }
            if (!alreadyAdded) {
                this.items.push(route);
                this.sortAndRebuildFilteredItems();
            }
            this.scrollTo(route);
        }
    }

    private compareFunction(a: Route, b: Route) {
        const distA = a.getDistance();
        const distB = b.getDistance();
        if (distA > distB) {
            return 1;
        } else if (distA < distB) {
            return -1;
        }
        return a.title.localeCompare(b.title);
    }


    scrollTo(route: Route) {
        let that = this;
        setTimeout(function () {
            let element = document.getElementById('route-item-' + route.id);
            if (element) {
                that.content.scrollTo(0, element.offsetTop);
            }

        }, 300);
    }

    doInfinite(infiniteScroll) {
        if (this.items.length > this.filteredItems.length) {
            console.info(`Add ${this.infiniteScrollBlockSize} list items ...`);
            let itemsToAdd = this.items.slice(this.filteredItems.length, this.filteredItems.length + this.infiniteScrollBlockSize);
            itemsToAdd.forEach(item => this.filteredItems.push(item));
        } else {
            console.info('End of list reached');
        }
        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

    private sortAndRebuildFilteredItems() {
        this.filteredItems = this.items.slice(0, this.filteredItems.length);
    }

/*    async reactOnDownloadedRoute(event) {
        if (event && event.route) {
            //this.modalsService.showRoute(event.route, this.navCtrl);
        }
    }*/

    async switchToMap() {
        //this.events.publish('changeViewType', (false));
        this.navCtrl.setRoot('RoutesMapPage', {showAllRoutes: this.showAllRoutes});
    }

    async updateRoutes() {
        this.downloadedItems = await this.ormService.getDownloadedRoutes(this.compareFunction);
    }

    showRouteDetail(item: any) {
        this.modalsService.showRoute(item, this.navCtrl).then(async () => {
            await this.updateRoutes();
        })
    }

    filterItems(){
        let value;
        if(this.showAllRoutes) value = this.getRoutesList();
        else value = this.downloadedItems;
        this.filteredResult = this.pipe.transform(value, 'title,city,code', this.routesListSearch)

    }

}
