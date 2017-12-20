import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { Helper } from '../../../../classes/Helper';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { DeepLinker } from 'ionic-angular';
import { RouteInfo } from '../../../../modals/RouteInfo/RouteInfo';

@IonicPage()
@Component({
  selector: 'page-routes-list',
  templateUrl: 'RoutesList.html'
})
export class RoutesListPage {
  public items: Route[] = [];
  private totalDownload = 0;
  private doneDownload = 0;
  private isDownloading = false;
  modal: any;

  constructor(public navCtrl: NavController, private deepLinker: DeepLinker, public modalCtrl: ModalController,
              private ormService: OrmService, private geolocation: Geolocation) {
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
    console.log(`Route details ${JSON.stringify(route)}`);

    // uncommend this line to switch displaying route (online only mode)
    this.isDownloading = true;
    this.totalDownload = 0;
    this.doneDownload = 0;
    const self = this;
    await this.ormService.downloadRoute(route, function (doneDownload, totalDownload) {
      self.doneDownload = doneDownload;
      self.totalDownload = totalDownload;
    });
    this.isDownloading = false;
  }

  async showRoute(routeId: number) {
    this.navCtrl.parent.parent.push('TasksMap', {routeId: routeId}, {}, () => {
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
