import { Component } from '@angular/core';
import {DeepLinker, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { OrmService } from '../../services/orm-service';
import { Route } from '../../entity/Route';
import { Task } from '../../entity/Task';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { MCMIconModal } from '../../modals/MCMIconModal/MCMIconModal';
import { MCMModalType } from '../../app/app.component';
import { TaskState } from '../../entity/TaskState';
import { Score } from '../../entity/Score';
import { TaskDetailMap } from './task-detail-map';


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
export class TaskDetail{
  private route: Route;
  private routeId: number;
  private taskId: number;
  private task: Task;
  private taskDetails: TaskState;
  private score: Score;

  private minScore: number;
  private penalty: number;
  private maxScore: number;

  private multipleChoiceList: Array<any> = [];

    // For GPS - tasks
    private taskDetailMap : TaskDetailMap;
    private gpsTaskButtonLabels: Array<string> = [];
    shownHints: number[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService,
    private modalCtrl: ModalController,
    private geolocation: Geolocation,
    private deepLinker: DeepLinker
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

    console.log(this.route.attr);

    //Temporary attribution of the scores, later they should come from the server, associated with each task
    this.maxScore = 100;
    this.penalty = 10;
    this.minScore = 10;


    if(this.score.score == null) this.score.score = 0;
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
      // Init task detail map, if task is gps task
      if(this.task.solutionType == "gps"){
          this.taskDetailMap = new TaskDetailMap(this.geolocation, this.task, this.route);
          this.taskDetailMap.loadMap();

          // Insert predefined points / axis
          let gpsType = this.task.getSolutionGpsValue("task");
          if(gpsType != null){
              let points = [];
              if(gpsType == "centerTwo"){
                  points = [
                      this.task.getSolutionGpsValue("point1"),
                      this.task.getSolutionGpsValue("point2")
                  ];
              }
              if(gpsType == "centerThree"){
                  points = [
                      this.task.getSolutionGpsValue("point1"),
                      this.task.getSolutionGpsValue("point2"),
                      this.task.getSolutionGpsValue("point3")
                  ];
              }
              if(points.length > 0){
                  this.taskDetailMap.insertPreDefinedPoints(points);
              }
              if(gpsType == "linearFx"){
                  this.taskDetailMap.insertAxis(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"));
              }
          }

          // Init Buttons for positioning markers
          let buttonCount = this.task.getSolutionGpsValue("points");
          if(buttonCount != null){
              buttonCount = parseInt(buttonCount);
          }
          else{
              buttonCount = 0;
          }
          let startCharCode = "A".charCodeAt(0);
          for(let i = 0; i < buttonCount; i++){
              this.gpsTaskButtonLabels[i] = String.fromCharCode(startCharCode + i);
          }
      }
  }



  showHint(index: number){
      let needUpdate: boolean = false;
    let title = "";
/*     console.log(" ===============================  ", this.task.getImagesForDownload() );
    console.log(" ===============================  ", this.task.getHint(index) ); */
    let type: string = this.task.getHint(index).type;
    let message: string = this.task.getHint(index).value;
    if(this.shownHints.indexOf(index) == -1){
        this.shownHints.push(index);
    }
    switch (index){
      case 1:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed){
          //only update if task is not solved
          this.taskDetails.hint1 = true;
          needUpdate= true;
        }
        title = 'a_btn_hint1';
        break;
      case 2:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed){
          //only update if task is not solved
          this.taskDetails.hint2 = true;
          needUpdate= true;
        }
        title = 'a_btn_hint2';
        break;
      case 3:
        if(!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed){
          //only update if task is not solved
          this.taskDetails.hint3 = true;
          needUpdate= true;
        }
        title = 'a_btn_hint3';
        break;
    }
    if(needUpdate){
        this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
    }

    let hintModal = this.modalCtrl.create(MCMIconModal,  {
      title: title,
      type: type,
      message: message,
      modalType: MCMModalType.hint,
      buttons: [
          {
              title: 'a_alert_close',
              callback: function(){
                  hintModal.dismiss();
              }
          }
      ]

    }, {showBackdrop: true, enableBackdropDismiss: true});
    hintModal.present();
  }

  checkResult(){
    console.log(this.task.solutionType);
    if(this.task.solutionType == "value"){
      if(this.taskDetails.answer == this.task.getSolution()){
        this.CalculateScore("value", "solved");
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
      }
      this.taskDetails.answerMultipleChoice = this.multipleChoiceList;
      console.log(taskSuccess);
      if(taskSuccess){
        this.CalculateScore("multiple_choice", "solved");
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
        this.CalculateScore("range", "solved");
        this.taskSolved('solved', this.taskDetails.answer, 0);
      }else{
        if(solutionList.length == 4){
          //oranges intervall (solvedLow)
          let vonLow = solutionList[2];
          let bisLow = solutionList[3];
          if(answer >= vonLow && answer <= bisLow){
            this.CalculateScore("range", "solved_low");
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

  showSolutionSample(){
      if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          this.score.addFailedTask(this.task.id);
          this.taskDetails.failed = true;
          this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
      }
      let modal = this.modalCtrl.create(MCMIconModal,  {title: 't_samplesolution', message: this.task.getSolutionSample(), modalType: MCMModalType.success,
          buttons: [
              {
                  title: 'a_alert_close',
                  callback: function(){
                      modal.dismiss();
                  }
              }
          ]}, {showBackdrop: true, enableBackdropDismiss: true});
      modal.onDidDismiss((data) =>{
          console.log(data);
      });
      modal.present();
  }


  closeDetails(skip?: boolean){
      this.navCtrl.pop({}, () => {
          if(this.navParams.get('goToNextTaskById')){
              let goToNextTaskById = this.navParams.get('goToNextTaskById');
              goToNextTaskById(this.task.id, skip);
          }
          // necessary because of bug which does not update URL
          this.deepLinker.navChange('back');
      });
  }


  getNextAvailableHint(){

      if(this.shownHints.indexOf(1) == -1 && this.task.hasHintMessage(1) || !this.task.hasHintMessage(2)){
            console.log("next hint: #"+ 1);
          return 1;
      }else if(this.shownHints.indexOf(2) == -1 && this.task.hasHintMessage(2) || !this.task.hasHintMessage(3)){
          console.log("next hint: #"+ 2);
          return 2;
      }else if(this.shownHints.indexOf(3) == -1 && this.task.hasHintMessage(3)){
          console.log("next hint: #"+ 3);
          return 3;
      }
      console.log("next hint: #"+ 4);
      return 4;

  }


  taskSolved (solved: string, solution: string, scoreVal: number){
      let that = this;
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
          let that = this;
          let modal = this.modalCtrl.create(MCMIconModal,  {title: title, message: message, solution: solution, modalType: MCMModalType.success, buttons: [
                  {
                      title: 't_samplesolution',
                      callback: function(){
                          modal.dismiss().then(() =>{
                              that.showSolutionSample();
                          });
                      }
                  }, {
                      title: 'pdf_next_task',
                      callback: function(){
                          modal.dismiss().then(() =>{
                              that.closeDetails(false);
                          });
                      }
                  }
              ]}, {showBackdrop: true, enableBackdropDismiss: true});
          modal.onDidDismiss((data) =>{
            console.log(data);
              if(data && data.showMap){
/*                 let currentTaskIndex = this.route.tasks.indexOf(this.task); */
                this.navCtrl.pop();
              }
          });
          modal.present();

          this.taskDetails.timeSolved = new Date().getTime();
      }else{
        let message = "";
        let buttons;
        switch (this.taskDetails.tries){
          case 0:
          case 1:
            message = 'a_alert_false_answer_1';
            buttons = [
                {
                    title: 'a_alert_close',
                    callback: function(){
                        modal.dismiss();
                    }
                }
            ];
            break;
          case 2:
          case 3:
          case 4:
            message = 'a_alert_false_answer_2';

              buttons = [
                  {
                      title: 'a_t_show_hint',
                      callback: function(){
                          modal.dismiss().then(() => {
                              let index = 1;
                              //number of tries already increased
                              if(that.taskDetails.tries == 4){
                                  let temp = that.getNextAvailableHint();
                                  if(temp < 2) index = temp;
                                  else index = 2;
                              }else if(that.taskDetails.tries == 5){
                                  let temp = that.getNextAvailableHint();
                                  if(temp < 3) index = temp;
                                  else index = 3;
                              }
                              console.log("tries" +that.taskDetails.tries );
                              console.log("show hint #" +index);
                              that.showHint(index);
                          });
                      }
                  },{
                      title: 'a_alert_close',
                      callback: function(){
                          modal.dismiss();
                      }
                  }
              ];
            break;
          default:
            message = 'a_t_skip_msg';
             buttons = [
                  {
                      title: 't_samplesolution',
                      callback: function(){
                          modal.dismiss().then(() =>{
                              that.showSolutionSample();
                          });
                      }
                  }, {
                  title: 'pdf_next_task',
                  callback: function(){
                      modal.dismiss().then(() =>{
                          that.closeDetails(true);
                      });
                  }
              }
              ];

            break;
        }
        this.taskDetails.tries++;
        let modal = this.modalCtrl.create(MCMIconModal,  {message: message, modalType: MCMModalType.error, buttons: buttons}, {showBackdrop: true, enableBackdropDismiss: true});
        modal.present();
      }
      this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
  }

  CalculateScore (solutionType: string, solved: string) {
    if(solutionType == "value"){
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
        this.score.score += this.taskDetails.score;
      } 
      else {
          this.taskDetails.score = this.maxScore;
          this.score.score += this.taskDetails.score;
      }
    }

    if(solutionType == "multiple_choice"){
      if(this.taskDetails.tries > 0){
         let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
          this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
          this.score.score += this.taskDetails.score;
       }
      else {
          this.taskDetails.score = this.maxScore;
          this.score.score += this.taskDetails.score;
      }
    }
     if(solutionType == "range"){
       if(solved == "solved"){
          if(this.taskDetails.tries > 0){
            let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
            this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            this.score.score += this.taskDetails.score;
          }
          else {
              this.taskDetails.score = this.maxScore;
              this.score.score += this.taskDetails.score;
          }
       }
       else if(solved == "solved_low"){
           let solutionList = this.task.getSolutionList();

           //if the orange interval is below the green
           if(+this.taskDetails.answer < solutionList[0]){
              if(this.taskDetails.tries > 0) {
                let tempScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], + this.taskDetails.answer) - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                this.score.score += this.taskDetails.score;
              }
              else {
                  this.taskDetails.score = this.CalculateOrangeScore(solutionList[2], solutionList[0], +this.taskDetails.answer);
                  this.score.score += this.taskDetails.score;
              }
          }
           else {
             if (this.taskDetails.tries > 0) {
               let tempScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], + this.taskDetails.answer) - ((this.taskDetails.tries - 1) * this.penalty);
               this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
               this.score.score += this.taskDetails.score;
             }
             else {
               this.taskDetails.score = this.CalculateOrangeScore(solutionList[3], solutionList[1], +this.taskDetails.answer);
               this.score.score += this.taskDetails.score;
             }
           }
       }
     }
     console.log("FinalScore: " + this.score.score);
  }

  CalculateOrangeScore(borderLeft: number, borderRight: number, value: number): number{
    let intervalLenght = Math.abs(borderRight-borderLeft);
    console.log("borderRight " + borderRight + "  BorderLeft " + borderLeft);
    let xVal = (Math.abs(value - borderLeft)/intervalLenght) * this.maxScore;
    let score = Math.round(xVal);

    if(score < this.minScore) return this.minScore;
    else return score;
  }

}
