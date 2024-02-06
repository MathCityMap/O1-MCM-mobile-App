import {Component, ViewChild} from '@angular/core';
import {Content, DeepLinker, IonicPage, NavController, NavParams} from 'ionic-angular';
import {OrmService} from "../../services/orm-service";
import {Route} from "../../entity/Route";
import {Task} from "../../entity/Task";
import {Score} from "../../entity/Score";
import {ModalsService} from "../../services/modals-service";
import {ChatAndSessionService, SessionInfo} from "../../services/chat-and-session-service";
import {Helper} from "../../classes/Helper";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";

@IonicPage({
    segment: ':routeId/TasksGroupDetail/:taskId'
})
@Component({
    selector: 'page-task-group-detail',
    templateUrl: 'task-group-detail.html',
})
export class TaskGroupDetail {
    @ViewChild(Content) content: Content;

    protected route: Route;
    private routeId: number;
    private groupId: number;
    protected group: Task;
    private score: Score;
    protected subtasks: Array<Task> = [];
    protected groupIsFinished = false;
    private sessionInfo: SessionInfo;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public ormService: OrmService,
        private modalsService: ModalsService,
        private chatAndSessionService: ChatAndSessionService,
        private deepLinker: DeepLinker,
        private photoViewer: PhotoViewer,
        private spinnerDialog: SpinnerDialog
    ) {}

    async ionViewWillEnter() {
        this.routeId = this.navParams.get('routeId');
        this.route = await this.ormService.findRouteById(this.routeId);
        this.groupId = this.navParams.get('groupId');
        this.group = await this.ormService.findTaskById(this.groupId);
        this.score = this.route.getScoreForUser(await this.ormService.getActiveUser());
        this.sessionInfo = await this.chatAndSessionService.getActiveSession();
        this.subtasks = this.group.getSubtasksInOrder();
        this.groupIsFinished = this.checkIfGroupIsFinished();
    }

    async ionViewWillLeave() {
        if (this.groupIsFinished) {
            //This guarantees that the state is updated before the map opens and gets the information.
            if (this.navParams.get('goToNextTaskById')) {
                let goToNextTaskById = this.navParams.get('goToNextTaskById');
                goToNextTaskById(this.groupId, false);
            }
        }
    }

    getSolvedSubtaskCount() {
        let count = 0;
        for (let subtask of this.group.getLegitSubtasks()) {
            if (this.isTaskFinished(subtask)) {
                count++;
            }
        }
        return count;
    }

    isTaskFinished(task: Task) {
        if (!this.score) {
            return false;
        }
        let taskDetails = this.score.getTaskStateForTask(task.id);
        return (taskDetails.saved || taskDetails.solved || taskDetails.solvedLow || taskDetails.failed || taskDetails.skipped);
    }

    getAdditionalSubtaskClasses(task: Task) {
        let classString = "";
        const taskDetails = this.score.getTaskStateForTask(task.id);
        if (this.isTaskFinished(task)) {
            if (!taskDetails.skipped) {
                classString += "solved";
            }
            if (taskDetails.solved) {
                classString += " perfect";
            } else if (taskDetails.solvedLow) {
                classString += " good";
            } else if (taskDetails.saved) {
                classString += " saved";
            } else if (taskDetails.failed) {
                classString += " failed";
            } else if (taskDetails.skipped) {
                classString += " skipped";
            }
        }
        return classString;
    }

    getScoreForTask(task: Task) {
        const taskDetails = this.score.getTaskStateForTask(task.id);
        if (this.isTaskFinished(task) && (!taskDetails.skipped)) {
            return taskDetails.score;
        }
        const maxScore = task.solutionType !== 'info' ? 100 : 0;
        const penalty = Math.floor(maxScore) * 0.15;
        const minScore = Math.floor(maxScore) / 10;
        if (!taskDetails) {
            return maxScore;
        }
        if (taskDetails.tries == 0) {
            return maxScore;
        } else {
            return maxScore - (taskDetails.tries - 1) * penalty > minScore ? maxScore - (taskDetails.tries - 1) * penalty : minScore;
        }
    }

    getTotalScoreForGroup() {
        let score = 0;
        for (let task of this.subtasks) {
            let taskDetails = this.score.getTaskStateForTask(task.id);
            if (this.isTaskFinished(task) && !taskDetails.skipped) {
                return taskDetails.score;
            }
        }
        return score;
    }

    openSubtask(task: Task) {
        return this.navCtrl.push("TaskDetail", {
            taskId: task.id,
            routeId: this.routeId,
            headerTitle: task.title
        });
    }

    skipGroup() {
        this.modalsService.showDialog('a_taskGroup_skip_button', 'a_taskGroup_skip_confirm',
            'no', () => {
            },
            'yes', async () => {
                for(let task of this.subtasks) {
                    let taskDetails = this.score.getTaskStateForTask(task.id);
                    if (this.isTaskFinished(task)) {
                        continue;
                    }
                    if (this.sessionInfo != null) {
                        this.chatAndSessionService.addUserEvent("event_task_skipped", "{}", this.groupId.toString());
                    }
                    taskDetails.skipped = true;
                    await this.ormService.insertOrUpdateTaskState(this.score, taskDetails);
                }
                if (this.navParams.get('goToNextTaskById')) {
                    let goToNextTaskById = this.navParams.get('goToNextTaskById');
                    goToNextTaskById(this.groupId, true);
                }
                this.deepLinker.navChange('back');
                this.navCtrl.pop();
            });
    }

    checkIfGroupIsFinished() {
        if (this.score.getGroupsFinished().indexOf(this.groupId) !== -1) return true;
        let finished = true;
        for (let task of this.group.getLegitSubtasks()) {
            if (!this.isTaskFinished(task)) {
                finished = false;
                break;
            }
        }
        if (finished) {
            this.score.addGroupFinished(this.groupId);
        }
        return finished;
    }

    openInPhotoviewer() {
        if (Helper.isPluginAvailable(PhotoViewer)) {
            this.spinnerDialog.show();
            setTimeout(() => {
                // use short timeout to let spinner dialog appear
                this.photoViewer.show(this.group.getImageURL(true));
                setTimeout(() => {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    this.spinnerDialog.hide();
                }, 1000);
            }, 100)
        }
    }
}
