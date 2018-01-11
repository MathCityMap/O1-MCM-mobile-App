import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Helper } from '../../../../classes/Helper';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { ModalsService } from '../../../../services/modals-service';

@IonicPage()
@Component({
    selector: 'page-routes-list',
    templateUrl: 'RoutesList.html'
})
export class RoutesListPage {
    public items: Route[] = [];
    public activeDownload: Route = null;

    modal: any;

    constructor(private ormService: OrmService, private geolocation: Geolocation,
                public navCtrl: NavController,
                public modalsService: ModalsService) {
    }

    async ionViewDidEnter() {

        if (this.items.length === 0) {
            this.items = await this.ormService.getPublicRoutes();
        }
        if (Helper.myLocation) {
            this.sortItemsByDistance();
        } else {
            try {
                const position = await this.geolocation.getCurrentPosition();
                if (position && position.coords) {
                    Helper.myLocation = position;
                    this.sortItemsByDistance();
                }
            } catch (e) {
                console.log("could not obtain position");
                console.log(e);
            }
        }
    }

    sortItemsByDistance() {
        this.items.sort((a, b) => {
            const distA = a.getDistance();
            const distB = b.getDistance();
            if (distA > distB) {
                return 1;
            } else if (distA < distB) {
                return -1;
            }
            return 0;
        });
    }

    removeRoute(route: Route): void {
        this.ormService.removeDownloadedRoute(route);
    }


}
