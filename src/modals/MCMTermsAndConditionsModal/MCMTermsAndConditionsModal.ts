import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController, NavController, NavParams } from "ionic-angular";
import { MCMJoinSessionModal } from "../MCMJoinSessionModal/MCMJoinSessionModal";
import { Session } from '../../app/api/models/session';


@Component({
    selector: 'mcm-terms-and-conditions-modal',
    templateUrl:'./MCMTermsAndConditionsModal.html'
})
export class MCMTermsAndConditionsModal {
    @ViewChild('input') input;

    tacCheckbox: boolean = false;
    showError: boolean;
    session: Session;
    navCtrl: NavController

    constructor(private navParams: NavParams, public modalCtrl: ModalController, private viewCtrl: ViewController) {
        this.session = this.navParams.data.session;
        this.navCtrl = this.navParams.data.navCtrl;
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    async addJoinSession() {
        let modal = this.modalCtrl.create(MCMJoinSessionModal, {session: this.session, navCtrl: this.navCtrl});
        this.cancel();
        modal.present();
    }
}