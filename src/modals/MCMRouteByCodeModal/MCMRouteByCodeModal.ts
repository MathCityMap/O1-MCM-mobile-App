import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { MCMTermsAndConditionsModal } from "../MCMTermsAndConditionsModal/MCMTermsAndConditionsModal";


@Component({
    selector: 'mcm-route-by-code-modal',
    templateUrl:'./MCMRouteByCodeModal.html'
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMRouteByCodeModal {
    @ViewChild('input') input;

    code: string = '';
    codeInput: boolean = false;
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

    checkInputField() {
        let len = 5;
        if(this.code.length == len){
            this.codeInput = true;
        } else {
            this.codeInput = false;
        }
        return this.codeInput;
    }

    async addTrailOrSessionByCode() {
        let modal = this.modalCtrl.create(MCMTermsAndConditionsModal);
        this.cancel();
        modal.present();
    }

}