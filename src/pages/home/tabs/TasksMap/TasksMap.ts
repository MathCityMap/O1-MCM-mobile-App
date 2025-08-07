import {Component, OnDestroy} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Route} from '../../../../entity/Route';
import {Task} from '../../../../entity/Task';
import {Score} from '../../../../entity/Score';
import {DeepLinker} from 'ionic-angular/navigation/deep-linker';
import {GpsService} from '../../../../services/gps-service';
import {ModalsService} from '../../../../services/modals-service';
import {ImagesService} from '../../../../services/images-service';
import {Storage} from '@ionic/storage';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {MCMModalType, MyApp} from "../../../../app/app.component";
import {MCMIconModal} from "../../../../modals/MCMIconModal/MCMIconModal";
import {MCMIntroModal} from "../../../../modals/MCMIntroModal/MCMIntroModal";
import {ModalController} from "ionic-angular/components/modal/modal-controller";
import {MCMSessionFinishedModal} from "../../../../modals/MCMSessionFinishedModal/MCMSessionFinishedModal";
import {ChatPage} from "../../../chat/chat";
import {ChatAndSessionService, SessionInfo} from '../../../../services/chat-and-session-service';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {Observable} from "rxjs";
import {MCMTrailFinishedModal} from "../../../../modals/MCMTrailFinishedModal/MCMTrailFinishedModal";
import {MapHandlerInterface} from "./MapHandler/MapHandlerInterface";
import {MapboxMapHandler} from "./MapHandler/MapboxMapHandler";
import {LeafletMapHandler} from "./MapHandler/LeafletMapHandler";
import {TaskFormat} from "../../../../services/ApiResponseDefinition/TaskFormat";
import {RouteApiService} from "../../../../services/route-api.service";

@IonicPage({
    segment: 'TasksMap/:routeId'
})
@Component({
    selector: 'page-tasks-map',
    templateUrl: 'TasksMap.html'
})
export class TasksMap implements OnDestroy {

    private static UPDATE_SESSION_TIME_INTERVAL_IN_SECS: number = 15;

    private mapHandler: MapHandlerInterface;
    private mapClickSubscription: Subscription;
    private taskClickSubscription: Subscription;
    private map: any;
    private routeId: number;
    protected route: Route;
    private taskClicked = false;
    private mapTaskList: Task[];
    private scoreTaskList: Task[];

    protected state: TaskMapState = {
        selectedTask: null,
        isShowingAllTasks: false,
        visibleTasks: {},
        skippedTaskIds: [],
        selectedStartTask: false,
        showIntroModal: false,
        showGuidedTrailModal: false
    };
    private score: Score;
    private stateKey: string = "savedMapStateByRoute";
    private taskToSkip: Task = null;
    protected gamificationIsDisabled = false;

    currentScore: any;
    protected sessionInfo: SessionInfo;
    private sessionSubscription: Subscription;
    private watchSubscription: Subscription;

    protected countdownOrTimerForSession: number;
    protected countdownBeforeSession: boolean = false;
    protected startInterval: boolean = false;
    protected showCountdownOrTimer: boolean = false;
    protected showSessionEnds: boolean = false;
    protected fabListOpen: boolean = false;
    private taskBlocked: boolean = false;

    private sessionTimeTimer = Observable.interval(TasksMap.UPDATE_SESSION_TIME_INTERVAL_IN_SECS * 1000);
    private sessionTimeSubscription: Subscription;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        private deepLinker: DeepLinker,
        private gpsService: GpsService,
        private modalsService: ModalsService,
        private imagesService: ImagesService,
        private storage: Storage,
        private spinner: SpinnerDialog,
        private modalCtrl: ModalController,
        private app: MyApp,
        protected chatAndSessionService: ChatAndSessionService,
        private routeApiService: RouteApiService
    ) {
        this.chatAndSessionService.init();
        this.events.subscribe('user:kicked', (user) => {
            if (user == 'self') {
                console.log("userKicked");
                this.sessionKicked();
                this.events.unsubscribe('user:kicked', null);
            } else {
                console.log("Someone else was kicked.")
            }
        });
        this.events.subscribe('session:updated', (sessionInfo) => {
            console.log('Session has been updated');
            this.updateSession(sessionInfo);
        });
        this.events.subscribe('user:assigned_task', (taskId) => {
            console.log('User has been assigned task with id: ' + taskId);
            this.sessionInfo.sessionUser.assigned_task_id = taskId;
            this.forceStartFromTask(taskId).then(() => {
                this.redrawMarkers();
            });
        });
    }

    isTrailCompleted() {
        if (this.route.isAnswerFeedbackEnabled()) {
            return (this.scoreTaskList && this.score.getTasksSolved().length + this.score.getTasksSolvedLow().length + this.score.getTasksFailed().length == this.scoreTaskList.length);
        } else {
            return this.score.getTasksSaved() && this.score.getTasksSaved().length == this.scoreTaskList.length;
        }
    }

    showTrailCompletedAlert() {
        let that = this;
        let modal = this.modalCtrl.create(MCMTrailFinishedModal,
            {
                score: this.score,
                tasks: this.scoreTaskList,
                narrative: this.app.activeNarrative,
                callback: function () {
                    modal.dismiss().then(async () => {
                        that.route.completed = true;
                        that.route.completedDate = new Date().toDateString().split(' ').slice(1).join(' ');
                        await that.routeApiService.updateDownloadedRoute(that.route);
                    });
                }
            }, {cssClass: this.app.activeNarrative});
        modal.present();
    }

    ionViewWillEnter() {
        this.initView().then().catch(e => {
            console.error('Initview failed', e);
        });
    }

    async initView() {
        this.routeId = this.navParams.get('routeId');
        this.route = await this.routeApiService.getRouteFromId(this.routeId);
        this.gamificationIsDisabled = this.route.isGamificationDisabled();
        this.score = (await this.routeApiService.getDetailsForRoute(this.route)).score;
        let sessionInfo = this.chatAndSessionService.getSessionInfo();
        this.updateSession(sessionInfo);
        this.events.publish('narrativeChange', this.route.getNarrativeName());

        await this.loadMap();
        await new Promise(resolve => {
            setTimeout(async () => {
                // adding markers immediately after map initialization caused marker cluster problems -> use timeout
                await this.initializeMap();
                this.spinner.hide();
                if (this.isTrailCompleted() && !this.route.completed) {
                    this.showTrailCompletedAlert();
                }
                resolve();
            }, 500);
        });

        if (this.sessionInfo != null) {
            // Add event of user entering trail when session active
            let details = JSON.stringify({});
            this.chatAndSessionService.addUserEvent("event_trail_opened", details, "0");

            if (this.sessionInfo.started === false) {
                this.showAllTasks();
                this.resetTasks();

                if (this.sessionInfo.sessionUser.assigned_task_id != 0) {
                    await this.refreshTaskLists();
                    await this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id);
                    if (this.route.isNarrativeEnabled()) {
                        this.showIntroModal().then(() => {
                            this.state.showIntroModal = false;
                        })
                    }
                } else {
                    if (this.route.isNarrativeEnabled()) {
                        this.showIntroModal().then(() => {
                            this.state.showIntroModal = false;
                            this.showGuidedTrailModalWithDelay(500);
                        })
                    }
                }

                this.saveMapStateToLocalStorage();
                this.sessionInfo.started = true;
                await this.chatAndSessionService.updateSession(this.sessionInfo);
                await this.redrawMarkers();
                return;
            }
        }

        if (this.navParams.data.tasksMapState) {
            this.state = this.navParams.data.tasksMapState;
            if (this.taskToSkip || (this.state.selectedStartTask && (this.score.getTasksSolved().indexOf(this.state.selectedTask.id) > -1 || this.score.getTasksSolvedLow().indexOf(this.state.selectedTask.id) > -1))) {
                this.goToNextTask(this.state.selectedTask, true);
            }
        } else {
            this.state = await this.getMapStateFromLocalStorage();
            if (this.taskToSkip) {
                this.goToNextTask(this.taskToSkip, true);
                this.taskToSkip = null;
            }
            if (!this.state) {
                // attach state to navParams so that state is restored when moving back in history (from task detail view)
                this.state = this.navParams.data.tasksMapState = {
                    selectedTask: this.navParams.get("selectedTask"),
                    isShowingAllTasks: false,
                    visibleTasks: {},
                    skippedTaskIds: [],
                    selectedStartTask: false,
                    showIntroModal: false, // Intro Modal for narratives will be displayed on first start anyway
                    showGuidedTrailModal: false // GuidedTrail Modal will be displayed on first start anyway
                };
                this.state.isShowingAllTasks = !this.state.selectedTask;
                if (this.state.selectedTask) {
                    this.state.visibleTasks[this.state.selectedTask.position] = true;
                } else if (this.route.isNarrativeEnabled()) {
                    this.showIntroModal().then(() => {
                        this.showGuidedTrailModalWithDelay(500);
                    });
                } else {
                    this.showGuidedTrailModalWithDelay(500);
                }
            } else {
                if (this.state.showIntroModal && this.route.isNarrativeEnabled()) {
                    this.showIntroModal().then(() => {
                        const that = this;
                        that.state.showIntroModal = false;
                        this.saveMapStateToLocalStorage();
                        if (this.state.showGuidedTrailModal) {
                            this.showGuidedTrailModalWithDelay(500);
                        }
                    });
                } else if (this.state.showGuidedTrailModal) {
                    this.showGuidedTrailModalWithDelay(500);
                }
            }
        }
        await this.redrawMarkers();
    }

    private showGuidedTrailModalWithDelay(delay) {
        const that = this;
        this.state.showGuidedTrailModal = false;
        setTimeout(function () {
            that.modalsService.showDialog('a_guided_trail_title', 'a_guided_trail',
                'no', () => {
                },
                'yes', async () => {
                    that.selectStartPoint();
                    that.state.selectedStartTask = true;
                }, that.app.activeNarrative);
        }, delay);
    }

    private async forceStartFromTask(taskId) {
        if (!this.mapTaskList || this.mapTaskList.length === 0) {
            await this.refreshTaskLists()
        }
        console.log('Force Start From Task', this.mapTaskList);
        let selectedTask = this.mapTaskList.filter(x => x.id == taskId).pop();
        this.state.selectedTask = selectedTask;
        console.debug("forceStartFromTask");
        this.state.visibleTasks = {};
        this.state.visibleTasks[selectedTask.position] = true;
        this.state.isShowingAllTasks = false;
        this.state.showGuidedTrailModal = false;
        this.centerSelectedTask();
    }

    ngOnDestroy() {
        if (this.sessionSubscription) {
            this.sessionSubscription.unsubscribe();
            this.sessionSubscription = null;
        }
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
        if (this.mapClickSubscription) {
            this.mapClickSubscription.unsubscribe();
            this.mapClickSubscription = null;
        }
        if (this.taskClickSubscription) {
            this.taskClickSubscription.unsubscribe();
            this.taskClickSubscription = null
        }

        // Unsubscribe events:
        this.events.unsubscribe('user:kicked');
        this.events.unsubscribe('session:updated');
        this.events.unsubscribe('user:assigned_task');
        this.events.publish('narrativeChange', 'default');
    }

    initializeMapHandler() {
        if (!this.mapHandler) {
            if (this.route.isMapAvailableOffline()) {
                this.mapHandler = new LeafletMapHandler('tasks-map', this.route, this.app.activeNarrative, this.routeApiService, this.imagesService);
                return
            }
            this.mapHandler = new MapboxMapHandler('tasks-map', this.route, this.app.activeNarrative);
            return;
        }
    }

    async initializeMap() {
        this.currentScore = this.score.score;
        await this.redrawMarkers();
        this.gpsService.isLocationOn();
        // This should fix the gray tiles and missing marker issue on android
        if (this.map != null) {
            this.map.invalidateSize();
        }
    }

    updateSession(sessionInfo: SessionInfo) {
        console.log(this.routeId);
        console.log(sessionInfo);
        if (sessionInfo && sessionInfo.session) {
            if (this.routeId != sessionInfo.session.trail_id) {
                console.log(`active session belongs to different trail`);
                this.sessionInfo = null;
            } else {
                this.sessionInfo = sessionInfo;
                console.log('active session: ' + sessionInfo.session.code);
                if (this.sessionTimeSubscription) {
                    this.sessionTimeSubscription.unsubscribe();
                }
                this.sessionTime();
                this.sessionTimeSubscription = this.sessionTimeTimer.subscribe(tick => {
                    this.sessionTime();
                });
            }
        } else {
            console.log('no active session');
            this.sessionInfo = null;
        }
    }

    async getMapStateFromLocalStorage() {
        let mapState = await this.storage.get(this.stateKey);
        if (mapState && mapState[this.routeId]) {
            let state = mapState[this.routeId];
            console.log(this.navParams);
            state.selectedTask = this.navParams.get("selectedTask");
            return state;
        }
        return null;
    }

    async saveMapStateToLocalStorage() {
        let mapState = await this.storage.get(this.stateKey);
        if (!mapState) {
            mapState = {};
        }
        mapState[this.routeId] = this.state;
        return this.storage.set(this.stateKey, mapState);
    }

    async ionViewWillLeave() {
        this.saveMapStateToLocalStorage();
    }

    assignedTask() {
        if (this.sessionInfo == null) {
            return false
        } else {
            return this.sessionInfo.session.assign_tasks;
        }
    }

    async loadMap() {
        if (!this.mapHandler) {
            this.initializeMapHandler();
        }
        if (this.mapHandler.mapLoaded) return;
        const resp = await this.gpsService.getCurrentPosition();
        await this.mapHandler.loadMap(resp ? resp.coords : undefined);
        this.mapClickSubscription = this.mapHandler.mapClickedEvent.subscribe(() => {
            if (this.taskClicked) {
                this.taskClicked = false;
                return;
            }
            this.state.selectedTask = null;
        });
        this.taskClickSubscription = this.mapHandler.taskClickedEvent.subscribe((taskId) => {
            this.taskClicked = true;
            const task = this.mapTaskList.find(t => t.id == taskId);
            if (!task) return;

            if (this.state.selectedTask == task) {
                this.gototask(task.id, task.title, task.taskFormat);
            } else {
                console.log('we update state');
                if (this.sessionInfo != null) {
                    let details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_task_previewed", details, task.id.toString());
                }
                this.state.selectedTask = task;
                this.centerSelectedTask();
            }
        });
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
        }

        this.watchSubscription = this.gpsService.watchPosition().subscribe(position => {
            if (position?.coords) {
                this.mapHandler.updateUserPosition(position.coords.latitude, position.coords.longitude);
            }
        });
        // If there's a selected task, center on it
        if (this.state.selectedTask) {
            this.centerSelectedTask();
        }
    }

    async redrawMarkers() {
        console.log('TasksMap redraw markers');
        if (!this.mapHandler) {
            this.initializeMapHandler();
        }
        await this.refreshTaskLists();
        return this.mapHandler.redrawMarkers(this.mapTaskList, this.state, this.score);
    }
    centerSelectedTask() {
        this.mapHandler.moveTo(this.state.selectedTask.lat, this.state.selectedTask.lon);
    }

    goToNextTaskById(taskId: number, skip?: boolean) {
        this.mapTaskList.forEach(task => {
            if (task.id == taskId) {
                this.goToNextTask(task, skip);
                return;
            }
        });
    }

    goToNextTask(task: Task, skip?: boolean) {
        if (skip) {
            this.state.skippedTaskIds.push(task.id);
        }
        console.debug("goToNextTask");
        const nextTask = this.mapTaskList[task.position % this.mapTaskList.length];
        if (nextTask.inactive) {
            return this.goToNextTask(nextTask);
        }
        // Save selected task in navParams as well so refreshing state from local storage doesn't reset it
        this.navParams.data.selectedTask = nextTask;
        this.state.selectedTask = nextTask;
        this.state.visibleTasks[this.state.selectedTask.position] = true;
        this.centerSelectedTask();
        this.saveMapStateToLocalStorage();
    }

    async selectStartPoint() {
        /* open the damn modal again */
        let that = this;
        console.log('Active Narrative is: ' + this.app.activeNarrative);
        return this.modalsService.presentTaskListModal(this.route, this.score, this.state, this.app.activeNarrative, this.navCtrl, function (selectedTask: Task) {
            console.debug("back in tasksMap");
            that.state.selectedTask = selectedTask;
            that.state.visibleTasks = {};
            that.state.visibleTasks[selectedTask.position] = true;
            that.state.isShowingAllTasks = false;
            that.centerSelectedTask();
            that.redrawMarkers();
            if (that.sessionInfo != null) {
                let details = JSON.stringify({title: that.state.selectedTask.title});
                that.chatAndSessionService.addUserEvent("event_trail_start_from_task", details, that.state.selectedTask.id.toString());
            }
        });
    }

    showAllTasks() {
        this.state.isShowingAllTasks = true;
        this.redrawMarkers();
    }

    displayResetTasksModal() {
        this.modalsService.showDialog('a_route_detail_settings_resetTasks', 'a_route_detail_settings_resetTasks_msg',
            'no', () => {
            },
            'yes', async () => {
                await this.resetTasks();
                this.showGuidedTrailModalWithDelay(50);
            }, this.app.activeNarrative);
    }

    resetTasks() {
        return new Promise<void>(resolve => {
            this.routeApiService.resetScoreForRoute(this.route.code).then(async () => {
                this.score = new Score();
                this.state = this.navParams.data.tasksMapState = {
                    selectedTask: null,
                    isShowingAllTasks: true,
                    visibleTasks: {},
                    skippedTaskIds: [],
                    selectedStartTask: false,
                    showIntroModal: true,
                    showGuidedTrailModal: true
                };
                if (!this.mapTaskList) {
                    await this.refreshTaskLists()
                }
                if (this.sessionInfo != null && this.sessionInfo.sessionUser.assigned_task_id != 0) {
                    await this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id);
                }
                this.route.completed = false;
                this.route.completedDate = null;
                await this.saveMapStateToLocalStorage();
                await this.routeApiService.updateDownloadedRoute(this.route);
                await this.redrawMarkers();
                resolve();
            });
        });
    }

    async sessionFinished() {
        this.modalsService.showDialog('a_private_session_quit', 'a_private_session_quit_text',
            'no', () => {
            },
            'yes', () => {
                let modal = this.modalCtrl.create(MCMSessionFinishedModal,
                    {
                        session: this.sessionInfo.session,
                        score: this.score,
                        tasks: this.scoreTaskList,
                        narrative: this.app.activeNarrative
                    }, {cssClass: this.app.activeNarrative});
                modal.present();
                if (this.sessionInfo != null) {
                    let details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_session_leave", details, "0");
                }
                this.chatAndSessionService.exitActiveSession();
                if (this.sessionTimeSubscription) {
                    this.sessionTimeSubscription.unsubscribe();
                }
            }, this.app.activeNarrative);
    }

    async sessionKicked() {
        let that = this;
        let modal = this.modalCtrl.create(MCMIconModal, {
            title: 'a_private_session_kicked',
            message: 'a_private_session_kicked_text',
            modalType: MCMModalType.hint,
            type: 'text',
            gamificationEnabled: false,
            narrativeEnabled: this.route.isNarrativeEnabled(),
            narrative: this.app.activeNarrative,
            buttons: [
                {
                    title: 'a_g_ok',
                    callback: function () {
                        modal.dismiss();
                        let finishedModal = that.modalCtrl.create(MCMSessionFinishedModal,
                            {
                                session: that.sessionInfo.session,
                                score: that.score,
                                tasks: that.mapTaskList,
                                narrative: this.app.activeNarrative
                            }, {
                                showBackdrop: true,
                                enableBackdropDismiss: false
                            });
                        if (that.sessionInfo != null) {
                            that.chatAndSessionService.exitActiveSession();
                        }
                        if (that.sessionTimeSubscription) {
                            that.sessionTimeSubscription.unsubscribe();
                        }
                        finishedModal.present();
                    }
                },
            ]
        }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
        modal.present();
    }

    async gototask(taskId: number, taskName: string, taskFormat: TaskFormat) {
        if (this.taskBlocked) {
            console.log('session in preparation.');
            return;
        }
        console.debug('taskId', taskId);
        let that = this;
        if (taskFormat === TaskFormat.GROUP) {
            this.navCtrl.push('TaskGroupDetail', {
                groupId: taskId,
                headerTitle: taskName,
                routeId: this.routeId,
                goToNextTaskById: function (taskIdToSkip: number, skip?: boolean) {
                    that.goToNextTaskById(taskIdToSkip, skip);
                }
            }, {}, () => {
                // necessary because of bug which does not update URL
                this.deepLinker.navChange('forward');
            });
        } else {
            this.navCtrl.push('TaskDetail', {
                taskId: taskId,
                headerTitle: taskName,
                routeId: this.routeId,
                goToNextTaskById: function (taskIdToSkip: number, skip?: boolean) {
                    that.goToNextTaskById(taskIdToSkip, skip);
                }
            }, {}, () => {
                // necessary because of bug which does not update URL
                this.deepLinker.navChange('forward');
            });
        }
    }

    async navigateToChat() {
        console.debug('showChat');
        if (this.sessionInfo != null) {
            let details = JSON.stringify({});
            this.chatAndSessionService.addUserEvent("event_trail_chat_open", details, "0");
        }
        this.navCtrl.push(ChatPage, {
            val: 'chatseite',
            headerTitle: this.sessionInfo.session.name
        });

    }

    private sessionTime() {
        if (this.sessionInfo == null) {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            return;
        }
        let session = this.sessionInfo.session;
        let currentTimeUnix = moment().unix();
        let startTimeInUnix = moment(session.starts_at).unix();
        let endTimeInUnix = moment(session.ends_at).unix();
        let countdown = startTimeInUnix - currentTimeUnix;
        let countdownInMin = Math.floor(countdown / 60);
        let timerInMin = Math.floor((endTimeInUnix - currentTimeUnix) / 60);

        if (currentTimeUnix > (startTimeInUnix - 3600) && currentTimeUnix < endTimeInUnix) {
            this.startInterval = true;
            if (currentTimeUnix < startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownBeforeSession = true;
                this.countdownOrTimerForSession = countdownInMin;
                this.taskBlocked = true;
            }
            if (currentTimeUnix > startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownOrTimerForSession = timerInMin;
                this.countdownBeforeSession = false;
                this.taskBlocked = false;
            }
        } else {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            this.showSessionEnds = true;
            this.taskBlocked = false;
            // Leave session
            let modal = this.modalCtrl.create(MCMSessionFinishedModal,
                {
                    session: this.sessionInfo.session,
                    score: this.score,
                    tasks: this.scoreTaskList,
                    narrative: this.app.activeNarrative
                }, {cssClass: this.app.activeNarrative});
            modal.present();
            return;
        }

    }

    showIntroModal(): Promise<void> {
        return new Promise<void>(success => {
            let title = 'a_alert_welcome';
            let message = 'a_alert_welcome_msg';
            if (this.route.isNarrativeEnabled()) {
                title = this.route.getNarrativeString(title);
                message = this.route.getNarrativeString(message);
            }
            let introModal = this.modalCtrl.create(MCMIntroModal, {
                title: title,
                message: message,
                modalType: MCMModalType.hint,
                narrative: this.app.activeNarrative,
                routeTitle: this.route.title,
                buttons: [
                    {
                        title: 'a_alert_close',
                        callback: function () {
                            introModal.dismiss();
                            success();
                        }
                    }
                ]

            }, {cssClass: this.app.activeNarrative});
            introModal.present();
        });
    }

    getFinishedSubtaskCounters(task: Task) {
        let counters = {
            total: 0,
            solved: 0,
            solvedLow: 0,
            failed: 0,
            saved: 0,
            skipped: 0
        };
        for (let subtask of task.getLegitSubtasks()) {
            let taskDetails = this.score.getTaskStateForTask(subtask.id);
            if (taskDetails.solved) {
                counters.total++
                counters.solved++
                continue;
            }
            if (taskDetails.solvedLow) {
                counters.total++
                counters.solvedLow++
                continue;
            }
            if (taskDetails.failed) {
                counters.total++
                counters.failed++
                continue;
            }
            if (taskDetails.saved) {
                counters.total++
                counters.saved++
                continue;
            }
            if (taskDetails.skipped) {
                counters.total++
                counters.skipped++
            }
        }
        return counters;
    }

    async refreshTaskLists() {
        this.mapTaskList = (await this.routeApiService.getDetailsForRoute(this.route)).tasks;
        let scoredTasks = this.mapTaskList.filter(task => {return task.taskFormat !== TaskFormat.GROUP});
        const groups = this.mapTaskList.filter(task => {return task.taskFormat === TaskFormat.GROUP});
        for (let group of groups) {
            scoredTasks = scoredTasks.concat(group.getLegitSubtasks());
        }
        scoredTasks = scoredTasks.filter(task => {return !task.inactive});
        this.scoreTaskList = scoredTasks;
    }

    goBack(){
        this.navCtrl.pop({}, () => {
            this.deepLinker.navChange('back');
        });
    }


    protected readonly TaskFormat = TaskFormat;
}

export interface TaskMapState {
    selectedTask: Task;
    isShowingAllTasks: boolean;
    visibleTasks: any;
    skippedTaskIds: number[];
    selectedStartTask: boolean;
    showIntroModal: boolean;
    showGuidedTrailModal: boolean;
}
