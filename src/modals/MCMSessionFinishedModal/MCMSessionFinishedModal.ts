import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController, NavParams } from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import { App } from "ionic-angular";
import { Session } from '../../app/api/models/session';
import { Score } from '../../entity/Score';
import { Task } from '../../entity/Task';

@Component({
    selector: 'mcm-session-finished-modal',
    templateUrl:'./MCMSessionFinishedModal.html'
})
export class MCMSessionFinishedModal {
    @ViewChild('input') input;

    showError: boolean;
    private session: Session;
    private score: Score;
    private tasks: Task[];
    private numberOfSolvedTasks: number;

    constructor(private viewCtrl: ViewController,
                private navCtrl: NavController,
                private appCtrl: App,
                private navParams: NavParams) {
        this.session = navParams.data.session;
        this.score = navParams.data.score;
        this.tasks = navParams.data.tasks;
        this.numberOfSolvedTasks = 0;
        let solvedTasks = this.score.getTasksSolved();
        let solvedLowTasks = this.score.getTasksSolvedLow();
        this.tasks.map(task => {
           if (solvedTasks.indexOf(task.id) >= 0 || solvedLowTasks.indexOf(task.id) >= 0) {
               this.numberOfSolvedTasks++;
           }
        });
    }

    // ionViewDidEnter() {
    //     setTimeout(() => {
    //         this.input.setFocus();
    //     }, 150);
    // }

     cancel() {
        this.viewCtrl.dismiss();
    }

     backToStart() {
        this.appCtrl.getRootNav().popToRoot(HomePage);
        this.cancel();
    }

}