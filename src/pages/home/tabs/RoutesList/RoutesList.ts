import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { Helper } from '../../../../classes/Helper';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { DeepLinker } from 'ionic-angular';
import { RouteInfo } from '../../../../modals/RouteInfo/RouteInfo';
import { BroadcastService } from '../../../../services/broadcast-service';
import { MCMDownloadProgressPopupComponent } from '../../../../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import { BasicRouteFunction } from '../BasicRouteFunction/BasicRouteFunction';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-routes-list',
  templateUrl: 'RoutesList.html'
})
export class RoutesListPage extends BasicRouteFunction{
  public items: Route[] = [];
  public activeDownload: Route = null;

  modal: any;

  constructor(public navCtrl: NavController, deepLinker: DeepLinker, modalCtrl: ModalController,
              broadcastService: BroadcastService,
              ormService: OrmService, private geolocation: Geolocation, private spinner: SpinnerDialog,
              private translateService: TranslateService) {
                super(modalCtrl, ormService, broadcastService, navCtrl, deepLinker);
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


  showRoute(route: Route) {
    super.showRoute(route);
  }

  removeRoute(route: Route): void {
    this.ormService.removeDownloadedRoute(route);
  }



}
