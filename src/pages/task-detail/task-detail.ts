import {Component, ViewChild} from '@angular/core';
import {Content, DeepLinker, IonicPage, NavController, NavParams} from 'ionic-angular';

import {OrmService} from '../../services/orm-service';
import {Route} from '../../entity/Route';
import {Task} from '../../entity/Task';
import {ModalController} from 'ionic-angular/components/modal/modal-controller';
import {MCMIconModal} from '../../modals/MCMIconModal/MCMIconModal';
import {MCMModalType} from '../../app/app.component';
import {TaskState} from '../../entity/TaskState';
import {Score} from '../../entity/Score';
import {TaskDetailMap} from './task-detail-map';
import {CustomKeyBoard} from '../../components/customKeyBoard/custom-keyboard';

import * as L from 'leaflet';
import 'leaflet-geometryutil';
import {ModalsService} from '../../services/modals-service';
import {GpsService} from '../../services/gps-service';
import {Subscription} from "rxjs/Subscription";
import {ChatAndSessionService, SessionInfo} from "../../services/chat-and-session-service";

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
    @ViewChild(Content) content: Content;


    // Keyboard open
    private keyboardOpen;
    private route: Route;
    private routeId: number;
    private taskId: number;
    private task: Task;
    private taskDetails: TaskState;
    private score: Score;
    private gamificationIsDisabled = false;

    private minScore: number;
    private penalty: number;
    private maxScore: number;
    private orangeScore: number;

    private multipleChoiceList: Array<any> = [];

    private sessionInfo: SessionInfo;

    // For GPS - tasks
    private taskDetailMap: TaskDetailMap;
    private gpsTaskButtonLabels: Array<string> = [];
    shownHints: number[] = [];

    private keyboardSubscriptions : Subscription = new Subscription();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private ormService: OrmService,
        private modalCtrl: ModalController,
        private deepLinker: DeepLinker,
        private modalsService: ModalsService,
        private gpsService: GpsService,
        private chatAndSessionService: ChatAndSessionService,
    ) {
    }

    /*
      Custom Keyboard subscribe
    */
    subscribeCKEvents(){

        // Subscribe to the click event observable
        // Here we add the clicked key value to the string
        this.keyboardSubscriptions.add(
            CustomKeyBoard.onCKClick.subscribe((key) => {
                    if(this.taskDetails.timeSolved == 0 && !this.taskDetails.failed){
                        if (key === "C") {
                            this.taskDetails.answer = "";
                        }
                        else if (key === "✔") { // ✔
                            this.checkResult();
                        }
                        else {
                            this.taskDetails.answer += key;
                        }
                    }
                },
                err => {console.log(err);},
                () => {console.log('onCKClick subscribed.');}
            )
        );


        // Subscribe to the delete event observable
        // Here we delete the last character of the string
        this.keyboardSubscriptions.add(
            CustomKeyBoard.onDeleteClick.subscribe(
                () => {
                    this.taskDetails.answer = this.taskDetails.answer.slice(0, this.taskDetails.answer.length - 1);
                },
                err => {console.log(err)},
                () => {console.log('onDeleteClick subscribed.');}
            )
        );

        this.keyboardSubscriptions.add(
            CustomKeyBoard.onCKHide.subscribe(
                () => {
                    this.setKeyboardOn(false);
                },
                err => {console.log(err)},
                () => {console.log('onCKHide subscribed.');}
            )
        );
    }

    /*
    Custom Keyboard unsubscribe
     */
    private unsubscribeCKEvents(){
        this.keyboardSubscriptions.unsubscribe();
    }

    async ionViewWillEnter() {
        console.log('TasksMap ionViewWillEnter()');
        this.routeId = this.navParams.get('routeId');
        this.route = await this.ormService.findRouteById(this.routeId);
        this.taskId = this.navParams.get('taskId');
        this.task = await this.ormService.findTaskById(this.taskId);
        this.score = this.route.getScoreForUser(await this.ormService.getActiveUser());
        this.taskDetails = this.score.getTaskStateForTask(this.taskId);
        this.sessionInfo = await this.chatAndSessionService.getActiveSession();
        console.log(this.sessionInfo);
        // Add event of user entering trail when session active
        if(this.sessionInfo != null){
            let details = JSON.stringify({title: this.task.title});
            this.chatAndSessionService.addUserEvent("event_task_opened", details, this.task.id.toString());
        }

        if(this.taskDetails.timeSolved == 0){
            // Do not display last entered answer
            this.taskDetails.answer = "";
        }

        this.gamificationIsDisabled = this.route.isGamificationDisabled();

        //Temporary attribution of the scores, later they should come from the server, associated with each task
        this.maxScore = 100;
        this.orangeScore = 50;
        this.penalty = 10;
        this.minScore = 10;


        if (this.score.score == null) this.score.score = 0;
        console.log(this.taskDetails);
        if (this.taskDetails.timeFirstOpen == 0) {
            this.taskDetails.timeFirstOpen = new Date().getTime();
        }
        console.log(this.task.solutionType);
        console.log(this.task.getSolution());
        if (this.task.solutionType == 'multiple_choice') {
            if (this.taskDetails.solved || this.taskDetails.solvedLow) {
                this.multipleChoiceList = this.taskDetails.answerMultipleChoice;
            } else {
                this.multipleChoiceList = this.task.getSolutionOptionList();
            }
        }
        // Init task detail map, if task is gps task
        if (this.task.solutionType == "gps") {
            this.taskDetailMap = new TaskDetailMap(this.task, this.route, this.gpsService);
            this.taskDetailMap.loadMap();
            // Insert predefined points / axis
            let gpsType = this.task.getSolutionGpsValue("task");
            if (gpsType != null) {
                let points = [];
                if (gpsType == "centerTwo") {
                    points = [
                        this.task.getSolutionGpsValue("point1"),
                        this.task.getSolutionGpsValue("point2")
                    ];
                }
                if (gpsType == "centerThree") {
                    points = [
                        this.task.getSolutionGpsValue("point1"),
                        this.task.getSolutionGpsValue("point2"),
                        this.task.getSolutionGpsValue("point3")
                    ];
                }
                if (points.length > 0) {
                    this.taskDetailMap.insertPreDefinedPoints(points);
                }
                if (gpsType == "linearFx") {
                    this.taskDetailMap.insertAxis(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"));
                }
            }

            // Init Buttons for positioning markers
            let buttonCount = this.task.getSolutionGpsValue("points");
            if (buttonCount != null) {
                buttonCount = parseInt(buttonCount);
            }
            else {
                buttonCount = 0;
            }
            let startCharCode = "A".charCodeAt(0);
            for (let i = 0; i < buttonCount; i++) {
                this.gpsTaskButtonLabels[i] = String.fromCharCode(startCharCode + i);
            }
        }

        if (this.taskDetails.skipped) {
            this.taskDetails.newTries = 0;
        }
        if(this.task.solutionType == 'range' || this.task.solutionType == 'value'){
            this.subscribeCKEvents();
        }
    }

    async ionViewWillLeave(){
        // Hide keyboard if still visible
        if(CustomKeyBoard.isVisible()){
            CustomKeyBoard.hide();
        }
        if(this.task.solutionType == 'range' || this.task.solutionType == 'value'){
            this.unsubscribeCKEvents();
        }
        if(this.taskDetails.solved || this.taskDetails.solvedLow || this.taskDetails.failed){
            //This guaratees that the state is updated before the map opens and gets the information.
            if (this.navParams.get('goToNextTaskById')) {
                let goToNextTaskById = this.navParams.get('goToNextTaskById');
                goToNextTaskById(this.task.id, false);
            }
        }
    }
    // Show keyboard
    public setKeyboardOn(state) {
        let that = this;
        if (state && this.task.solutionType != "gps") {
            CustomKeyBoard.show(function(){
                // Scroll input field into view (may happen that the field is hidden by keyboard)
                that.content.scrollTo(0, document.getElementById('scroll-anchor').offsetTop);
            });
        }
    }

    public hideKeyboard() {
        if (CustomKeyBoard.isVisible()) {
            CustomKeyBoard.hide();
        }
    }

    public keyboardVisible() {
        return CustomKeyBoard.isVisible();
    }

    /*
    Checks if entered answer is valid decimal number
     */
    isDecimal(s: string): boolean {
        let match = s.match(/^-?(0(([.,])[0-9]+)?|[1-9]{1}[0-9]*(([.,])[0-9]+)?)/g);
        return match !== null ? match[0] === s : false;
    }

    async showHint(index: number) {
        let needUpdate: boolean = false;
        let title = "";
        /*     console.log(" ===============================  ", this.task.getImagesForDownload() );
            console.log(" ===============================  ", this.task.getHint(index) ); */
        let type: string = this.task.getHint(index).type;
        let message: string = this.task.getHint(index).value;
        if (this.shownHints.indexOf(index) == -1) {
            this.shownHints.push(index);
        }

        switch (index) {
            case 1:
                if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                    //only update if task is not solved
                    this.taskDetails.hint1 = true;
                    needUpdate = true;
                }
                title = 'a_btn_hint1';
                if(this.sessionInfo != null){
                    let details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_took_hint1", details, this.task.id.toString());
                }
                break;
            case 2:
                if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                    //only update if task is not solved
                    this.taskDetails.hint2 = true;
                    needUpdate = true;
                }
                title = 'a_btn_hint2';
                if(this.sessionInfo != null){
                    let details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_took_hint2", details, this.task.id.toString());
                }
                break;
            case 3:
                if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                    //only update if task is not solved
                    this.taskDetails.hint3 = true;
                    if(this.sessionInfo != null){
                        let details = JSON.stringify({});
                        this.chatAndSessionService.addUserEvent("event_took_hint3", details, this.task.id.toString());
                    }
                    needUpdate = true;
                }
                title = 'a_btn_hint3';
                break;
        }
        if (needUpdate) {
            this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
        }

        let hintModal = this.modalCtrl.create(MCMIconModal, {
            title: title,
            type: type,
            message: message,
            modalType: MCMModalType.hint,
            buttons: [
                {
                    title: 'a_alert_close',
                    callback: function () {
                        hintModal.dismiss();
                    }
                }
            ]

        }, {showBackdrop: true, enableBackdropDismiss: true});
        hintModal.onDidDismiss(click => {
            if(this.sessionInfo != null){
                let details = JSON.stringify({});
                this.chatAndSessionService.addUserEvent("event_hint_closed", details, this.task.id.toString());
            }
            });
        hintModal.present();
    }

    async checkResult() {
        if ((this.task.solutionType == 'range' || this.task.solutionType == 'value') && !this.isDecimal(this.taskDetails.answer)) {
            return;
        }
        console.log(this.task.solutionType);
        let solution = [this.taskDetails.answer];
        let answer = this.taskDetails.answer.replace(",", ".");
        //details for wrong answer event
        let details = JSON.stringify({solution: solution, solutionType: this.task.solutionType});

        if (this.task.solutionType == "value") {
            if (answer == this.task.getSolution()) {
                this.CalculateScore("value", "solved");
                this.taskSolved('solved', solution, 0);
            } else {
                if(this.sessionInfo != null){
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', solution, 0);
            }
        } else if (this.task.solutionType == "multiple_choice") {
            console.log(this.multipleChoiceList);
            let taskSuccess = true;
            let checkedByUser = this.multipleChoiceList.filter(item => {
                return item.userChecked == true;
            });
            checkedByUser = checkedByUser.map(item => item.value);
            for (let i = 0; i < this.multipleChoiceList.length; i++) {
                let item = this.multipleChoiceList[i];
                console.log(item);
                console.log(item.userChecked != item.rightAnswer);
                if (item.userChecked != item.rightAnswer) {
                    taskSuccess = false;
                    console.log('found wrong answer');
                    break;
                }
            }
            this.taskDetails.answerMultipleChoice = this.multipleChoiceList;
            console.log(taskSuccess);
            let solution = [this.task.getSolution()]
            if (taskSuccess) {
                this.CalculateScore("multiple_choice", "solved");
                this.taskSolved('solved', solution, 0);
            } else {
                if(this.sessionInfo != null){
                    details = JSON.stringify({solution: checkedByUser, solutionType: this.task.solutionType});
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', [''], 0);
            }
        } else if (this.task.solutionType == "range") {
            let solutionList = this.task.getSolutionList();
            let von = solutionList[0];
            let bis = solutionList[1];
            // Do not forget to parse decimal separator as point
            let answer = +this.taskDetails.answer.replace(",", ".");
            let solution = [this.taskDetails.answer];
            if (answer >= von && answer <= bis) {
                this.CalculateScore("range", "solved");
                //DEBUG:LOG PAREI AQUI
                this.taskSolved('solved', solution, 0);
            } else {
                if (solutionList.length == 4) {
                    //oranges intervall (solvedLow)
                    let vonLow = solutionList[2];
                    let bisLow = solutionList[3];
                    let solution = [this.taskDetails.answer];
                    if (answer >= vonLow && answer <= bisLow) {
                        this.CalculateScore("range", "solved_low");
                        this.taskSolved('solved_low', solution, 0);
                    } else {
                        if(this.sessionInfo != null){
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', [''], 0);
                    }
                } else {
                    if(this.sessionInfo != null){
                        this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                    }
                    this.taskSolved('', [''], 0);
                }
            }
        } else if (this.task.solutionType == "gps") {
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

    showSolutionSample() {
        if (!this.taskDetails.solved && !this.taskDetails.solvedLow) {
            this.score.addFailedTask(this.task.id);
            this.taskDetails.score = 0;
            this.taskDetails.failed = true;
            this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
        }
        let solutionSample = this.task.getSolutionSample();
        let solutionSrc = this.task.getSolutionSampleImgSrc();
        let messages = [];
        if (solutionSample.length == 0 && solutionSrc.length == 0) {
            messages = [
                'a_msg_no_solutionsample',
                'p_t_solution',
                this.task.getSolution()
            ]
        } else {
            messages.push(solutionSample);
        }
        let modal = this.modalCtrl.create(MCMIconModal, {
            title: 't_samplesolution',
            imageUrl: this.task.getSolutionSampleImgSrc(),
            messages: messages,
            modalType: MCMModalType.sampleSolution,
            buttons: [
                {
                    title: 'a_alert_close',
                    callback: function () {
                        modal.dismiss();
                    }
                }
            ]
        }, {showBackdrop: true, enableBackdropDismiss: true});
        modal.onDidDismiss(data => {
            if(this.sessionInfo != null){
                let details = JSON.stringify({});
                this.chatAndSessionService.addUserEvent("event_viewed_sample_solution", details, this.task.id.toString());
            }
        });
        modal.present();
    }


    closeDetails(skip?: boolean) {
        //This guaratees that the state is updated before the map opens and gets the information.
        if (this.navParams.get('goToNextTaskById')) {
            let goToNextTaskById = this.navParams.get('goToNextTaskById');
            if (skip) {
                this.taskDetails.skipped = true;
                this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
            }
            goToNextTaskById(this.task.id, skip);
        }
        // necessary because of bug which does not update URL
        this.deepLinker.navChange('back');
        this.navCtrl.pop({}, () => {
        });
    }

    confirmSkippingTask() {
        this.modalsService.showDialog('a_skipTask', 'a_skipTask_confirm',
            'no', () => {
            },
            'yes', async () => {
                if(this.sessionInfo != null){
                    let details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_task_skipped", details, this.task.id.toString());
                }
                this.closeDetails(true);
            });
    }

    getNextAvailableHint() {

        if (this.shownHints.indexOf(1) == -1 && this.task.hasHintMessage(1) || !this.task.hasHintMessage(2)) {
            return 1;
        } else if (this.shownHints.indexOf(2) == -1 && this.task.hasHintMessage(2) || !this.task.hasHintMessage(3)) {
            return 2;
        } else if (this.shownHints.indexOf(3) == -1 && this.task.hasHintMessage(3)) {
            return 3;
        }
        return 4;

    }


    async taskSolved(solved: string, solution: string[], scoreVal: number) {
        let that = this;
        // Add event of user entering trail when session active
        if (solved == 'solved' || solved == 'solved_low') {
            this.taskDetails.skipped = false;
            let message = "";
            let title = "";
            if (this.task.solutionType == "gps") {
            }
            if (solved == 'solved') {
                title = 'a_alert_right_answer_title';
                this.taskDetails.solved = true;
                this.score.addSolvedTask(this.task.id);
                switch (this.taskDetails.tries) {
                    case 0:
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else message = 'a_alert_right_answer_1';
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else message = 'a_alert_right_answer_2';
                        break;
                    case 5:
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else message = 'a_alert_right_answer_3';
                        break;

                }
            }
            if (solved == 'solved_low') {
                title = 'a_alert_right_answer_title_low';
                this.taskDetails.solvedLow = true;
                this.score.addSolvedTaskLow(this.task.id);
                switch (this.taskDetails.tries) {
                    case 0:
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else message = 'a_alert_right_answer_1_low';
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else message = 'a_alert_right_answer_2_low';
                        break;
                    case 5:
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else message = 'a_alert_right_answer_3_low';
                        break;
                }
            }
            let that = this;
            let bSampleSolution = {
                title: 't_samplesolution',
                callback: function () {
                    modal.dismiss().then(() => {
                        that.showSolutionSample();
                    });
                }};
            let bNextTask = {
                title: 'pdf_next_task',
                callback: function () {
                    modal.dismiss().then(() => {
                        that.closeDetails(false);
                    });
                }};
            let modal = this.modalCtrl.create(MCMIconModal, {
                title: title,
                message: message,
                solution: solution,
                modalType: solved == 'solved_low' ? MCMModalType.solvedLow : MCMModalType.solved,
                gamificationEnabled: !this.gamificationIsDisabled,
                score: "+" + this.taskDetails.score,
                buttons: this.route.isSampleSolutionEnabled() ? [bSampleSolution, bNextTask] : [bNextTask]
            }, {showBackdrop: true, enableBackdropDismiss: true});
            modal.onDidDismiss((data) => {
                console.log(data);
                if (data && data.showMap) {
                    /*                 let currentTaskIndex = this.route.tasks.indexOf(this.task); */
                    this.navCtrl.pop();
                }
            });
            modal.present();
            if(this.sessionInfo != null){
                let details = JSON.stringify({score: this.taskDetails.score, solution: solution, quality: solved});
                this.chatAndSessionService.addUserEvent("event_task_completed", details, this.task.id.toString());
            }

            this.taskDetails.timeSolved = new Date().getTime();
        } else {
            let message = "";
            let buttons;
            let tries = this.taskDetails.tries;
            if (this.taskDetails.skipped) {
                tries = this.taskDetails.newTries;
            }

            switch (tries) {
                case 0:
                case 1:
                    if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                    else message = 'a_alert_false_answer_1';
                    buttons = [
                        {
                            title: 'a_alert_close',
                            callback: function () {
                                modal.dismiss();
                            }
                        }
                    ];
                    break;
                case 2:
                case 3:
                case 4:
                    if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                    else message = 'a_alert_false_answer_2';
                    if(!this.route.isHintsEnabled()) message = 'a_alert_false_answer_1';
                    let bShowHint = {
                        title: 'a_t_show_hint',
                        callback: function () {
                        modal.dismiss().then(() => {
                            let index = 1;
                            //number of tries already increased
                            if (tries == 3) {
                                let temp = that.getNextAvailableHint();
                                if (temp < 2) index = temp;
                                else index = 2;
                            } else if (tries == 4) {
                                let temp = that.getNextAvailableHint();
                                if (temp < 3) index = temp;
                                else index = 3;
                            }
                            that.showHint(index);
                            });
                        }};
                    let bClose = {
                        title: 'a_alert_close',
                        callback: function () {
                        modal.dismiss();
                    }};
                    if(this.route.isHintsEnabled()) {
                       buttons = [bShowHint, bClose];
                    }else{
                        buttons = [bClose];
                    }

                    break;
                default:
                    message = 'a_t_skip_msg';
                    let bSampleSolution = {
                        title: 't_samplesolution',
                        callback: function () {
                            modal.dismiss().then(() => {
                                if(that.sessionInfo != null){
                                    let details = JSON.stringify({});
                                    that.chatAndSessionService.addUserEvent("event_task_failed", details, that.task.id.toString());
                                }
                                that.showSolutionSample();
                            });
                        }};
                    let bSkipTask = {
                        title: 'a_skipTask',
                        callback: function () {
                            modal.dismiss().then(() => {
                                if(that.sessionInfo != null){
                                    let details = JSON.stringify({});
                                    that.chatAndSessionService.addUserEvent("event_task_skipped", details, that.task.id.toString());
                                }
                                that.closeDetails(true);
                            });
                        }};
                    if(this.route.isSampleSolutionEnabled()){
                        buttons = [bSampleSolution, bSkipTask];
                    }else{
                        buttons = [bSkipTask];
                    }


                    break;
            }
            this.taskDetails.tries++;
            if (this.taskDetails.skipped) {
                this.taskDetails.newTries++;
            }
            let modal = this.modalCtrl.create(MCMIconModal, {
                message: message,
                solution: solution,
                modalType: MCMModalType.error,
                gamificationEnabled: !this.gamificationIsDisabled,
                score: this.taskDetails.tries > 1 ? '-10' : '0',
                buttons: buttons
            }, {
                showBackdrop: true,
                enableBackdropDismiss: true
            });
            modal.present();
        }
        this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
    }

    CalculateScore(solutionType: string, solved: string) {
        if (solutionType == "value") {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                this.score.score += this.taskDetails.score;
            }
            else {
                this.taskDetails.score = this.maxScore;
                this.score.score += this.taskDetails.score;
            }
        }

        if (solutionType == "multiple_choice") {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                this.score.score += this.taskDetails.score;
            }
            else {
                this.taskDetails.score = this.maxScore;
                this.score.score += this.taskDetails.score;
            }
        }
        if (solutionType == "range") {
            if (solved == "solved") {
                if (this.taskDetails.tries > 0) {
                    let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                    this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                    this.score.score += this.taskDetails.score;
                }
                else {
                    this.taskDetails.score = this.maxScore;
                    this.score.score += this.taskDetails.score;
                }
            }
            else if (solved == "solved_low") {
                let solutionList = this.task.getSolutionList();

                //if the orange interval is below the green
                let dotAnswer = parseFloat(this.taskDetails.answer.replace(",", ".")); // Fix ',' decimals by converting to '.' decimals
                if (dotAnswer < solutionList[0]) {
                    if (this.taskDetails.tries > 0) {
                        let tempScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer) - ((this.taskDetails.tries - 1) * this.penalty);
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        this.score.score += this.taskDetails.score;
                    }
                    else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer);
                        this.score.score += this.taskDetails.score;
                    }
                }
                else {
                    if (this.taskDetails.tries > 0) {
                        let tempScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer) - ((this.taskDetails.tries - 1) * this.penalty);
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        this.score.score += this.taskDetails.score;
                    }
                    else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer);
                        this.score.score += this.taskDetails.score;
                    }
                }
            }
        }
        console.log("FinalScore: " + this.score.score);
    }

    CalculateOrangeScore(borderLeft: number, borderRight: number, value: number): number {
        let intervalLenght = Math.abs(borderRight - borderLeft);
        console.log("borderRight " + borderRight + "  BorderLeft " + borderLeft);
        let xVal = (Math.abs(value - borderLeft) / intervalLenght) * this.maxScore;
        let score = Math.round(xVal);

        if (score < this.minScore) return this.minScore;
        else return score;
    }

    private possibleScore(){
        if(this.taskDetails){
            if(this.taskDetails.tries == 0){
                return this.maxScore;
            }
            else{
                return this.maxScore - (this.taskDetails.tries - 1) * this.penalty > this.minScore ? this.maxScore - (this.taskDetails.tries - 1) * this.penalty : this.minScore;
            }
        }
        else{
            return this.maxScore
        }
    }


//TODO: Confirm if there are information that needs to be stored or displayed (like distance walked).
//      Check if there is the need to put tries on these tasks
    CalculateLine(pointA: L.Marker, pointB: L.Marker, distance: number) {
        let currDistance = (L as any).GeometryUtil.length([pointA.getLatLng(), pointB.getLatLng()]);
        let lenghtSolution = 0;
        let solution = [Math.round(currDistance).toString()];
        let tempGreen = 10;
        let tempOrange = 20;

        if (currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)) {

            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution, 0);
        } else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution, 0);
        } else {
            this.taskSolved('', solution, 0);
        }
    }

    CalculateLineDirection(pointA: L.Marker, pointB: L.Marker, distance: number, angle: number) {
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
        if (currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)) {
            lenghtSolution = 2;
        } else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)) {
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
        if (leftGreen < 0) {
            leftGreen += 360;
            reverse = true;
        }
        if (leftOrange) {
            leftOrange += 360;
            reverse = true;
        }

        if (!reverse) {
            if (currBearing > leftGreen && currBearing < (angle + tempGreen)) bearingSolution = 2;
            else if (currBearing > leftOrange && currBearing < (angle + tempOrange)) bearingSolution = 1;
            else bearingSolution = 0;
        }
        else {
            if (currBearing > leftGreen || currBearing < (angle + tempGreen)) bearingSolution = 2;
            else if (currBearing > leftOrange || currBearing < (angle + tempOrange)) bearingSolution = 1;
            else bearingSolution = 0;
        }

        let solution = [Math.round(currDistance).toString(), Math.round(currBearing - angle).toString()];
        if (bearingSolution == 2 && lenghtSolution == 2) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution, 0);
        }
        else if (bearingSolution > 0 && lenghtSolution > 0) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution, 0);
        } else {
            this.taskSolved('', solution, 0);
        }
    }

    CalculateTriangle(pointA: L.Marker, pointB: L.Marker, pointC: L.Marker, distance: number) {

        let edgesLength = [(L as any).GeometryUtil.length([pointA.getLatLng(), pointB.getLatLng()]),
            (L as any).GeometryUtil.length([pointB.getLatLng(), pointC.getLatLng()]),
            (L as any).GeometryUtil.length([pointC.getLatLng(), pointA.getLatLng()])];

        let tempGreen = 10;
        let tempOrange = 20;

        let allGreen = true;
        let allOrange = true;

        for (var i = 0; i < edgesLength.length; i++) {
            let lenght = edgesLength[i];

            if (lenght > distance - tempGreen && lenght < distance + tempGreen) {
            }
            else if (lenght > distance - tempOrange && lenght < +tempOrange) allGreen = false;
            else {
                allOrange = false;
                allGreen = false;
            }
        }

        let solution = [Math.round(edgesLength[0]).toString(), Math.round(edgesLength[1]).toString(), Math.round(edgesLength[2]).toString()];
        //check conditions
        if (allGreen) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution, 0);
        }
        else if (allOrange) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution, 0);
        }
        else this.taskSolved('', solution, 0);
    }

    CalculateSquare(pointA: L.Marker, pointB: L.Marker, pointC: L.Marker, pointD: L.Marker, distance: number) {
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
        for (var i = 0; i < edgesLength.length; i++) {
            let lenght = edgesLength[i];

            if (lenght > distance - tempGreen && lenght < distance + tempGreen) {
            }
            else if (lenght > distance - tempOrange && lenght < +tempOrange) allGreen = false;
            else {
                allOrange = false;
                allGreen = false;
            }
        }


        //check square diagonals
        if (Math.abs(diag1 - diag2) < tempGreen) diagonalSolution = 2;
        else if (Math.abs(diag1 - diag2) < tempOrange) diagonalSolution = 1;
        else diagonalSolution = 0;

        let solution = [Math.round(edgesLength[0]).toString(), Math.round(edgesLength[1]).toString(),
            Math.round(edgesLength[2]).toString(), Math.round(edgesLength[3]).toString()];
        //check conditions
        if (allGreen && diagonalSolution == 2) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution, 0);
        }
        else if (allOrange && diagonalSolution > 0) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution, 0);
        }
        else this.taskSolved('', solution, 0);
    }

    CalculateCenterTwoP(pointA: L.LatLng, pointB: L.LatLng, currPosition: L.Marker) {
        pointA = L.latLng(pointA[0], pointA[1]);
        pointB = L.latLng(pointB[0], pointB[1]);
        console.log(currPosition.getLatLng());
        let distanceA = (L as any).GeometryUtil.length([pointA, currPosition.getLatLng()]);
        let distanceB = (L as any).GeometryUtil.length([pointB, currPosition.getLatLng()]);
        let delta = Math.abs(distanceA - distanceB);

        let tempGreen = 5;
        let tempOrange = 10;

        let solution = [Math.round(distanceA).toString(), Math.round(distanceB).toString()];
        if (delta < tempGreen) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution, 0);
        }
        else if (delta < tempOrange) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution, 0);
        }
        else this.taskSolved('', solution, 0);
    }


    CalculateCenterThreeP(pointA: L.LatLng, pointB: L.LatLng, pointC: L.LatLng, currPosition: L.Marker) {
        pointA = L.latLng(pointA[0], pointA[1]);
        pointB = L.latLng(pointB[0], pointB[1]);
        pointC = L.latLng(pointC[0], pointC[1]);

        let distanceA = (L as any).GeometryUtil.length([pointA, currPosition.getLatLng()]);
        let distanceB = (L as any).GeometryUtil.length([pointB, currPosition.getLatLng()]);
        let distanceC = (L as any).GeometryUtil.length([pointC, currPosition.getLatLng()]);
        let deltaAB = Math.abs(distanceA - distanceB);
        let deltaBC = Math.abs(distanceB - distanceC);

        let tempGreen = 5;
        let tempOrange = 10;

        let solution = [Math.round(distanceA).toString(), Math.round(distanceB).toString(), Math.round(distanceC).toString()]
        if (deltaAB < tempGreen && deltaBC < tempGreen) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution, 0);
        }
        else if (deltaAB < tempOrange && deltaBC < tempOrange) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution, 0);
        }
        else this.taskSolved('', solution, 0);
    }


    CalculateLinearFx(c0: L.LatLng, c1: L.LatLng, a: L.LatLng, b: L.LatLng, slope: number, yValue: number) {

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

        if (aX > bX) {
            let helperPoint = a;
            a = b;
            b = helperPoint;
        }

        let aY = this.getDistanceToLine(a, c0, c1);
        let bY = this.getDistanceToLine(b, c0, c1);

        let deltaY = bY - aY;

        let deltaX = bX - aX;

        let m = deltaY / deltaX;

        let yInMeters = aY - m * aX;

        //Verification
        let tempMGreen = 5;
        let tempMOrange = 10;
        let tempYGreen = 5;
        let tempYOrange = 10;
        let solutionSlope = 0;
        let solutionY = 0;

        let solution = [Math.round(m).toString(), Math.round(yValue).toString()];
        let solutionFail = [m.toFixed(2).toString(), Math.round(yInMeters).toString()];

        if (m > slope - tempMGreen && m < slope + tempMGreen) solutionSlope = 2;
        else if (m > slope - tempMOrange && m < slope + tempMOrange) solutionSlope = 1;

        if (yInMeters > yValue - tempYGreen && yInMeters < yValue + tempYGreen) solutionY = 2;
        else if (yInMeters > yValue - tempYOrange && yInMeters < yValue + tempYOrange) solutionY = 1;

        if (solutionSlope == 2 && solutionY == 2) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution, 0);
        }
        else if (solutionSlope > 0 && solutionY > 0) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution, 0);
        }
        else this.taskSolved('', solutionFail, 0);
    }

    //Possibly add this to the MyMath class
    getDistanceToLine(p: L.LatLng, start: L.LatLng, final: L.LatLng): number {
        let map = this.taskDetailMap.getMap();
        if (map != null) {
            let closestOnLine = (L as any).GeometryUtil.closestOnSegment(map, p, start, final);
            return (L as any).GeometryUtil.length([p, closestOnLine]);
        }
        else {
            return 0;
        }
    }

    setFabColor(index) {
        return 'fab-color-' + (index + 1);
    }

    getIonContentStyles() {
        if (this.task && this.task.solutionType != 'gps') {
            let result = this.task.getImageURL();
            let conditionalBackgroundImageStyles = {'background-image': 'url(" ' + result + ' ")'};
            return conditionalBackgroundImageStyles;
        } else return;
    }

    SetMessage(type: string) {
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
