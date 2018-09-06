import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";
import { App } from "ionic-angular";

@Component({
    selector: 'mcm-session-finished-modal',
    templateUrl:'./MCMSessionFinishedModal.html'
})
export class MCMSessionFinishedModal {
    @ViewChild('input') input;

    showError: boolean;

    constructor(private viewCtrl: ViewController,
                private navCtrl: NavController,
                private appCtrl: App) {

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