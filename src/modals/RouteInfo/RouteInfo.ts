import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { OrmService } from '../../services/orm-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalsService } from '../../services/modals-service';
import { TranslateService } from '@ngx-translate/core';

import { CenteredTask } from '../CenteredTask/CenteredTask';
import { Task } from '../../entity/Task';
import { NavController } from "ionic-angular/navigation/nav-controller";



@Component({
  selector: 'route-info',
  templateUrl: 'RouteInfo.html',
})
export class RouteInfo {
  private route: Route;


  private totalTasks: number;
  private currentProgress = 0;


  constructor(
    public navParams: NavParams,
    private ormService: OrmService,
    private viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public translateService: TranslateService) {
  }

  async ionViewDidEnter(){
    let routeId = this.navParams.get('routeId');
    this.route = await this.ormService.findRouteById(routeId);
    this.totalTasks = this.route.tasks.length;
    this.navCtrl = this.navParams.get('navCtrl');
    let score = this.route.getScoreForUser(await this.ormService.getActiveUser());
    this.currentProgress = score.getTasksSolved().length + score.getTasksSolvedLow().length + score.getTasksFailed().length;
    console.log(this.currentProgress);
  }

  async doDownload(route: Route) {
    // retrieve modalsService via viewCtrl.data to avoid circular dependency
    let modalsService: ModalsService = this.viewCtrl.data.modalsService;
    modalsService.doDownload(route);
  }

showRoute(route: Route, selectedTask: Task) {
    if(route.downloaded){
      this.viewCtrl.dismiss({showRoute: false});
    }
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
