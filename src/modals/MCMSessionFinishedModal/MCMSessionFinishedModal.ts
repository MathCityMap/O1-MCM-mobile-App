import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
    selector: 'mcm-session-finished-modal',
    templateUrl:'./MCMSessionFinishedModal.html'
})
export class MCMSessionFinishedModal {
    @ViewChild('input') input;

    showError: boolean;

    constructor(private viewCtrl: ViewController) {

    }

    // ionViewDidEnter() {
    //     setTimeout(() => {
    //         this.input.setFocus();
    //     }, 150);
    // }

    cancel() {
        this.viewCtrl.dismiss();
    }

    // TODO kein cancel sondern zur Startseite
    backToStart() {
        this.cancel();
    }

}