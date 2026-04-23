import { Component } from '@angular/core';
import {DeepLinker, IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import {PROGRESS_MILESTONES, ProgressCounter, ProgressService} from "../../services/progress-service";

@IonicPage()
@Component({
  selector: 'page-achievements',
  templateUrl: 'achievements.html',
})
export class AchievementsPage {
    protected milestones: Array<DisplayMilestone> = [];
    protected counters: Array<CounterInfo> = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public appVersion: AppVersion,
      public platform: Platform,
      public viewCtrl: ViewController,
      private deepLinker: DeepLinker,
      private progress: ProgressService
  ) {

  }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter AchievementsPage');
    for (let counter of Object.values(ProgressCounter)) {
        let milestoneIndex = this.progress.getActiveMilestoneIndexForCounter(counter);
        let milestone = PROGRESS_MILESTONES[counter][milestoneIndex];
        let currentCount = this.progress.getCurrentProgressForCounter(counter);
        let previousThreshold = 0;
        if (milestoneIndex > 0) {
            previousThreshold = PROGRESS_MILESTONES[counter][milestoneIndex-1].threshold;
        }
        this.counters.push({name: counter, count: currentCount});
        this.milestones.push({...milestone, name: counter, count: currentCount - previousThreshold, level: milestoneIndex+1});
    }
  }

    goBack() {
        this.navCtrl.pop({}, () => {
            this.deepLinker.navChange('back');
        });
    }
}

type CounterInfo = {
    name: ProgressCounter,
    count: number
}

type DisplayMilestone = {
    name: ProgressCounter,
    count: number,
    icon: string,
    threshold: number,
    level: number
}
