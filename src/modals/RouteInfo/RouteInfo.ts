import { Input, ViewChild, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { OrmService } from '../../services/orm-service';
import { DeepLinker } from 'ionic-angular/navigation/deep-linker';

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
export class RouteInfo {
  public activeDownload: Route = null;
  private route: Route;
  private totalDownload = 0;
  private doneDownload = 0;
  private isDownloading = false;

  private totalTasks: number;
  private currentProgress: number = 5;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private deepLinker: DeepLinker,
    private ormService: OrmService) {

    this.route = navParams.data.route;
    this.totalTasks = this.route.tasks.length;
  }

  async doDownload(route: Route) {
    console.log(`Route details ${JSON.stringify(this.route)}`);

    // uncommend this line to switch displaying route (online only mode)
    this.activeDownload = this.route;
    this.totalDownload = 0;
    this.doneDownload = 0;
    const self = this;
    await this.ormService.downloadRoute(self.route, function (doneDownload, totalDownload) {
      self.doneDownload = doneDownload;
      self.totalDownload = totalDownload;
    });
    this.activeDownload = null;
  }

  async showRoute(routeId: number) {
    console.log('routeId', routeId);
    this.navCtrl.push('TasksMap', {routeId: routeId});
    /* this.navCtrl.parent.parent.push('TasksMap', {routeId: routeId}, {}, () => {
      // necessary because of bug which does not update URL
      this.deepLinker.navChange('forward');
    });*/
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
