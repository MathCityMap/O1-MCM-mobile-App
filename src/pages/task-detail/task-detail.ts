import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrmService } from '../../services/orm-service';
import { Route } from '../../entity/Route';
import { Task } from '../../entity/Task';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { MCMIconModal } from '../../modals/MCMIconModal/MCMIconModal';
import { MCMModalType } from '../../app/app.component';
import { TaskDetails } from '../../entity/TaskDetails';
import { User } from '../../entity/User';
import { Score } from '../../entity/Score';


/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    segment: ':routeId/TasksDetail/:taskId'
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
  private taskDetails: TaskDetails;
  private score: Score;
  private userResult: string;

  private multipleChoiceList: Array<string> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService,
    private modalCtrl: ModalController
  ){  }


  async ionViewDidEnter() {
    console.log('TasksMap ionViewDidEnter()');
    this.taskId = this.navParams.get('taskId');
    this.routeId = this.navParams.get('routeId');
    this.task = await this.ormService.findTaskById(this.taskId);
    this.route = await this.ormService.findRouteById(this.routeId);
    this.score = this.route.getScore();
    this.taskDetails = this.score.getTaskDetailsForTask(this.taskId);
    this.score.score = 0;
    console.log(this.taskDetails);
    if(this.taskDetails.timeFirstOpen == 0){
      this.taskDetails.timeFirstOpen = new Date().getTime();
    }
    console.log(this.task.solutionType);
    if(this.task.solutionType == 'multiple_choice'){
      let solutionList = this.task.getSolutionList();
      if(solutionList.length > 1){
        this.multipleChoiceList = solutionList[0];
      }

    }

  }

  async ionViewWillLeave() {
    console.log(this.taskDetails);
    await this.ormService.insertOrUpdateTaskDetails(this.score, this.taskDetails);
  }

  showHint(index: number){
    let title = "";
    let message = this.task.getHint(index);
    switch (index){
      case 1:
        this.taskDetails.hint1 = true;
        title = 'btn_hint1';
        break;
      case 2:
        this.taskDetails.hint2 = true;
        title = 'btn_hint2';
        break;
      case 3:
        this.taskDetails.hint3 = true;
        title = 'btn_hint3';
        break;
    }

    let hintModal = this.modalCtrl.create(MCMIconModal,  {title: title, message: message, modalType: MCMModalType.hint}, {showBackdrop: true, enableBackdropDismiss: true});
    hintModal.present();
  }

  checkResult(){
    var modal;
    console.log(this.task.solutionType);
    if(this.task.solutionType == "value"){
      if(this.userResult == this.task.solution){
        let message = "";
        switch (this.taskDetails.tries){
          case 0:
            message = 'alert_right_answer_1';
            break;
          case 1:
          case 2:
          case 3:
            message = 'alert_right_answer_2';
            break;
        }
        modal = this.modalCtrl.create(MCMIconModal,  {message: message, modalType: MCMModalType.success}, {showBackdrop: true, enableBackdropDismiss: true});
        modal.present();
      }else {
        let message = "";
        switch (this.taskDetails.tries){
          case 0:
          case 1:
          case 2:
            message = 'alert_false_answer_1';
            break;
          case 3:
          case 4:
            message = 'alert_false_answer_2';
            break;
          default:
            message = 't_skip_msg';
            break;
        }
        this.taskDetails.tries++;
        modal = this.modalCtrl.create(MCMIconModal,  {message: message, modalType: MCMModalType.error}, {showBackdrop: true, enableBackdropDismiss: true});
        modal.present();

      }
    }


  }

}
