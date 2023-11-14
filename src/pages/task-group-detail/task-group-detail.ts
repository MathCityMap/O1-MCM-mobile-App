import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage({
    segment: ':routeId/TasksGroupDetail/:taskId'
})
@Component({
    selector: 'page-task-group-detail',
    templateUrl: 'task-group-detail.html',
})
export class TaskGroupDetailPage {
    @ViewChild(Content) content: Content;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {}
}
