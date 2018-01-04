import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { Helper } from '../../../../classes/Helper';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { DeepLinker } from 'ionic-angular';
import { RouteInfo } from '../../../../modals/RouteInfo/RouteInfo';
import { BroadcastService } from '../../../../services/broadcast-service';
import { MCMProgressBarPopupComponent } from '../../../../components/mcm-progress-bar-popup/mcm-progress-bar-popup.component';
import { BasicRouteFunction } from '../BasicRouteFunction/BasicRouteFunction';

@IonicPage()
@Component({
  selector: 'page-routes-list',
  templateUrl: 'RoutesList.html'
})
export class RoutesListPage extends BasicRouteFunction{
  public items: Route[] = [];
  public activeDownload: Route = null;

  modal: any;

  constructor(public navCtrl: NavController, private deepLinker: DeepLinker, modalCtrl: ModalController,
              broadcastService: BroadcastService,
              ormService: OrmService, private geolocation: Geolocation) {
                super(modalCtrl, ormService, broadcastService);
  }

  async ionViewDidEnter() {
    if (this.items.length === 0) {
      this.items = await this.ormService.getPublicRoutes();
    }
    if (Helper.myLocation) {
      this.sortItemsByDistance();
    } else {
      const position = await this.geolocation.getCurrentPosition();
      if (position && position.coords) {
        Helper.myLocation = position;
        this.sortItemsByDistance();
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

  async doDownload(route: Route) {
    super.doDownload(route);
  }

  async showRoute(routeId: number, routeTitle: string) {
    this.navCtrl.parent.parent.push('TasksMap', {routeId: routeId, routeTitle: routeTitle}, {}, () => {
      // necessary because of bug which does not update URL
      this.deepLinker.navChange('forward');
    });
  }

  removeRoute(route: Route): void {
    this.ormService.removeDownloadedRoute(route);
  }

  presentRouteInfoModal(route: Route): void {
    let routeInfoModal = this.modalCtrl.create(RouteInfo, {route: route});
    routeInfoModal.present();
  }

}
