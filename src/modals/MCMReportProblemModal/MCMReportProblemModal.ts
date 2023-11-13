import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { MCMTermsAndConditionsModal } from "../MCMTermsAndConditionsModal/MCMTermsAndConditionsModal";
import { SessionService } from '../../app/api/services/session.service';
import { OrmService } from '../../services/orm-service';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { TranslateService } from '@ngx-translate/core';
import { ModalsService } from '../../services/modals-service';



@Component({
    selector: 'mcm-route-by-code-modal',
    templateUrl:'./MCMReportProblemModal.html'
})
export class MCMReportProblemModal {
    @ViewChild('input') input;

    code: string = '';
    codeInput: boolean = false;
    showError: boolean;
    navCtrl: NavController;

    constructor(private ormService: OrmService, public modalCtrl: ModalController, private viewCtrl: ViewController,
                private sessionService: SessionService, private navParams: NavParams) {
        this.navCtrl = navParams.data.navCtrl;
    }

    ionViewDidEnter() {
    }

     cancel() {
        this.viewCtrl.dismiss();
    }
}
