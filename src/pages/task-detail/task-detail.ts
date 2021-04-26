import {ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Content, DeepLinker, IonicPage, NavController, NavParams} from 'ionic-angular';

import {OrmService} from '../../services/orm-service';
import {Route} from '../../entity/Route';
import {Task} from '../../entity/Task';
import {ModalController} from 'ionic-angular/components/modal/modal-controller';
import {MCMIconModal} from '../../modals/MCMIconModal/MCMIconModal';
import {MCMModalType, MyApp} from '../../app/app.component';
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
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Helper} from "../../classes/Helper";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";
import {ImagesService} from "../../services/images-service";
import * as Levenstein from 'js-levenshtein';
import {root} from "rxjs/util/root";
import {Util} from "leaflet";
import trim = Util.trim;

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

    @ViewChildren('multipleChoiceAnswers') multipleChoiceView: QueryList<any>


    // Keyboard open
    //private keyboardOpen;
    private route: Route;
    private routeId: number;
    private taskId: number;
    private task: Task;
    private solvedSubtasks = [];
    private activeAccordions = [];
    private taskDetails: TaskState;
    private subTaskIndex: number;
    private subTaskScore: number = 0;
    private lastSubtaskBonus: number = 0;
    private rootTask: Task;
    private score: Score;
    private gamificationIsDisabled = false;

    private minScore: number;
    private penalty: number;
    private maxScore: number;
    private orangeScore: number;
    private isSpecialTaskType: boolean;
    private specialSolution: any;
    private answerIndex: any = null;
    private blankRegex = /\*\*([^*]+)\*\*/g;

    private multipleChoiceList: Array<any> = [];

    private sessionInfo: SessionInfo;

    // For GPS - tasks
    private taskDetailMap: TaskDetailMap;
    private gpsTaskButtonLabels: Array<string> = [];
    shownHints: number[] = [];
    private subTasksRequired;
    private subTaskModalShown = false;

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
        private app: MyApp,
        private photoViewer: PhotoViewer,
        private spinnerDialog: SpinnerDialog,
        private imageService: ImagesService,
        private cdRef: ChangeDetectorRef
    ) {
    }

    /*
      Custom Keyboard subscribe
    */
    subscribeCKEvents(){
        // Initialize a new Keyboard subscription in case the old one was unsubscribed
        this.keyboardSubscriptions = new Subscription();

        // Subscribe to the click event observable
        // Here we add the clicked key value to the string
        this.keyboardSubscriptions.add(
            CustomKeyBoard.onCKClick.subscribe((key) => {
                    if((this.taskDetails.timeSolved == 0 && !this.taskDetails.failed) || !this.route.isAnswerFeedbackEnabled()){
                        if (key === "C") {
                            if (this.answerIndex != null) {
                                this.taskDetails.answerMultipleChoice[this.answerIndex].answer = "";
                            } else {
                                this.taskDetails.answer = "";
                            }
                        }
                        else if (key === "✔") { // ✔
                            this.checkResult();
                        }
                        else {
                            if (this.answerIndex != null) {
                                this.taskDetails.answerMultipleChoice[this.answerIndex].answer += key;
                            } else {
                                this.taskDetails.answer += key;
                            }
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
                    if (this.answerIndex != null) {
                        this.taskDetails.answerMultipleChoice[this.answerIndex].answer = this.taskDetails.answerMultipleChoice[this.answerIndex].answer.slice(0, this.taskDetails.answerMultipleChoice[this.answerIndex].answer.length - 1);
                    } else {
                        this.taskDetails.answer = this.taskDetails.answer.slice(0, this.taskDetails.answer.length - 1);
                    }
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

    async ionViewDidEnter() {
        console.log('TasksMap ionViewDidEnter()');

        eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
    }

    async ionViewWillEnter() {
        console.log('TasksMap ionViewWillEnter()');
        this.routeId = this.navParams.get('routeId');
        this.route = await this.ormService.findRouteById(this.routeId);
        this.taskId = this.navParams.get('taskId');
        this.subTaskIndex = this.navParams.get('subTaskIndex');
        this.task = await this.ormService.findTaskById(this.taskId);
        if (this.subTaskIndex || this.subTaskIndex === 0) {
            this.rootTask = this.task;
            this.task = this.rootTask.getSubtasksInOrder()[this.subTaskIndex]
        }
        this.subTasksRequired = this.route.isSubtaskRequired();
        console.log("Opened Task: ", this.task);
        this.isSpecialTaskType = (this.task.solutionType === 'multiple_choice' || this.task.solutionType === 'gps' || this.task.solutionType === 'vector_values' || this.task.solutionType === 'vector_intervals' || this.task.solutionType === 'set' || this.task.solutionType === 'blanks');
        this.score = this.route.getScoreForUser(await this.ormService.getActiveUser());
        this.taskDetails = this.score.getTaskStateForTask(this.task.id);
        if (this.task.subtasks && this.task.subtasks.length > 0) {
            this.solvedSubtasks = [];
            for (let task of this.task.getSubtasksInOrder()) {
                let subtaskDetails = this.score.getTaskStateForTask(task.id);
                if (subtaskDetails.solved || subtaskDetails.failed || subtaskDetails.solvedLow || subtaskDetails.saved || subtaskDetails.skipped) {
                    this.solvedSubtasks.push(subtaskDetails);
                }
            }
            if (this.subTasksRequired && !this.subTaskModalShown && this.solvedSubtasks.length !== this.task.subtasks.length) {
                let subtaskModal = this.modalCtrl.create(MCMIconModal, {
                    type: 'text',
                    message: this.solvedSubtasks.length == 0 ? 'a_subtaskinfo_required_message' : 'a_subtaskinfo_required_progress_message',
                    modalType: MCMModalType.subtask,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: [
                        {
                            title: 'a_subtaskinfo_required_letsgo',
                            callback: function () {
                                subtaskModal.dismiss();
                            }
                        }
                    ]

                }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});

                subtaskModal.present();
                this.subTaskModalShown = true;
            } else if (this.taskDetails.timeFirstOpen === 0) {
                let subtaskModal = this.modalCtrl.create(MCMIconModal, {
                    title: 'a_subtaskinfo_title',
                    type: 'text',
                    message: 'a_subtaskinfo_message',
                    modalType: MCMModalType.subtask,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: [
                        {
                            title: 'a_alert_close',
                            callback: function () {
                                subtaskModal.dismiss();
                            }
                        }
                    ]

                }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});

                subtaskModal.present();
            }
            //Force template to reload so blankContainer exists when it should.
            this.cdRef.detectChanges();
        }
        if (this.task.solutionType === 'blanks') {
            this.specialSolution = this.task.getSolution();
            let blankMatch;
            let blankText: string = this.specialSolution.val
            let placeholderCount = [];
            while ((blankMatch = this.blankRegex.exec(blankText)) !== null) {
                let savedAnswer = this.taskDetails.answerMultipleChoice && this.taskDetails.answerMultipleChoice.length > 0 ? this.taskDetails.answerMultipleChoice.find(answer => {return answer.id === blankMatch[1] && answer.count == (placeholderCount[blankMatch[1]] ? placeholderCount[blankMatch[1]] : 0)}) : null;
                blankText = blankText.replace(blankMatch[0], `<span id="${blankMatch[1]}" data-count="${(placeholderCount[blankMatch[1]] ? placeholderCount[blankMatch[1]] : '0')}" class="blankInput ${(savedAnswer && savedAnswer.solved || (this.taskDetails && (this.taskDetails.solved || this.taskDetails.solvedLow || this.taskDetails.failed))) ? "disabled" : ""}" role="textbox" contenteditable>${savedAnswer ? savedAnswer.answer : ""}</span>`);
                if (!placeholderCount[blankMatch[1]]) {
                    placeholderCount[blankMatch[1]] = 1;
                } else {
                    placeholderCount[blankMatch[1]]++
                }
            }
            let blankContainer = document.getElementById('blankContainer_' + this.task.id);
            if (blankContainer) {
                blankContainer.innerHTML = blankText;
                let inputs = blankContainer.getElementsByClassName('blankInput');
                if (!this.taskDetails.answerMultipleChoice || this.taskDetails.answerMultipleChoice.length == 0) {
                    let answers = [];
                    for (let input of Array.from(inputs)) {
                        if (input instanceof HTMLElement) {
                            answers.push({id: input.id, answer: "", solved: null, count: input.dataset.count})
                        }
                    }
                    this.taskDetails.answerMultipleChoice = answers;
                }
                for (let input of Array.from(inputs)) {
                    input.addEventListener('input', (event: any) => {
                            let answerElement = this.taskDetails.answerMultipleChoice.find((answer) => {
                                if (input instanceof HTMLElement) {
                                    return answer.id === input.id && answer.count == input.dataset.count
                                }
                            });
                            answerElement.answer = event.currentTarget.innerText;
                        });
                }
            }
        }
        if (this.task.solutionType === 'vector_values' || this.task.solutionType === 'vector_intervals') {
            this.specialSolution = this.task.getSolution();
            if (!this.taskDetails.answerMultipleChoice || this.taskDetails.answerMultipleChoice.length == 0) {
                let answerArray = [];
                for (let i = 0; i < this.specialSolution.components.length; i++) {
                    let component = this.specialSolution.components[i];
                    answerArray.push({name: component.name, answer: '', solved: null});
                }
                this.taskDetails.answerMultipleChoice = answerArray;
            }
        } else if (this.task.solutionType === 'set') {
            this.specialSolution = this.task.getSolution();
            if (!this.taskDetails.answerMultipleChoice || this.taskDetails.answerMultipleChoice.length == 0) {
                let answerArray = [];
                for (let i = 0; i < this.specialSolution.length; i++) {
                    answerArray.push({answer: '', solved: null});
                }
                this.taskDetails.answerMultipleChoice = answerArray;
            }
        }
        this.sessionInfo = await this.chatAndSessionService.getActiveSession();
        // Add event of user entering trail when session active
        if(this.sessionInfo != null && !this.task){
            let details = JSON.stringify({title: this.task.title});
            this.chatAndSessionService.addUserEvent("event_task_opened", details, this.task.id.toString());
        }

        if(this.taskDetails.timeSolved == 0 && !this.taskDetails.failed){
            // Do not display last entered answer
            this.taskDetails.answer = "";
        }

        this.gamificationIsDisabled = this.route.isGamificationDisabled();

        //Temporary attribution of the scores, later they should come from the server, associated with each task
        if (!this.rootTask && this.route.isAnswerFeedbackEnabled() && this.task.solutionType != 'info') {
            // Logic used to get different max scores for different task formats which has been sospended for now
            // if (this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') {
            //     this.maxScore = 40 * this.specialSolution.components.length;
            //     if (this.maxScore > 200) {
            //         this.maxScore = 200;
            //     }
            // } else if (this.task.solutionType == 'set') {
            //     this.maxScore = 40 * this.specialSolution.length;
            //     if (this.maxScore > 200) {
            //         this.maxScore = 200;
            //     }
            // } else if (this.task.solutionType == 'blanks') {
            //     let scorePerQuestion = this.specialSolution.settings.check_type === 'strict' ? 40 : (this.specialSolution.settings.check_type === 'normal' ? 30 : 20);
            //     let amountOfQuestions = this.specialSolution.features.length;
            //     this.maxScore = scorePerQuestion * amountOfQuestions;
            //     if (this.maxScore > 200) {
            //         this.maxScore = 200;
            //     }
            // } else {
            //     this.maxScore = 100;
            // }
            this.maxScore = 100;
            this.orangeScore = this.maxScore / 2;
            this.penalty = Math.floor(this.maxScore) * 0.15;
            this.minScore = Math.floor(this.maxScore) / 10;
        } else {
            this.maxScore = 0;
            this.orangeScore = 0;
            this.penalty = 0;
            this.minScore = 0;
        }

        if (this.task.subtasks && this.subTasksRequired) {
            let scorableTaskCount = this.task.solutionType === 'info' ? 0 : 1;
            for (let task of this.task.subtasks) {
                if (task.solutionType != 'info') {
                    scorableTaskCount++;
                }
            }
            this.subTaskScore = Math.floor(100 / scorableTaskCount);
            if (this.task.solutionType === 'info') {
                this.maxScore = 0;
                if ((this.maxScore - this.subTaskScore * scorableTaskCount) > 0) {
                    this.lastSubtaskBonus = (this.maxScore - this.subTaskScore * scorableTaskCount);
                }
            } else {
                this.maxScore = this.subTaskScore + (this.maxScore - this.subTaskScore * scorableTaskCount);
            }
            this.penalty = Math.floor(this.maxScore) * 0.15;
            this.minScore = Math.floor(this.maxScore ) / 10;
        }

        if (this.rootTask && this.subTasksRequired && this.task.solutionType !== 'info') {
            let scorableTaskCount = this.rootTask.solutionType === 'info' ? 0 : 1;
            for (let task of this.rootTask.subtasks) {
                if (task.solutionType != 'info') {
                    scorableTaskCount++;
                }
            }
            this.subTaskScore = Math.floor(100 / scorableTaskCount);
            if (this.task.solutionType === 'info') {
                this.maxScore = 0;
            } else {
                if (this.rootTask.solutionType === 'info') {
                    if ((100 - this.subTaskScore * scorableTaskCount) > 0) {
                        this.lastSubtaskBonus = (100 - this.subTaskScore * scorableTaskCount);
                    }
                }
                this.maxScore = this.subTaskScore + (this.subTaskIndex === this.rootTask.subtasks.length - 1 ? this.lastSubtaskBonus : 0);
            }
            this.orangeScore = this.maxScore / 2;
            this.penalty = Math.floor(this.maxScore) * 0.15;
            this.minScore = Math.floor(this.maxScore ) / 10;
        }

        if (this.score.score == null) this.score.score = 0;

        if (this.taskDetails.timeFirstOpen == 0) {
            this.taskDetails.timeFirstOpen = new Date().getTime();
            this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
        }
        if (this.task.solutionType == 'multiple_choice') {
            this.multipleChoiceView.changes.subscribe(data => {
                console.log("MultipleChoiceChildData", data);
                eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
            })
            if (this.taskDetails.solved || this.taskDetails.solvedLow) {
                this.multipleChoiceList = this.taskDetails.answerMultipleChoice;
            } else {
                this.multipleChoiceList = this.task.getSolutionOptionList();
            }
        }
        // Init task detail map, if task is gps task
        if (this.task.solutionType == "gps") {
            this.taskDetailMap = new TaskDetailMap(this.task, this.route, this.gpsService, this.app, this.ormService, this.imageService);
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
        if(this.task.solutionType == 'range' || this.task.solutionType == 'value' || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals' ||this.task.solutionType === 'set'){
            this.subscribeCKEvents();
        }
        eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
    }

    async ionViewWillLeave(){
        // Hide keyboard if still visible
        if(CustomKeyBoard.isVisible()){
            CustomKeyBoard.hide();
        }
        if(this.task.solutionType == 'range' || this.task.solutionType == 'value' || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals' ||this.task.solutionType === 'set'){
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
    public setKeyboardOn(state, answerIndex = null) {
        let that = this;
        this.answerIndex = answerIndex;
        if (state && this.task.solutionType != "gps") {
            CustomKeyBoard.show(function(){
                // Scroll input field into view (may happen that the field is hidden by keyboard)
                if (!that.rootTask) {
                    that.content.scrollTo(0, document.getElementById('keyboard-anchor').offsetTop);
                } else {
                    that.content.scrollTo(0, document.getElementById('snd-keyboard-anchor').offsetTop);
                }
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
            narrativeEnabled: this.route.isNarrativeEnabled(),
            narrative: this.app.activeNarrative,
            buttons: [
                {
                    title: 'a_alert_close',
                    callback: function () {
                        hintModal.dismiss();
                    }
                }
            ]

        }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
        hintModal.onDidDismiss(click => {
            if(this.sessionInfo != null){
                let details = JSON.stringify({});
                this.chatAndSessionService.addUserEvent("event_hint_closed", details, this.task.id.toString());
            }
            });
        hintModal.present();
    }

    async checkResult() {
        if ((this.task.solutionType == 'range' || this.task.solutionType == 'value') && !this.isDecimal(this.taskDetails.answer) || !this.isSpecialTypeAnswered()) {
            return;
        }
        console.log(this.task.solutionType);
        let solution = [this.taskDetails.answer];
        let answer = this.taskDetails.answer.replace(",", ".");
        //details for wrong answer event
        let details = JSON.stringify({solution: solution, solutionType: this.task.solutionType});

        if (this.task.solutionType == "value") {
            let f_answer = parseFloat(answer);
            let f_solution  = parseFloat(this.task.getSolution());
            if (f_answer.toString() == f_solution.toString()) {
                this.CalculateScore("value", "solved");
                this.taskSolved('solved', solution);
            } else {
                if(this.sessionInfo != null){
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', solution);
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
                this.taskSolved('solved', solution);
            } else {
                if(this.sessionInfo != null){
                    details = JSON.stringify({solution: checkedByUser, solutionType: this.task.solutionType});
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', ['']);
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
                this.taskSolved('solved', solution);
            } else {
                if (solutionList.length == 4) {
                    //oranges intervall (solvedLow)
                    let vonLow = solutionList[2];
                    let bisLow = solutionList[3];
                    let solution = [this.taskDetails.answer];
                    if (answer >= vonLow && answer <= bisLow) {
                        this.CalculateScore("range", "solved_low");
                        this.taskSolved('solved_low', solution);
                    } else {
                        if(this.sessionInfo != null){
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', ['']);
                    }
                } else {
                    if(this.sessionInfo != null){
                        this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                    }
                    this.taskSolved('', ['']);
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
        } else if (this.task.solutionType == "vector_values") {
            let answers = this.taskDetails.answerMultipleChoice;
            let solutions = this.specialSolution.components;
            let solvedTask = true;
            let detailSolutions = [];
            let solutionText = "<table class='solutionTable'>";
            for (let i = 0; i < answers.length; i++) {
                let answer = answers[i];
                let checkAnswer = parseFloat(answer.answer.replace(",", "."));
                let solution = solutions[i];
                detailSolutions.push({name: solution.name, answer: answer.answer});
                answer.solved = checkAnswer > +solution.val - 0.0001 && checkAnswer < +solution.val + 0.0001;
                if (!answer.solved) {
                    solvedTask = false;
                }
                solutionText += `<tr><td>${answer.name}:</td> <td class="${answer.solved ? 'correct' : 'false'}">${answer.answer}</td></tr>`;
            }
            solutionText += "</table>"
            if (solvedTask) {
                this.CalculateScore("vector_values", "solved");
                this.taskSolved('solved',[solutionText]);
            } else {
                if(this.sessionInfo != null){
                    details = JSON.stringify({solution: detailSolutions, solutionType: this.task.solutionType});
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', [solutionText]);
            }
        } else if (this.task.solutionType == "vector_intervals") {
            let answers = this.taskDetails.answerMultipleChoice;
            let solutions = this.specialSolution.components;
            let solvedTask = true;
            let detailSolutions = [];
            let solutionText = "<table class='solutionTable'>";
            for (let i = 0; i < answers.length; i++) {
                let answer = answers[i];
                let checkAnswer = parseFloat(answer.answer.replace(",", "."));
                let solution = solutions[i];
                detailSolutions.push({name: solution.name, answer: answer.answer});
                answer.solved = checkAnswer >= +solution.low && checkAnswer <= +solution.high;
                if (!answer.solved) {
                    solvedTask = false;
                }
                solutionText += `<tr><td>${answer.name}:</td> <td class="${answer.solved ? 'correct' : 'false'}">${answer.answer}</td></tr>`;
            }
            solutionText += "</table>"
            if (solvedTask) {
                this.CalculateScore("vector_intervals", "solved");
                this.taskSolved('solved',[solutionText]);
            } else {
                if(this.sessionInfo != null){
                    details = JSON.stringify({solution: detailSolutions, solutionType: this.task.solutionType});
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', [solutionText]);
            }
        } else if (this.task.solutionType === "set") {
            let answers = [];
            for (let index in this.taskDetails.answerMultipleChoice) {
                let answer = {answer: this.taskDetails.answerMultipleChoice[index].answer, originalIndex: index};
                answers.push(answer);
            }
            answers.sort((a, b) => {
                    if (parseFloat(a.answer) > parseFloat(b.answer)) {
                        return 1;
                    } else if (parseFloat(a.answer) === parseFloat(b.answer)) {
                        return 0;
                    } else {
                        return -1;
                    }
            });
            let solutions = this.specialSolution.sort((a, b) => {
                if (parseFloat(a) > parseFloat(b)) {return 1;}
                else if (parseFloat(a) === parseFloat(b)) {return 0;}
                else {return -1;}
            });
            let solvedTask = true;
            let detailSolutions = [];
            let solutionText = "<table class='solutionTable'>";
            for (let i = 0; i < answers.length; i++) {
                let answer = answers[i];
                let checkAnswer = parseFloat(answer.answer.replace(",", "."));
                let originalAnswer = this.taskDetails.answerMultipleChoice[answer.originalIndex];
                for (let solution of solutions) {
                    if (checkAnswer > +solution - 0.0001 && checkAnswer < +solution + 0.0001) {
                        originalAnswer.solved = true;
                        break;
                    } else {
                        originalAnswer.solved = false;
                    }
                }
                detailSolutions.push(answer.answer);
                if (!originalAnswer.solved) {
                    solvedTask = false;
                }
                solutionText += `<tr><td class="${originalAnswer.solved ? 'correct' : 'false'}">${answer.answer}</td></tr>`;
            }
            solutionText += "</table>"
            if (solvedTask) {
                this.CalculateScore("set", "solved");
                this.taskSolved('solved',[solutionText]);
            } else {
                if(this.sessionInfo != null){
                    details = JSON.stringify({solution: detailSolutions, solutionType: this.task.solutionType});
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', [solutionText]);
            }
        } else if (this.task.solutionType === "blanks") {
            let solutions = this.specialSolution.features;
            let precision = this.specialSolution.settings.check_type === 'strict' ? 0 : (this.specialSolution.settings.check_type === 'normal' ? 0.2 : 0.4);
            let solvedTask = true;
            let detailSolutions = [];
            let blankText: string = this.specialSolution.val;
            for (let answer of this.taskDetails.answerMultipleChoice) {
                let solutionObject = solutions.find(sol => {
                    return sol.blank === '**' + answer.id + '**';
                })
                let answerPrecision = 1;
                for (let solution of solutionObject.answers) {
                    answer.answer = trim(answer.answer);
                    let absoluteDistance = Levenstein(solution.toLowerCase(), answer.answer.toLowerCase());
                    let relativeDistance = absoluteDistance / solution.length;
                    if (relativeDistance < answerPrecision) {
                        answerPrecision = relativeDistance;
                    }
                }
                answer.solved = answerPrecision <= precision;
                if (!answer.solved) {
                    solvedTask = false;
                } else {
                    let htmlElement = document.getElementById(answer.id);
                    htmlElement.classList.add('disabled');
                }
                let regex = new RegExp('\\*\\*' + answer.id.replace(/\//g, '\\/') + '\\*\\*');
                let blankMatch = regex.exec(blankText);
                blankText = blankText.replace(blankMatch[0], `<span class="blank ${answer.solved ? 'correct' : 'false'}">${answer.answer}</span>`);
                detailSolutions.push(answer.answer);

            }
            if (solvedTask) {
                this.CalculateScore("blanks", "solved");
                this.taskSolved('solved',[blankText]);
            } else {
                if(this.sessionInfo != null){
                    details = JSON.stringify({solution: detailSolutions, solutionType: this.task.solutionType});
                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                }
                this.taskSolved('', [blankText]);
            }
        }
    }

    /*
    This function is called when in trail settings the automatic validation of answers is disabled
    It allows users to complete a task, when they think that they are finished and mark it accordingly so
    In session mode where the users are force assigned a task, it allows to continue with the next task
     */
    async completeTask(){
        if (this.task.solutionType === 'info' && this.task.subtasks && this.task.subtasks.length > 0) {
            this.CalculateScore('info', 'solved')
        } else {
            this.taskDetails.score = this.maxScore;
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
        }
        this.taskSolved("solved", [""]);
    }

    showSolutionSample(nextSubtaskOnClose = false) {
        if (!this.taskDetails.solved && !this.taskDetails.solvedLow) {
            if (!this.rootTask) {
                this.score.addFailedTask(this.task.id);
            }
            this.taskDetails.score = 0;
            this.taskDetails.failed = true;
            this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
        }
        let solutionSample = this.task.getSolutionSample();
        let solutionSrc = this.task.getSolutionSampleImgSrc();
        let messages = [];
        if ((!solutionSample  || solutionSample.length == 0) && (!solutionSrc || solutionSrc.length == 0)) {
            messages = [
                'a_msg_no_solutionsample',
                'p_t_solution',
                this.task.getSolution()
            ]
        } else {
            messages.push(solutionSample);
        }
        let that = this;
        let modal = this.modalCtrl.create(MCMIconModal, {
            title: 't_samplesolution',
            imageUrl: this.task.getSolutionSampleImgSrc(),
            messages: messages,
            modalType: MCMModalType.sampleSolution,
            narrativeEnabled: this.route.isNarrativeEnabled(),
            narrative: this.app.activeNarrative,
            buttons: [
                {
                    title: 'a_alert_close',
                    callback: function () {
                        modal.dismiss();
                        if (that.rootTask && nextSubtaskOnClose) {
                            that.goToNextSubtask();
                        }
                    }
                }
            ]
        }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
        modal.onDidDismiss(data => {
            if(this.sessionInfo != null){
                let details = JSON.stringify({});
                this.chatAndSessionService.addUserEvent("event_viewed_sample_solution", details, this.task.id.toString());
            }
        });
        modal.present();
    }


    async closeDetails(skip?: boolean, ) {
        if (this.rootTask) {
            if (skip) {
                this.taskDetails.skipped = true;
                await this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
                return this.goToNextSubtask();
            }
        }
        //This guaratees that the state is updated before the map opens and gets the information.
        if (this.navParams.get('goToNextTaskById')) {
            let goToNextTaskById = this.navParams.get('goToNextTaskById');
            if (skip) {
                this.taskDetails.skipped = true;
                await this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
            }
            goToNextTaskById(this.task.id, skip);
        }
        // necessary because of bug which does not update URL
        this.deepLinker.navChange('back');
        this.navCtrl.pop({}, () => {
        });
    }

    confirmSkippingTask() {
        let skipText = 'a_skipTask_confirm';
        if (this.route.isNarrativeEnabled()) {
            skipText = this.route.getNarrativeString(skipText);
        }
        this.modalsService.showDialog('a_skipTask', skipText,
            'no', () => {
            },
            'yes', async () => {
                if(this.sessionInfo != null){
                    let details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_task_skipped", details, this.task.id.toString());
                }
                this.closeDetails(true);
            }, this.app.activeNarrative);
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


    async taskSolved(solved: string, solution: string[]) {
        let that = this;
        // Add event of user entering trail when session active
        if (!this.route.isAnswerFeedbackEnabled()) {
            this.taskDetails.saved = true;
            if (!this.rootTask) {
                this.score.addSavedTask(this.task.id);
            }
        }
        if (solved == 'solved' || solved == 'solved_low') {
            this.taskDetails.skipped = false;
            let message = "";
            let title = "";
            if (solved == 'solved') {
                title = 'a_alert_right_answer_title';
                this.taskDetails.solved = true;
                if (!this.rootTask) {
                    this.score.addSolvedTask(this.task.id);
                }
                if (this.rootTask && !this.subTasksRequired) {
                    if (this.taskDetails.tries == 0) {
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else if (this.task.solutionType == "info") message = "a_info_task_finished_message";
                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_1';
                        else message = 'a_alert_subtask_right_answer_flawless';
                    } else {
                        message = 'a_alert_subtask_right_answer';
                    }
                } else {
                    switch (this.taskDetails.tries) {
                        case 0:
                            if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else if (this.task.solutionType == "info") message = "a_info_task_finished_message";
                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_1';
                            else message = 'a_alert_right_answer_1';
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else if (this.task.solutionType == "info") message = "";
                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_2';
                            else message = 'a_alert_right_answer_2';
                            break;
                        case 5:
                            if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else if (this.task.solutionType == "info") message = "";
                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_3';
                            else message = 'a_alert_right_answer_3';
                            break;

                    }
                }
            }
            if (solved == 'solved_low') {
                title = 'a_alert_right_answer_title_low';
                this.taskDetails.solvedLow = true;
                if (!this.rootTask) {
                    this.score.addSolvedTaskLow(this.task.id);
                }
                if (this.rootTask && !this.subTasksRequired) {
                    if (this.taskDetails.tries == 0) {
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_1_low';
                        else message = 'a_alert_right_answer_1_low';
                    } else {
                        message = 'a_alert_subtask_right_answer_low';
                    }
                } else {
                    switch (this.taskDetails.tries) {
                        case 0:
                            if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_1_low';
                            else message = 'a_alert_right_answer_1_low';
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_2_low';
                            else message = 'a_alert_right_answer_2_low';
                            break;
                        case 5:
                            if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_right_answer_3_low';
                            else message = 'a_alert_right_answer_3_low';
                            break;
                    }
                }
            }
            let that = this;
            let bSampleSolution = {
                title: 't_samplesolution',
                callback: function () {
                    modal.dismiss().then(() => {
                        that.showSolutionSample(true);
                    });
                }};
            let subTaskOkay = {
                title: 'okay',
                callback: function () {
                    modal.dismiss().then(() => {
                        that.goToNextSubtask();
                    });
                }
            }
            let bNextTask = {
                title: 'pdf_next_task',
                callback: function () {
                    modal.dismiss().then(() => {
                        that.closeDetails(false);
                    });
                }};
            if (this.route.isNarrativeEnabled()) {
                title = this.route.getNarrativeString(title);
                message = this.route.getNarrativeString(message);
            }
            let modal;
                if (this.route.isAnswerFeedbackEnabled()) {
                    let data = {
                        title: this.task.solutionType === 'info' ? 'hide' : title,
                        message: message,
                        solution: this.task.solutionType === 'info' ? undefined : solution,
                        modalType: solved == 'solved_low' ? MCMModalType.solvedLow : MCMModalType.solved,
                        gamificationEnabled: !this.gamificationIsDisabled,
                        narrativeEnabled: this.route.isNarrativeEnabled(),
                        narrative: this.app.activeNarrative,
                        param: {tries: this.taskDetails.tries+1},
                        buttons: this.rootTask ? [subTaskOkay] : (this.route.isSampleSolutionEnabled() && this.task.solutionType !== 'info' ? [bSampleSolution, bNextTask] : [bNextTask])
                    };
                    if ((this.task.solutionType !== 'info' && ( !this.task.subtasks || !(this.task.subtasks.length > 0))) && (!this.rootTask || (this.rootTask && this.subTasksRequired))) {
                        data['score'] = '+' + this.taskDetails.score + 'MP/' + this.bestPossibleScore() + 'MP<span class="subscore">' + this.generateSubtaskScoreCalculationString(solved) + '</span>';
                    }
                    console.log(data);
                    modal = this.modalCtrl.create(MCMIconModal, data, {
                        showBackdrop: true,
                        enableBackdropDismiss: true,
                        cssClass: this.app.activeNarrative
                    });
                } else {
                    modal = this.modalCtrl.create(MCMIconModal, {
                        title: 'a_alert_saved_answer_title',
                        message: 'a_alert_saved_answer_message',
                        modalType: MCMModalType.saved,
                        gamificationEnabled: !this.gamificationIsDisabled,
                        narrativeEnabled: this.route.isNarrativeEnabled(),
                        narrative: this.app.activeNarrative,
                        buttons: this.rootTask ? [subTaskOkay] : [bNextTask],
                    }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
                }
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
                    if (!(this.task.solutionType === 'multiple_choice' && this.multipleChoiceList.length - 2 === tries)) {
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else if (this.task.solutionType == "blanks") message = 'a_alert_blanks_false_answer_1';
                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_false_answer_1';
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
                    }
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    if (!(this.task.solutionType === 'multiple_choice' && this.multipleChoiceList.length - 2 === tries)) {
                        if (this.task.solutionType == "gps") message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                        else if (this.task.solutionType == "blanks") message = 'a_alert_blanks_false_answer_2';
                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_false_answer_2';
                        else message = 'a_alert_false_answer_2';
                        if (!this.route.isHintsEnabled() || this.rootTask) {
                            if (this.task.solutionType == "blanks") message = 'a_alert_blanks_false_answer_1';
                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') message = 'a_alert_set_false_answer_1';
                            else message = 'a_alert_false_answer_1';
                        }
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
                            }
                        };
                        let thiss = this;
                        let bShowSubtask = {
                            title: 'a_t_show_subtask',
                            callback: function () {
                                modal.dismiss().then(() => {
                                    thiss.openSubtask()
                                })
                            }
                        }
                        let bClose = {
                            title: 'a_alert_close',
                            callback: function () {
                                modal.dismiss();
                            }
                        };
                        if (this.route.isHintsEnabled() && (this.task.subtasks && this.task.subtasks.length > 0 && this.task.subtasks.length !== this.solvedSubtasks.length)) {
                            buttons = [bShowSubtask, bShowHint, bClose];
                        } else if (this.route.isHintsEnabled() && !this.rootTask) {
                            buttons = [bShowHint, bClose];
                        } else if ((this.task.subtasks && this.task.subtasks.length > 0 && this.task.subtasks.length !== this.solvedSubtasks.length)) {
                            buttons = [bShowSubtask, bClose];
                        } else {
                            buttons = [bClose];
                        }

                        break;
                    }
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
                                that.showSolutionSample(true);
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
                    let bFailTask = {
                        title: 'okay',
                        callback: function () {
                            modal.dismiss().then(() => {
                                if(that.sessionInfo != null){
                                    let details = JSON.stringify({});
                                    that.chatAndSessionService.addUserEvent("event_task_failed", details, that.task.id.toString());
                                }
                                that.taskDetails.failed = true;
                                that.ormService.insertOrUpdateTaskState(that.score, that.taskDetails).then(() => {
                                    if (!that.rootTask) {
                                        that.closeDetails();
                                    } else {
                                        that.goToNextSubtask();
                                    }
                                });
                            });
                        }};
                    if (this.rootTask && this.route.isSampleSolutionEnabled()) {
                        buttons = [bSampleSolution, bFailTask];
                    } else if (this.rootTask) {
                        buttons = [bFailTask];
                    } else if (this.route.isSampleSolutionEnabled()){
                        buttons = [bSampleSolution, bSkipTask];
                    }  else {
                        buttons = [bSkipTask];
                    }


                    break;
            }
            this.taskDetails.tries++;
            if (this.taskDetails.skipped) {
                this.taskDetails.newTries++;
            }
            let title = "a_alert_false_answer_title";
            if (this.route.isNarrativeEnabled()) {
                title = this.route.getNarrativeString(title);
                message = this.route.getNarrativeString(message);
              }
            let modal;
            if (this.route.isAnswerFeedbackEnabled()) {
                let data = {
                    title: title,
                    message: message,
                    solution: solution,
                    modalType: MCMModalType.error,
                    gamificationEnabled: !this.gamificationIsDisabled,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: buttons
                }
                if (!this.rootTask || (this.rootTask && this.subTasksRequired) && !(this.task.solutionType === 'multiple_choice' && this.multipleChoiceList.length - 1 === tries)) {
                    data['score'] = this.taskDetails.tries > 1 ? '-' + this.penalty : '0';
                }
                modal = this.modalCtrl.create(MCMIconModal, data , {
                    showBackdrop: true,
                    enableBackdropDismiss: true,
                    cssClass: this.app.activeNarrative
                });
            } else {
                let bNextTask = {
                    title: 'pdf_next_task',
                    callback: function () {
                        modal.dismiss().then(() => {
                            that.closeDetails(false);
                        });
                    }};
                modal = this.modalCtrl.create(MCMIconModal, {
                    title: 'a_alert_saved_answer_title',
                    message: 'a_alert_saved_answer_message',
                    modalType: MCMModalType.saved,
                    gamificationEnabled: !this.gamificationIsDisabled,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: [bNextTask],
                }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
            }
            modal.present();
        }
        await this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
    }

    CalculateScore(solutionType: string, solved: string) {
        if (solutionType == "value") {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            } else {
                this.taskDetails.score = this.maxScore;
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
        }

        if (solutionType == "multiple_choice") {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            } else {
                this.taskDetails.score = this.maxScore;
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
        }

        if (solutionType == "range") {
            if (solved == "solved") {
                if (this.taskDetails.tries > 0) {
                    let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                    this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                    if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                        this.score.score += this.taskDetails.score;
                    }
                } else {
                    this.taskDetails.score = this.maxScore;
                    if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                        this.score.score += this.taskDetails.score;
                    }
                }
            } else if (solved == "solved_low") {
                let solutionList = this.task.getSolutionList();

                //if the orange interval is below the green
                let dotAnswer = parseFloat(this.taskDetails.answer.replace(",", ".")); // Fix ',' decimals by converting to '.' decimals
                if (dotAnswer < solutionList[0]) {
                    if (this.taskDetails.tries > 0) {
                        let tempScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    } else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    }
                } else {
                    if (this.taskDetails.tries > 0) {
                        let tempScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    } else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    }
                }
            }
        }

        if (solutionType == 'vector_values' || solutionType == 'vector_intervals' || solutionType == 'set' || solutionType === 'blanks') {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            } else {
                this.taskDetails.score = this.maxScore;
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
        }

        if (solutionType === 'info') {
            this.taskDetails.score = 0;
        }

        if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
            let tempScore = this.taskDetails.score;
            for (let task of this.solvedSubtasks) {
                tempScore += task.score
            }
            this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
        }
        console.log("FinalScore: " + this.score.score);
    }

    CalculateOrangeScore(borderLeft: number, borderRight: number, value: number, possibleScore: number): number {
        let intervalLenght = Math.abs(borderRight - borderLeft);
        console.log("borderRight " + borderRight + "  BorderLeft " + borderLeft);
        let xVal = (Math.abs(value - borderLeft) / intervalLenght) * possibleScore;
        let score = Math.round(xVal);

        if (score < this.minScore) return this.minScore;
        else return score;
    }

    private bestPossibleScore() {
        if (this.rootTask && this.subTasksRequired) {
            return this.maxScore;
        }
        return 100;
    }

    private possibleScore(){
        if(this.taskDetails){
            if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
                let tempScore = 0;
                for (let task of this.solvedSubtasks) {
                    tempScore += task.score
                }
                if(this.taskDetails.tries == 0){
                    tempScore += this.maxScore;
                }
                else{
                    tempScore += this.maxScore - (this.taskDetails.tries - 1) * this.penalty > this.minScore ? this.maxScore - (this.taskDetails.tries - 1) * this.penalty : this.minScore;
                }
                if (this.solvedSubtasks.length < this.task.subtasks.length) {
                    let subtaskCount = 0;
                    for (let subtask of this.task.subtasks) {
                        if (subtask.solutionType !== 'info') {
                            subtaskCount++
                        }
                    }
                    let solvedSubtaskCount = 0;
                    for (let subtask of this.solvedSubtasks) {
                        let actualTask = this.task.subtasks.find(
                            task => {return task.id === subtask.taskId}
                            );
                        if (actualTask.solutionType !== 'info') {
                            solvedSubtaskCount++
                        }
                    }
                    for (let i = 0; i < subtaskCount - solvedSubtaskCount; i++) {
                        tempScore += this.subTaskScore;
                    }
                }
                return tempScore;
            }
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
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        } else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        } else {
            this.taskSolved('', solution);
        }
    }

    CalculateLineDirection(pointA: L.Marker, pointB: L.Marker, distance: number, angle: number) {
        let tempGreen = 10;
        let tempOrange = 20;

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
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (bearingSolution > 0 && lenghtSolution > 0) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        } else {
            this.taskSolved('', solution);
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
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (allOrange) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else this.taskSolved('', solution);
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
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (allOrange && diagonalSolution > 0) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else this.taskSolved('', solution);
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
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (delta < tempOrange) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else this.taskSolved('', solution);
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
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (deltaAB < tempOrange && deltaBC < tempOrange) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            } else{
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else this.taskSolved('', solution);
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
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (solutionSlope > 0 && solutionY > 0) {
            if (this.taskDetails.tries > 0) {
                let tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else{
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else this.taskSolved('', solutionFail);
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

    openInPhotoviewer(useRoot=  false) {
        if (Helper.isPluginAvailable(PhotoViewer)) {
            this.spinnerDialog.show();
            setTimeout(() => {
                // use short timeout to let spinner dialog appear
                this.photoViewer.show(useRoot ? this.rootTask.getImageURL(true) : this.task.getImageURL(true));
                setTimeout(() => {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    this.spinnerDialog.hide();
                }, 1000);
            }, 100)
        }
    }

    openSubtask(index?) {
        console.log('we opening a subtask');
        let rootTask = this.rootTask ? this.rootTask : this.task;
        if (!index && index !== 0 && this.solvedSubtasks.length === rootTask.subtasks.length) return;
        if (!index && index !== 0) {
            index = this.solvedSubtasks.length
        }
        return this.navCtrl.push(TaskDetail, {taskId: this.taskId, routeId: this.routeId, headerTitle: rootTask.getSubtasksInOrder()[index].title, subTaskIndex: index});
    }

    changeSubtaskAccordionState(subtask) {
        let activeAccordion = this.activeAccordions.find(entry => entry === subtask);
        if (activeAccordion) {
            this.activeAccordions = this.activeAccordions.filter(entry => {
                return entry != subtask;
            })
        } else {
            this.activeAccordions.push(subtask);
        }
        console.log("New Accordion State", this.activeAccordions);
    }

    goToNextSubtask(){
        const index = this.navCtrl.getActive().index;
        if (this.subTaskIndex + 1 !== this.rootTask.subtasks.length) {
            this.openSubtask(this.subTaskIndex + 1).then(() => {
                this.navCtrl.remove(index);
            })
        } else {
            this.closeDetails();
        }
    }

    goToPreviousSubtask(){
        const index = this.navCtrl.getActive().index;
        if (this.subTaskIndex - 1 >= 0) {
            this.openSubtask(this.subTaskIndex - 1).then(() => {
                this.navCtrl.remove(index);
            })
        } else {
            this.closeDetails();
        }
    }

    isSpecialTypeAnswered() {
        let isAnswered = true;
        if (!this.isSpecialTaskType) {
            return isAnswered;
        }
        if (this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals' || this.task.solutionType == 'set' || this.task.solutionType == 'blanks') {
            for (let answerObject of this.taskDetails.answerMultipleChoice) {
                if (answerObject.answer === "") {
                    isAnswered = false;
                }
            }
        }
        return isAnswered;
    }

    generateSubtaskScoreCalculationString(solved) {
        let taskScore;
        let solutionType = this.task.solutionType;
            if (solutionType == "value" || solutionType == "multiple_choice" || solutionType == 'vector_values' || solutionType == 'vector_intervals' || solutionType == 'set' || solutionType === 'blanks') {
                    taskScore = this.maxScore;
            }

            if (solutionType == "info") {
                taskScore = 0;
            }

            if (solutionType == "range") {
                if (solved == "solved") {
                        taskScore = this.maxScore;
                } else if (solved == "solved_low") {
                    let solutionList = this.task.getSolutionList();

                    //if the orange interval is below the green
                    let dotAnswer = parseFloat(this.taskDetails.answer.replace(",", ".")); // Fix ',' decimals by converting to '.' decimals
                    if (dotAnswer < solutionList[0]) {
                        if (this.taskDetails.tries > 0) {
                            taskScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                        } else {
                            taskScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore);
                        }
                    } else {
                        if (this.taskDetails.tries > 0) {
                            taskScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                        } else {
                            taskScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore);
                        }
                    }
                }
            }
        let calculation = "";
        if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
            let numbersArray = [];
            for (let task of this.solvedSubtasks) {
                if (!numbersArray[task.score]) {
                    numbersArray[task.score] = 1;
                } else {
                    numbersArray[task.score]++;
                }
            }
            if(this.taskDetails.tries <= 1) {
                if (!numbersArray[taskScore]) {
                    numbersArray[taskScore] = 1;
                } else {
                    numbersArray[taskScore]++;
                }
            }
            else {
                let tempScore = taskScore - (this.taskDetails.tries - 1) * this.penalty > this.minScore ? this.maxScore - (this.taskDetails.tries - 1) * this.penalty : this.minScore;
                if (!numbersArray[tempScore]) {
                    numbersArray[tempScore] = 1;
                } else {
                    numbersArray[tempScore]++;
                }

            }
            for (let score in numbersArray) {
                if (calculation != "") {
                    calculation += ' + '
                }
                if (numbersArray[score] == 1 && score != "0") {
                    calculation += score + 'MP';
                } else if (score != "0") {
                    calculation += numbersArray[score] + ' x ' + (score ? score + 'MP' : '');
                }
            }
        } else {
            let orangediff = 0
            if (this.taskDetails.tries > 1) {
                orangediff = this.maxScore - (this.taskDetails.tries - 1) * this.penalty - taskScore;
            }
            else {
                orangediff = this.maxScore - taskScore;
            }
            if (this.taskDetails.tries > 1) {
                    if (this.taskDetails.tries > 2) {
                        calculation = this.maxScore + 'MP - ' + (this.taskDetails.tries - 1) + ' x ' + this.penalty + 'MP';
                    } else {
                        calculation = this.maxScore + 'MP - ' + this.penalty + 'MP'
                    }
                    if (orangediff > 0) {
                        calculation += ' -' + orangediff + 'MP';
                    }
            } else if (orangediff > 0) {
                calculation = this.maxScore + 'MP - ' + orangediff + 'MP';
            }
        }
        return calculation;
    }

    displayScoreCalculation() {
        if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
            let subtaskModal = this.modalCtrl.create(MCMIconModal, {
                type: 'text',
                score: '(' + this.generateSubtaskScoreCalculationString('solved') + ')',
                gamificationEnabled: !this.gamificationIsDisabled,
                modalType: MCMModalType.calculation,
                narrativeEnabled: this.route.isNarrativeEnabled(),
                narrative: this.app.activeNarrative,
                buttons: [
                    {
                        title: 'a_alert_close',
                        callback: function () {
                            subtaskModal.dismiss();
                        }
                    }
                ]

            }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});

            subtaskModal.present();
        }
    }

    public goBack() {
        console.log("We goin back boys");
        if (!this.rootTask) {
            this.closeDetails();
        } else {
            this.goToPreviousSubtask();
        }
    }
}
