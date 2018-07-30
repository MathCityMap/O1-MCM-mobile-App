import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { OrmService } from '../../services/orm-service';
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { MCMTermsAndConditionsModal } from "../MCMTermsAndConditionsModal/MCMTermsAndConditionsModal";


@Component({
    selector: 'mcm-route-by-code-modal',
    templateUrl:'./MCMRouteByCodeModal.html'
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMRouteByCodeModal {
    @ViewChild('input') input;

    code: string;
    showError: boolean;

    constructor(public modalCtrl: ModalController, private ormService: OrmService, private viewCtrl: ViewController) {

    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.input.setFocus();
        }, 150);
    }

    cancel() {
        this.viewCtrl.dismiss();
    }


    async addTrailOrSessionByCode() {
        let modal = this.modalCtrl.create(MCMTermsAndConditionsModal);
        this.cancel();
        modal.present();
        /*let route = await this.ormService.findRouteByCode(this.code);
        if (!route) {
            this.showError = true;
        } else {
            await this.ormService.unlockRoute(route);
            this.viewCtrl.dismiss(route);
        }*/
    }

}