import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrmService } from '../../services/orm-service';
import { Route } from '../../entity/Route';
import { Task } from '../../entity/Task';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { MCMIconModal } from '../../modals/MCMIconModal/MCMIconModal';
import { MCMModalType } from '../../app/app.component';


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
    private ormService: OrmService,
    private modalCtrl: ModalController
  ){  }


  async ionViewDidEnter() {
    console.log('TasksMap ionViewDidEnter()');
    this.taskId = this.navParams.get('taskId');
    this.task = await this.ormService.findTaskById(this.taskId);
    console.log('-----------------------------------------------------',this.route);
  }

  showHint(index: number){
    let title = "";
    let message = this.task.getHint(index);
    switch (index){
      case 1:
        title = 'btn_hint1';
        break;
      case 2:
        title = 'btn_hint2';
        break;
      case 3:
        break;
    }

    let hintModal = this.modalCtrl.create(MCMIconModal,  {title: title, message: message, modalType: MCMModalType.hint}, {showBackdrop: true, enableBackdropDismiss: true});
    hintModal.present();
  }

}
