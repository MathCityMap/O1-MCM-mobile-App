import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { Helper } from '../../../../classes/Helper';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { ModalsService } from '../../../../services/modals-service';
import { DB_Updater } from '../../../../classes/DB_Updater';
import { DBC } from '../../../../classes/DBC';
import { MCMRouteByCodeModal } from '../../../../modals/MCMRouteByCodeModal/MCMRouteByCodeModal';

@IonicPage()
@Component({
    selector: 'page-routes-list',
    templateUrl: 'RoutesList.html'
})
export class RoutesListPage {
    public items: Route[] = [];

    modal: any;

    constructor(private ormService: OrmService, 
                private geolocation: Geolocation,
                public navCtrl: NavController,
                public modalsService: ModalsService,
                private dbUpdater: DB_Updater,
                private modalCtrl: ModalController) {
    }

    async ionViewDidEnter() {
        if (this.items.length === 0) {
            this.items = await this.ormService.getVisibleRoutes(true, this.compareFunction);
        }
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
        if (a.downloaded && !b.downloaded)
            return -1;
        if (!a.downloaded && b.downloaded)
            return 1;
        const distA = a.getDistance();
        const distB = b.getDistance();
        if (distA > distB) {
            return 1;
        } else if (distA < distB) {
            return -1;
        }
        return a.title.localeCompare(b.title);
    }

    removeRoute(route: Route): void {
        this.ormService.removeDownloadedRoute(route);
    }

    async doRefresh(refresher) {
        await this.dbUpdater.checkForUpdates();
        this.items = await this.ormService.getVisibleRoutes(false);
        await this.ionViewDidEnter();
        refresher.complete();
    }

    async addRouteByCode() {
        let route = await this.modalsService.showAddRouteByCodeModal();
        if (route) {
            this.items.push(route);
            this.ionViewDidEnter();
        }
    }
}
