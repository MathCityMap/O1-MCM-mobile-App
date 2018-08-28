import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Content, IonicPage, ModalController, NavController } from 'ionic-angular';
import { Helper } from '../../../../classes/Helper';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { ModalsService } from '../../../../services/modals-service';
import { DB_Updater } from '../../../../classes/DB_Updater';
import { Subscription } from 'rxjs/Subscription';
import { MCMInputModal } from '../../../../modals/MCMInputModal/MCMInputModal';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
    selector: 'page-routes-list',
    templateUrl: 'RoutesList.html'
})
export class RoutesListPage implements OnDestroy {
    @ViewChild(Content) content: Content;
    public items: Route[] = [];
    public helper = Helper;

    modal: any;
    private eventSubscription: Subscription;

    constructor(private ormService: OrmService, 
                private geolocation: Geolocation,
                public navCtrl: NavController,
                public modalsService: ModalsService,
                private modalCtrl: ModalController,
                private spinner: SpinnerDialog,
                private translateService: TranslateService,
                private dbUpdater: DB_Updater) {

        this.eventSubscription = this.ormService.eventEmitter.subscribe(async (event) => {
            this.items = await this.ormService.getVisibleRoutes(false, this.compareFunction);
        });
    }

    ngOnDestroy() {
        this.eventSubscription.unsubscribe();
    }

    async ionViewWillEnter() {
        let activeUser = await this.ormService.getActiveUser();
        if (!activeUser) {
            let online = await this.modalsService.showNoInternetModalIfOffline();
            if (online) {
                this.spinner.show(null, this.translateService.instant('a_toast_update_start'), true);
                try {
                    await this.dbUpdater.checkForUpdates();
                } catch (e) {
                    console.error('caught error while checking for updates:');
                    console.error(e);
                }
            }
            let userModal = this.modalCtrl.create(MCMInputModal);
            await userModal.present();
        }
        this.items = await this.ormService.getVisibleRoutes(true, this.compareFunction);
        if (!Helper.myLocation) {
            try {
                const position = await this.geolocation.getCurrentPosition();
                if (position && position.coords) {
                    Helper.myLocation = position;
                    this.items.sort(this.compareFunction);
                }
            } catch (e) {
                console.log("could not obtain position");
                console.log(e);
            }
        }
    }

    private compareFunction(a: Route, b: Route) {
        const distA = a.getDistance();
        const distB = b.getDistance();
        if (a.downloaded && !b.downloaded)
            return -1;
        if (!a.downloaded && b.downloaded)
            return 1;
        if (distA > distB) {
            return 1;
        } else if (distA < distB) {
            return -1;
        }
        return a.title.localeCompare(b.title);
    }

    async removeRoute(route: Route) {
        await this.ormService.removeDownloadedRoute(route);
        this.items.sort(this.compareFunction);
        this.scrollTo(route);
    }

    async doRefresh(refresher) {
        let online = await this.modalsService.showNoInternetModalIfOffline();
        if (online){
            try {
                await this.dbUpdater.checkForUpdates();
            } catch (e) {
                console.error('caught error while checking for updates:', e);
            }
            this.items = await this.ormService.getVisibleRoutes(false, this.compareFunction, true);
        }
        refresher.complete();
    }

    async addRouteByCode() {
        let route = await this.modalsService.showAddRouteByCodeModal(this.navCtrl);
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
                this.items.sort(this.compareFunction);
            }
            this.scrollTo(route);
        }
    }

    async doDownload(route: Route) {
        if (await this.modalsService.doDownload(route)) {
            this.items.sort(this.compareFunction);
            this.scrollTo(route);
        }
   }

   scrollTo(route: Route) {
        let that = this;
        setTimeout(function() {
            let element = document.getElementById('route-item-' + route.id);
            if (element) {
                that.content.scrollTo(0, element.offsetTop);
            }

        }, 300);
   }
}
