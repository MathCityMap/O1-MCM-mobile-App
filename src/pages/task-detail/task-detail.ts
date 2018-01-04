import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrmService } from '../../services/orm-service';
import { Route } from '../../entity/Route';
import { Task } from '../../entity/Task';


/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    segment: 'TasksDetail/:taskId'
})
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetail {
  private route: Route;
  private routeId: number;
  private taskId: number;
  private task: Task;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService
  ){  }


  async ionViewDidEnter() {
    console.log('TasksMap ionViewDidEnter()');
    this.taskId = this.navParams.get('taskId');
    this.task = await this.ormService.findTaskById(this.taskId);
    console.log('-----------------------------------------------------',this.route);
  }

}
