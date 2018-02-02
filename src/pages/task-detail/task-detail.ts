import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrmService } from '../../services/orm-service';
import { Route } from '../../entity/Route';
import { Task } from '../../entity/Task';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { MCMIconModal } from '../../modals/MCMIconModal/MCMIconModal';
import { MCMModalType } from '../../app/app.component';
import { TaskState } from '../../entity/TaskState';
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
  private taskDetails: TaskState;
  private score: Score;

  private multipleChoiceList: Array<any> = [];



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService,
    private modalCtrl: ModalController
  ){

   }


  async ionViewWillEnter() {
    console.log('TasksMap ionViewWillEnter()');
    this.taskId = this.navParams.get('taskId');
    this.routeId = this.navParams.get('routeId');
    this.task = await this.ormService.findTaskById(this.taskId);
    this.route = await this.ormService.findRouteById(this.routeId);
    this.score = this.route.getScoreForUser(await this.ormService.getActiveUser());
    this.taskDetails = this.score.getTaskStateForTask(this.taskId);
    this.score.score = 0;
    console.log(this.taskDetails);
    if(this.taskDetails.timeFirstOpen == 0){
      this.taskDetails.timeFirstOpen = new Date().getTime();
    }
    console.log(this.task.solutionType);
    console.log(this.task.getSolution());
    if(this.task.solutionType == 'multiple_choice'){
      if(this.taskDetails.solved || this.taskDetails.solvedLow){
        this.multipleChoiceList = this.taskDetails.answerMultipleChoice;
      }else{
        this.multipleChoiceList = this.task.getSolutionOptionList();
      }
    }

  }




  showHint(index: number){
    let title = "";
/*     console.log(" ===============================  ", this.task.getImagesForDownload() );
    console.log(" ===============================  ", this.task.getHint(index) ); */
    let type: string = this.task.getHint(index).type;
    let message: string = this.task.getHint(index).value;
    switch (index){
      case 1:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          //only update if task is not solved
          this.taskDetails.hint1 = true;
        }
        title = 'a_btn_hint1';
        break;
      case 2:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          //only update if task is not solved
          this.taskDetails.hint2 = true;
        }
        title = 'a_btn_hint2';
        break;
      case 3:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          //only update if task is not solved
          this.taskDetails.hint3 = true;
        }
        title = 'a_btn_hint3';
        break;
    }
    this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
    let hintModal = this.modalCtrl.create(MCMIconModal,  {
      title: title,
      type: type,
      message: message,
      modalType: MCMModalType.hint
    }, {showBackdrop: true, enableBackdropDismiss: true});
    hintModal.present();
  }

  checkResult(){
    console.log(this.task.solutionType);
    if(this.task.solutionType == "value"){
      if(this.taskDetails.answer == this.task.getSolution()){
        this.taskSolved('solved', this.taskDetails.answer, 0);
      }else {
        this.taskSolved('', this.taskDetails.answer, 0);
      }
    } else if(this.task.solutionType == "multiple_choice"){
      console.log(this.multipleChoiceList);
      let taskSuccess = true;
      for (let i = 0; i < this.multipleChoiceList.length; i++){
        let item = this.multipleChoiceList[i];
        console.log(item);
        console.log(item.userChecked != item.rightAnswer);
        if(item.userChecked != item.rightAnswer){
            taskSuccess = false;
            console.log('found wrong answer');
            break;
        }
      };
      this.taskDetails.answerMultipleChoice = this.multipleChoiceList;
      console.log(taskSuccess);
      if(taskSuccess){
        this.taskSolved('solved', this.task.getSolution(), 0);
      }else{
        this.taskSolved('', '', 0);
      }
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
            title = 'a_alert_right_answer_title';
            this.taskDetails.solved = true;
            this.score.addSolvedTask(this.task.id);
            switch (this.taskDetails.tries){
              case 0:
                message = 'a_alert_right_answer_1';
                break;
              case 1:
              case 2:
              case 3:
              case 4:
                message = 'a_alert_right_answer_2';
                break;
              case 5:
                message = 'a_alert_right_answer_3';
                break;

            }
          }
          if(solved == 'solved_low'){
            title = 'a_alert_right_answer_title_low';
            this.taskDetails.solvedLow = true;
            this.score.addSolvedTaskLow(this.task.id);
            switch (this.taskDetails.tries){
              case 0:
                message = 'a_alert_right_answer_1_low';
                break;
              case 1:
              case 2:
              case 3:
              case 4:
                message = 'a_alert_right_answer_2_low';
                break;
              case 5:
                message = 'a_alert_right_answer_3_low';
                break;
            }
          }
          let modal = this.modalCtrl.create(MCMIconModal,  {title: title, message: message, solution: solution, modalType: MCMModalType.success}, {showBackdrop: true, enableBackdropDismiss: true});
          modal.onDidDismiss((data) =>{
            console.log(data);
              if(data && data.showMap){
/*                 let currentTaskIndex = this.route.tasks.indexOf(this.task); */
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
            message = 'a_alert_false_answer_1';
            break;
          case 3:
          case 4:
            message = 'a_alert_false_answer_2';
            break;
          default:
            message = 'a_t_skip_msg';
            this.score.addFailedTask(this.task.id);
            break;
        }
        this.taskDetails.tries++;
        let modal = this.modalCtrl.create(MCMIconModal,  {message: message, modalType: MCMModalType.error}, {showBackdrop: true, enableBackdropDismiss: true});
        modal.present();
      }
      this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
  }

}
