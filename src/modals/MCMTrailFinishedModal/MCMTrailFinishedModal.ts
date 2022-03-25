import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController, NavParams } from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import { App } from "ionic-angular";
import { Session } from '../../app/api/models/session';
import { Score } from '../../entity/Score';
import { Task } from '../../entity/Task';

@Component({
    selector: 'mcm-trail-finished-modal',
    templateUrl:'./MCMTrailFinishedModal.html'
})
export class MCMTrailFinishedModal {
    @ViewChild('input') input;

    showError: boolean;
    private score: Score;
    private callback: Function;
    private tasks: Task[];
    private numberOfSolvedTasks: number;
    private iconPath: string;
    private narrative: string;

    constructor(private viewCtrl: ViewController,
                private navCtrl: NavController,
                private appCtrl: App,
                private navParams: NavParams) {
        this.score = navParams.data.score;
        this.tasks = navParams.data.tasks;
        this.callback = navParams.data.callback;
        this.numberOfSolvedTasks = 0;
        let solvedTasks = this.score.getTasksSolved();
        let solvedLowTasks = this.score.getTasksSolvedLow();
        let savedTasks = this.score.getTasksSaved();
        this.tasks.map(task => {
           if (savedTasks.indexOf(task.id) >= 0 || solvedTasks.indexOf(task.id) >= 0 || solvedLowTasks.indexOf(task.id) >= 0) {
               this.numberOfSolvedTasks++;
           }
        });
        if(navParams.data.narrative) {
            this.narrative = navParams.data.narrative;
            switch (this.narrative) {
                case 'pirates':
                    this.iconPath = 'pirates/';
                    break;
                default:
                    this.iconPath = '';
            }
        } else {
            this.iconPath = '';
        }
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
