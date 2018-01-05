import { Input, ViewChild, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { OrmService } from '../../services/orm-service';
import { DeepLinker } from 'ionic-angular/navigation/deep-linker';
import { MCMDownloadProgressPopupComponent } from '../../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { BroadcastService } from '../../services/broadcast-service';
import { BasicRouteFunction } from '../../pages/home/tabs/BasicRouteFunction/BasicRouteFunction';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the RouteInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'route-info',
  templateUrl: 'RouteInfo.html',
})
export class RouteInfo extends BasicRouteFunction{
  public activeDownload: Route = null;
  private route: Route;


  private totalTasks: number;
  private currentProgress: number = 5;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    deepLinker: DeepLinker,
    ormService: OrmService,
    modalCtrl: ModalController,
    broadcastService: BroadcastService,
    private viewCtrl: ViewController) {
      super(modalCtrl, ormService, broadcastService, navCtrl, deepLinker);
    this.route = navParams.data.route;
    this.totalTasks = this.route.tasks.length;
  }

  async doDownload(route: Route) {
    super.doDownload(route);
  }

  showRoute(routeId: number, routeTitle:string) {
    this.viewCtrl.dismiss({showRoute: true, routeId: routeId, routeTitle:routeTitle});
  }

  removeRoute(route: Route): void {
    console.log('ORM route', this.route);
    this.ormService.removeDownloadedRoute(this.route);
  }

  ionViewDidLoad() {
    console.log('route',this.route);
/*     console.log('-------------------', this.totalTasks); */
  }

}
