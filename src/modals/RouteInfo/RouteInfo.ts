import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { OrmService } from '../../services/orm-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalsService } from '../../services/modals-service';

import { CenteredTask } from '../CenteredTask/CenteredTask';
import { Task } from '../../entity/Task';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

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
    public modalCtrl: ModalController) {
  }

  async ionViewDidEnter(){
    let routeId = this.navParams.get('routeId');
    this.route = await this.ormService.findRouteById(routeId);
    this.totalTasks = this.route.tasks.length;
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
      this.viewCtrl.dismiss({showRoute: true, route: route, selectedTask: selectedTask});
    }
  }

  showTaskList(route: Route){
    let self = this;
    let testModal = this.modalCtrl.create(CenteredTask, {route: route, tasks: route.tasks});
     testModal.onDidDismiss(data => {
            this.showRoute(data.route, data.selectedTask);
        })
    testModal.present();
  }

  removeRoute(route: Route): void {
    console.log('ORM route', this.route);
    this.ormService.removeDownloadedRoute(this.route);
  }

  ionViewDidLoad() {
    console.log('route',this.route);
/*     console.log('-------------------', this.totalTasks); */
  }

  alertList() {
    let confirm = this.alertCtrl.create({
      title: 'Select a start point',
      message: 'Do you want to start from a certain task?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.showRoute(this.route, null);
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.showTaskList(this.route);
          }
        }
      ]
    });
    confirm.present()
  }

}
