import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
// import { OrmService } from '../../services/orm-service';
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

    constructor(/*private ormService: OrmService,*/ public modalCtrl: ModalController, private viewCtrl: ViewController) {

    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.input.setFocus();
        }, 150);
    }

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
        /*let route = await this.ormService.findRouteByCode(this.code);
        if (!route) {
            this.showError = true;
        } else {
            await this.ormService.unlockRoute(route);
            this.viewCtrl.dismiss(route);
        }*/
        let modal = this.modalCtrl.create(MCMTermsAndConditionsModal);
        this.cancel();
        modal.present();


    }

}