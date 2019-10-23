import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {Helper} from "../../classes/Helper";

@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    devMode: boolean;
    tabBarElement: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private helper: Helper) {
                this.tabBarElement = document.querySelector('.tabbar');
    }

    pushSettingsPage() {
        this.navCtrl.push('SettingsPage');
    }
    pushInfoPage() {
        this.navCtrl.push('InfoPage');
    }

    switchTab(index: number){
        this.navCtrl.parent.select(index);
    }

    ionViewWillEnter(){
        this.devMode = this.helper.getDevMode();
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'none';
        }
    }
    ionViewDidLeave() {
        this.tabBarElement.style.display = 'flex';
    }

}
