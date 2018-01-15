import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Helper } from '../../../../classes/Helper';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { ModalsService } from '../../../../services/modals-service';
import { DB_Updater } from '../../../../classes/DB_Updater';
import { DBC } from '../../../../classes/DBC';

@IonicPage()
@Component({
    selector: 'page-routes-list',
    templateUrl: 'RoutesList.html'
})
export class RoutesListPage {
    public items: Route[] = [];

    modal: any;

    constructor(private ormService: OrmService, private geolocation: Geolocation,
                public navCtrl: NavController,
                public modalsService: ModalsService,
                private dbUpdater: DB_Updater) {
    }

    async ionViewDidEnter() {

        if (this.items.length === 0) {
            this.items = await this.ormService.getPublicRoutes();
        }
        this.sortItems();
        if (!Helper.myLocation) {
            try {
                const position = await this.geolocation.getCurrentPosition();
                if (position && position.coords) {
                    Helper.myLocation = position;
                    this.sortItems();
                }
            } catch (e) {
                console.log("could not obtain position");
                console.log(e);
            }
        }
    }

    sortItems() {
        this.items.sort((a, b) => {
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
        });
    }

    removeRoute(route: Route): void {
        this.ormService.removeDownloadedRoute(route);
    }

    async doRefresh(refresher) {
        await this.dbUpdater.execute(["getVersions", DBC.DATABASE_TABLE_STATE, "checkForUpdates"]);
        this.items = await this.ormService.getPublicRoutes();
        await this.ionViewDidEnter();
        refresher.complete();
    }
}
