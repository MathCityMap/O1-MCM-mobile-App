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

import * as L from 'leaflet';
import 'leaflet-geometryutil';


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
  private orangeScore: number;

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
    this.orangeScore = 50;
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

      if(this.taskDetails.skipped){
          this.taskDetails.newTries = 0;
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
    }  else if (this.task.solutionType == "gps"){
      let gpsType = this.task.getSolutionGpsValue("task");
      console.log(gpsType);
      switch (gpsType) {
        case "lineNoDirection":
          this.CalculateLine(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], +this.task.getSolutionGpsValue("length"));
          break;

        case "line":
          this.CalculateLineDirection(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], +this.task.getSolutionGpsValue("length"), +this.task.getSolutionGpsValue("direction"));
          break;

        case "triangle":
          this.CalculateTriangle(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], this.taskDetailMap.pointMarkers[2], +this.task.getSolutionGpsValue("length"));
          break;

        case "square":
          this.CalculateSquare(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], this.taskDetailMap.pointMarkers[2], this.taskDetailMap.pointMarkers[3], +this.task.getSolutionGpsValue("length"));
          break;

        case "centerTwo":
          this.CalculateCenterTwoP(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.taskDetailMap.pointMarkers[0]);
          break;

         case "centerThree":
           this.CalculateCenterThreeP(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.task.getSolutionGpsValue("point3"), this.taskDetailMap.pointMarkers[0]);
           break;

         case "linearFx":
           this.CalculateLinearFx(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.taskDetailMap.pointMarkers[0].getLatLng(), this.taskDetailMap.pointMarkers[1].getLatLng(), this.task.getSolutionGpsValue("slope"), this.task.getSolutionGpsValue("y"));

        default:
          // code...
          break;
      }

    }
  }

  showSolutionSample(){
      if(!this.taskDetails.solved && !this.taskDetails.solvedLow){
          this.score.addFailedTask(this.task.id);
          this.taskDetails.score = 0;
          this.taskDetails.failed = true;
          this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
      }
      let solutionSample = this.task.getSolutionSample();
      let solutionSrc = this.task.getSolutionSampleImgSrc();
      let messages = [];
      if(solutionSample.length == 0 && solutionSrc.length == 0){
          messages = [
              'a_msg_no_solutionsample',
              'p_t_solution',
              this.task.getSolution()
          ]
      }else{
          messages.push(solutionSample);
      }
      let modal = this.modalCtrl.create(MCMIconModal,  {title: 't_samplesolution',
          imageUrl: this.task.getSolutionSampleImgSrc(),
          messages: messages,
          modalType: MCMModalType.sampleSolution,
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
              if(skip){
                  this.taskDetails.skipped = true;
                  this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
              }
              goToNextTaskById(this.task.id, skip);
          }
          // necessary because of bug which does not update URL
          this.deepLinker.navChange('back');
      });
  }


  getNextAvailableHint(){

      if(this.shownHints.indexOf(1) == -1 && this.task.hasHintMessage(1) || !this.task.hasHintMessage(2)){
          return 1;
      }else if(this.shownHints.indexOf(2) == -1 && this.task.hasHintMessage(2) || !this.task.hasHintMessage(3)){
          return 2;
      }else if(this.shownHints.indexOf(3) == -1 && this.task.hasHintMessage(3)){
          return 3;
      }
      return 4;

  }


  taskSolved (solved: string, solution: string, scoreVal: number){
      let that = this;
      if(solved == 'solved' || solved == 'solved_low'){
          this.taskDetails.skipped = false;
          let message = "";
          let title = "";
          let solutions = null;
          if (this.task.solutionType == "gps") solutions = solution.split("#");
          if(solved == 'solved'){
            title = 'a_alert_right_answer_title';
            this.taskDetails.solved = true;
            this.score.addSolvedTask(this.task.id);
            switch (this.taskDetails.tries){
              case 0:
              if (this.task.solutionType == "gps")  message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                else message = 'a_alert_right_answer_1';
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
          let modal = this.modalCtrl.create(MCMIconModal,  {
              title: title,
              message: message,
              solution: solution,
              solutions: solutions,
              modalType: solved == 'solved_low' ? MCMModalType.solvedLow : MCMModalType.solved,
              buttons: [
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
        let tries = this.taskDetails.tries;
        if(this.taskDetails.skipped){
            tries = this.taskDetails.newTries;
        }

        switch (tries){
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
                              if(tries == 3){
                                  let temp = that.getNextAvailableHint();
                                  if(temp < 2) index = temp;
                                  else index = 2;
                              }else if(tries == 4){
                                  let temp = that.getNextAvailableHint();
                                  if(temp < 3) index = temp;
                                  else index = 3;
                              }
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
                  title: 'a_skipTask',
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
      if(this.taskDetails.skipped){
          this.taskDetails.newTries++;
      }
      	let solutions = null;
      	if (this.task.solutionType == "gps") solutions = solution.split("#");
        let modal = this.modalCtrl.create(MCMIconModal,  {
            message: message,
            solutions: solutions,
            modalType: MCMModalType.error,
            buttons: buttons
        }, {
            showBackdrop: true,
            enableBackdropDismiss: true
        });
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


//TODO: Confirm if there are information that needs to be stored or displayed (like distance walked).
//      Check if there is the need to put tries on these tasks
  CalculateLine(pointA: L.Marker, pointB: L.Marker, distance: number){
    let currDistance = (L as any).GeometryUtil.length([pointA.getLatLng(), pointB.getLatLng()]);
    let lenghtSolution = 0;

    let tempGreen = 10;
    let tempOrange = 20;

    if(currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)){
      this.taskSolved("solved", Math.round(currDistance).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
        else this.score.score += this.maxScore;
    } else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)){
      this.taskSolved("solved_low", Math.round(currDistance).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
    } else {
      this.taskSolved('', Math.round(currDistance).toString(), 0);
    }
  }

  CalculateLineDirection(pointA: L.Marker, pointB: L.Marker, distance: number, angle: number){
     let tempGreen = 10;
     let tempOrange = 20;
     let tempAngGreen = 5;
     let tempAngOrange = 10;

     let lenghtSolution = 0;
     let bearingSolution = 0;
     let currDistance = (L as any).GeometryUtil.length([pointA.getLatLng(), pointB.getLatLng()]);
     let currBearing = (L as any).GeometryUtil.bearing(pointA.getLatLng(), pointB.getLatLng());
     if (currBearing < 0) currBearing += 360;

     //Check Distance
     if(currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)){
      lenghtSolution = 2;
      } else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)){
      lenghtSolution = 1;
      } else {
      lenghtSolution = 0;
      }

     //Check Direction
     //The threshold for the green and orange angles is given by the tempAngGreen
     //and tempAngOrange values for the right side, and for the left side its calculated like this:
     let reverse = false;
     let leftGreen = angle - tempGreen;
     let leftOrange = angle - tempOrange;
     if (leftGreen < 0) {leftGreen +=360; reverse = true;}
     if (leftOrange) {leftOrange += 360; reverse = true;}

     if(!reverse){
       if(currBearing > leftGreen && currBearing <  (angle + tempGreen)) bearingSolution = 2;
       else if (currBearing > leftOrange && currBearing <  (angle + tempOrange)) bearingSolution = 1;
       else bearingSolution = 0;
     }
     else{
       if(currBearing > leftGreen || currBearing <  (angle + tempGreen)) bearingSolution = 2;
         else if (currBearing > leftOrange || currBearing <  (angle + tempOrange)) bearingSolution = 1;
         else bearingSolution = 0;
     }

     if(bearingSolution == 2 && lenghtSolution == 2){
      this.taskSolved("solved", Math.round(currDistance).toString()+"#"+Math.round(currBearing-angle).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
        else this.score.score += this.maxScore;
     }
     else if (bearingSolution > 0 && lenghtSolution > 0){
      this.taskSolved("solved_low", Math.round(currDistance).toString()+"#"+Math.round(currBearing-angle).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
      } else this.score.score += this.orangeScore;

     } else {
        this.taskSolved('', Math.round(currDistance).toString()+"#"+Math.round(currBearing-angle).toString(), 0);
      }
  }

  CalculateTriangle (pointA: L.Marker, pointB: L.Marker, pointC: L.Marker, distance: number){

    let edgesLength = [(L as any).GeometryUtil.length([pointA.getLatLng(), pointB.getLatLng()]),
                       (L as any).GeometryUtil.length([pointB.getLatLng(), pointC.getLatLng()]),
                       (L as any).GeometryUtil.length([pointC.getLatLng(), pointA.getLatLng()])];

    let tempGreen = 10;
    let tempOrange = 20;

    let allGreen = true;
    let allOrange = true;

    for (var i = 0; i< edgesLength.length; i++) {
      let lenght = edgesLength[i];

      if (lenght > distance - tempGreen && lenght < distance + tempGreen){}
      else if ( lenght > distance - tempOrange && lenght < + tempOrange) allGreen = false;
      else {allOrange = false; allGreen = false;}
    }

    //check conditions
    if(allGreen){
      this.taskSolved("solved", edgesLength[0].toString()+"#"+edgesLength[1].toString()+"#"+edgesLength[2].toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
        else this.score.score += this.maxScore;
    }
    else if (allOrange){
      this.taskSolved("solved_low", edgesLength[0].toString()+"#"+edgesLength[1].toString()+"#"+edgesLength[2].toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
      } else this.score.score += this.orangeScore;
    }
    else this.taskSolved('', edgesLength[0].toString()+"#"+edgesLength[1].toString()+"#"+edgesLength[2].toString(), 0);
  }

  CalculateSquare (pointA: L.Marker, pointB: L.Marker, pointC: L.Marker, pointD: L.Marker, distance: number){
    let edgesLength = [(L as any).GeometryUtil.length([pointA.getLatLng(), pointB.getLatLng()]),
                       (L as any).GeometryUtil.length([pointB.getLatLng(), pointC.getLatLng()]),
                       (L as any).GeometryUtil.length([pointC.getLatLng(), pointD.getLatLng()]),
                       (L as any).GeometryUtil.length([pointD.getLatLng(), pointA.getLatLng()])];

    let diag1 = (L as any).GeometryUtil.length([pointA.getLatLng(), pointC.getLatLng()]);
    let diag2 = (L as any).GeometryUtil.length([pointB.getLatLng(), pointD.getLatLng()]);


    let tempGreen = 10;
    let tempOrange = 20;

    let allGreen = true;
    let allOrange = true;
    let diagonalSolution = 0;

    //check square sides lenght
    for (var i = 0; i< edgesLength.length; i++) {
      let lenght = edgesLength[i];

      if (lenght > distance - tempGreen && lenght < distance + tempGreen){}
      else if ( lenght > distance - tempOrange && lenght < + tempOrange) allGreen = false;
      else {allOrange = false; allGreen = false;}
    }


    //check square diagonals
    if(Math.abs(diag1-diag2) < tempGreen) diagonalSolution = 2;
    else if (Math.abs(diag1-diag2) < tempOrange) diagonalSolution = 1;
    else diagonalSolution = 0;

    //check conditions
    if(allGreen && diagonalSolution == 2){
      this.taskSolved("solved", edgesLength[0].toString()+"#"+edgesLength[1].toString()+"#"+edgesLength[2].toString()+"#"
      							+edgesLength[3].toString()+"#"+diag1+"#"+diag2, 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
        else this.score.score += this.maxScore;
    }
    else if (allOrange && diagonalSolution > 0){
      this.taskSolved("solved_low", edgesLength[0].toString()+"#"+edgesLength[1].toString()+"#"+edgesLength[2].toString()+"#"
      							   +edgesLength[3].toString()+"#"+diag1+"#"+diag2, 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
      } else this.score.score += this.orangeScore;
    }
    else this.taskSolved('', edgesLength[0].toString()+"#"+edgesLength[1].toString()+"#"+edgesLength[2].toString()+"#"
    						+edgesLength[3].toString()+"#"+diag1+"#"+diag2, 0);
  }

  CalculateCenterTwoP(pointA: L.LatLng, pointB: L.LatLng, currPosition: L.Marker){
    pointA = L.latLng(pointA[0], pointA[1]);
    pointB = L.latLng(pointB[0], pointB[1]);
    console.log(currPosition.getLatLng());
    let distanceA = (L as any).GeometryUtil.length([pointA, currPosition.getLatLng()]);
    let distanceB = (L as any).GeometryUtil.length([pointB, currPosition.getLatLng()]);
    let delta = Math.abs(distanceA - distanceB);

    let tempGreen = 5;
    let tempOrange = 10;

    if(delta < tempGreen){
       this.taskSolved("solved", Math.round(distanceA).toString()+"#"+Math.round(distanceB).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
        else this.score.score += this.maxScore;
    }
    else if (delta < tempOrange){
      this.taskSolved("solved_low", Math.round(distanceA).toString()+"#"+Math.round(distanceB).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
      } else this.score.score += this.orangeScore;
    }
    else this.taskSolved('', Math.round(distanceA).toString()+"#"+Math.round(distanceB).toString(), 0);
  }


  CalculateCenterThreeP(pointA: L.LatLng, pointB: L.LatLng, pointC: L.LatLng, currPosition: L.Marker){
    pointA = L.latLng(pointA[0], pointA[1]);
    pointB = L.latLng(pointB[0], pointB[1]);
    pointC = L.latLng(pointC[0], pointC[1]);

    let distanceA = (L as any).GeometryUtil.length([pointA, currPosition.getLatLng()]);
    let distanceB = (L as any).GeometryUtil.length([pointB, currPosition.getLatLng()]);
    let distanceC = (L as any).GeometryUtil.length([pointC, currPosition.getLatLng()]);
    let deltaAB = Math.abs(distanceA - distanceB);
    let deltaBC = Math.abs(distanceB - distanceC);

    let solution : number;
    let tempGreen = 5;
    let tempOrange = 10;

    if(deltaAB < tempGreen && deltaBC < tempGreen) {
      this.taskSolved("solved", Math.round(distanceA).toString()+"#"+Math.round(distanceB).toString()+"#"+Math.round(distanceC).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
        else this.score.score += this.maxScore;
    }
    else if(deltaAB < tempOrange && deltaBC < tempOrange) {
      this.taskSolved("solved_low", Math.round(distanceA).toString()+"#"+Math.round(distanceB).toString()+"#"+Math.round(distanceC).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
      } else this.score.score += this.orangeScore;
    }
    else this.taskSolved('', Math.round(distanceA).toString()+"#"+Math.round(distanceB).toString()+"#"+Math.round(distanceC).toString(), 0);
  }

  CalculateLinearFx(c0: L.LatLng, c1: L.LatLng, a: L.LatLng, b: L.LatLng, slope: number, yValue: number){

    c0 = L.latLng(c0[0], c0[1]);
    c1 = L.latLng(c1[0], c1[1]);


    let AxisLenght = 100;

    //TODO: Confirm
    if ((L as any).GeometryUtil.length([c0, c1]) < AxisLenght) c1 = (L as any).GeometryUtil.destination(c0, (L as any).GeometryUtil.bearing(c0, c1), AxisLenght);

    let yAngle = (L as any).GeometryUtil.bearing(c0, c1) - 90;
    if (yAngle < 0) yAngle += 360;

    let y = (L as any).GeometryUtil.destination(c0, yAngle, AxisLenght);

    let aX = this.getDistanceToLine(a, c0, y);
    let bX = this.getDistanceToLine(b, c0, y);

    if (aX>bX){
      let helperPoint = a;
      a = b;
      b = helperPoint;
    }

    let aY = this.getDistanceToLine(a, c0, c1);
    let bY = this.getDistanceToLine(b, c0, c1);

    let deltaY = bY - aY;

    let deltaX = bX - aX;

    let m = deltaY/deltaX;

    let yInMeters = aY - m * aX;

    //Verification
    let tempMGreen = 5;
    let tempMOrange = 10;
    let tempYGreen = 5;
    let tempYOrange = 10;
    let solutionSlope = 0;
    let solutionY = 0;

    if (m > slope - tempMGreen && m < slope + tempMGreen) solutionSlope = 2;
    else if (m > slope - tempMOrange && m < slope + tempMOrange) solutionSlope = 1;

    if (yInMeters > yValue - tempYGreen && yInMeters < yValue + tempYGreen) solutionY = 2;
    else if(yInMeters > yValue - tempYOrange && yInMeters < yValue + tempYOrange) solutionY = 1;

    if (solutionSlope == 2 && solutionY == 2){
      this.taskSolved("solved", Math.round(m).toString()+"#"+Math.round(yValue).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
        }
        else this.score.score += this.maxScore;
    }
    else if (solutionSlope>0 && solutionY>0) {
      this.taskSolved("solved_low", Math.round(m).toString()+"#"+Math.round(yValue).toString(), 0);
      if(this.taskDetails.tries > 0){
        let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
        this.score.score +=(tempScore > this.minScore ? tempScore : this.minScore);
      } else this.score.score += this.orangeScore;
    }
    else this.taskSolved('', Math.round(m).toString()+"#"+Math.round(yValue).toString(), 0);
  }

  //Possibly add this to the MyMath class
  getDistanceToLine(p: L.LatLng, start: L.LatLng, final: L.LatLng): number{
      let map = this.taskDetailMap.getMap();
      if(map != null){
          let closestOnLine = (L as any).GeometryUtil.closestOnSegment(map, p, start, final);
          return (L as any).GeometryUtil.length([p, closestOnLine]);
      }
      else{
          return 0;
      }
  }

  setFabColor(index){
   return 'fab-color-'+(index+1);
  }

  getIonContentStyles(){
      if(this.task && this.task.solutionType!='gps'){
        let result = this.task.getImageURL();
        let conditionalBackgroundImageStyles = {'background-image':  'url(" '+ result +' ")'};
        return conditionalBackgroundImageStyles;
      }else return;
   }

  SetMessage(type: string){
  	let result = "";
  	switch (type) {
  		case "lineNoDirection":
  			result = "a_line_no_direction_distance";
  			break;

  		case "line":
  			result = "a_line_direction_distance";
  			break;

  		case "triangle":
  			result = "a_triangle_distances";
  			break;

  		case "square":
  			result = "a_square_distances";
  			break;

  		case "centerTwo":
  			result = "a_center_two_distances";
  			break;

  		case "centerThree":
  			result = "a_center_three_distances";
  			break;

  		case "linearFx":
  			result = "a_linearFx_info";
  			break;
  	}
  	return result;
  }
}
