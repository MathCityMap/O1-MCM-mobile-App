import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { ViewController } from 'ionic-angular/navigation/view-controller';

import { Task } from '../../entity/Task';
import { ModalsService } from '../../services/modals-service';
import { RouteInfo } from '../RouteInfo/RouteInfo';


/**
 * Generated class for the RouteInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'centered-task',
  templateUrl: 'CenteredTask.html',
})
export class CenteredTask{
  public route: Route;

  public tasks: Task[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {
  }


  showRoute(route: Route, selectedTask: Task) {
    this.viewCtrl.dismiss({route: route, selectedTask: selectedTask});
  }

  async ionViewWillEnter() {
  	this.route = this.navParams.get('route');
  	this.tasks = await this.route.getTasks();
/*     console.log('-------------------', this.totalTasks); */
  }

}
