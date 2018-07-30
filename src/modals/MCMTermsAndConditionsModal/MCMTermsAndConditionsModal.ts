import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from "ionic-angular";
import { MCMJoinSessionModal } from "../MCMJoinSessionModal/MCMJoinSessionModal";


@Component({
    selector: 'mcm-terms-and-conditions-modal',
    templateUrl:'./MCMTermsAndConditionsModal.html'
})
export class MCMTermsAndConditionsModal {
    @ViewChild('input') input;

    tacCheckbox: boolean = false;
    showError: boolean;

    constructor(public modalCtrl: ModalController, private viewCtrl: ViewController) {

    }

    // ionViewDidEnter() {
    //     setTimeout(() => {
    //         this.input.setFocus();
    //     }, 150);
    // }

    cancel() {
        this.viewCtrl.dismiss();
    }

    async addJoinSession() {
        let modal = this.modalCtrl.create(MCMJoinSessionModal);
        this.cancel();
        modal.present();
    }
}