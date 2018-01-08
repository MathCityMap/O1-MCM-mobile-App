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

  private multipleChoiceList: Array<string> = [];
  private multipleChoiceSolutionList: Array<string> = [];



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
    console.log(this.task.getSolution());
    if(this.task.solutionType == 'multiple_choice'){
      let solutionList = this.task.getSolutionOptionList();
      if(solutionList.length > 1){
        this.multipleChoiceList = solutionList[0];
      }

    }

  }

  async ionViewWillLeave() {
    console.log(this.taskDetails);
    await this.ormService.insertOrUpdateTaskDetails(this.score, this.taskDetails);
  }

  checkboxChanged(event: any, index: number){
    console.log(index);
    console.log(event.checked);
    if(event.checked){
      this.multipleChoiceSolutionList.push(""+index);
    }else{
      var i = this.multipleChoiceSolutionList.indexOf(""+index);
      this.multipleChoiceSolutionList.splice(i, 1);
    }
  }

  showHint(index: number){
    let title = "";
    let message = this.task.getHint(index);
    switch (index){
      case 1:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          //only update if task is not solved
          this.taskDetails.hint1 = true;
        }
        title = 'btn_hint1';
        break;
      case 2:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          //only update if task is not solved
          this.taskDetails.hint2 = true;
        }
        title = 'btn_hint2';
        break;
      case 3:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          //only update if task is not solved
          this.taskDetails.hint3 = true;
        }
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
      if(this.taskDetails.answer == this.task.getSolution()){
        this.taskSolved('solved', this.taskDetails.answer, 0);
      }else {
        this.taskSolved('', this.taskDetails.answer, 0);

      }
    } else if(this.task.solutionType == "multiple_choice"){
      console.log(this.multipleChoiceSolutionList);
      let modal = this.modalCtrl.create(MCMIconModal, {message: 'to be implemented', modalType: MCMModalType.hint}, {showBackdrop: true, enableBackdropDismiss: true});
      modal.present();
    } else if(this.task.solutionType == "range"){
      let solutionList = this.task.getSolutionList();
      let von = solutionList[0];
      let bis = solutionList[1];
      let answer = +this.taskDetails.answer;
      if(answer >= von && answer <= bis){
        this.taskSolved('solved', this.taskDetails.answer, 0);
      }else{
        if(solutionList.length == 4){
          //oranges intervall (solvedLow)
          let vonLow = solutionList[2];
          let bisLow = solutionList[3];
          if(answer >= vonLow && answer <= bisLow){
            this.taskSolved('solved_low', this.taskDetails.answer, 0);
          }else{
            this.taskSolved('', '', 0);
          }
        }else{
          this.taskSolved('', '', 0);
        }
      }

    }
  }

  taskSolved (solved: string, solution: string, scoreVal: number){
      if(solved == 'solved' || solved == 'solved_low'){
          let message = "";
          let title = "";
          if(solved == 'solved'){
            title = 'alert_right_answer_title';
            this.taskDetails.solved = true;
            this.score.addSolvedTask(this.task.id);
            switch (this.taskDetails.tries){
              case 0:
                message = 'alert_right_answer_1';
                break;
              case 1:
              case 2:
              case 3:
              case 4:
                message = 'alert_right_answer_2';
                break;
              case 5:
                message = 'alert_right_answer_3';
                break;

            }
          }
          if(solved == 'solved_low'){
            title = 'alert_right_answer_title_low';
            this.taskDetails.solvedLow = true;
            this.score.addSolvedTaskLow(this.task.id);
            switch (this.taskDetails.tries){
              case 0:
                message = 'alert_right_answer_1_low';
                break;
              case 1:
              case 2:
              case 3:
              case 4:
                message = 'alert_right_answer_2_low';
                break;
              case 5:
                message = 'alert_right_answer_3_low';
                break;
            }
          }
          let modal = this.modalCtrl.create(MCMIconModal,  {title: title, message: message, solution: solution, modalType: MCMModalType.success}, {showBackdrop: true, enableBackdropDismiss: true});
          modal.onDidDismiss((data) =>{
            console.log(data);
              if(data && data.showMap){
                let currentTaskIndex = this.route.tasks.indexOf(this.task);
                this.navCtrl.pop();
              }
          })
          modal.present();

          this.taskDetails.timeSolved = new Date().getTime();
      }else{
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
            this.score.addFailedTask(this.task.id);
            break;
        }
        this.taskDetails.tries++;
        let modal = this.modalCtrl.create(MCMIconModal,  {message: message, modalType: MCMModalType.error}, {showBackdrop: true, enableBackdropDismiss: true});
        modal.present();
      }
  }

}
