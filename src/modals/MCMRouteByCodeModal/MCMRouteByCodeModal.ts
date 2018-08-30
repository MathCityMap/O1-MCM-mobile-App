import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { MCMTermsAndConditionsModal } from "../MCMTermsAndConditionsModal/MCMTermsAndConditionsModal";
import { SessionService } from '../../app/api/services/session.service';
import { OrmService } from '../../services/orm-service';
import { Modal, NavController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { TranslateService } from '@ngx-translate/core';
import { ModalsService } from '../../services/modals-service';



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
    navCtrl: NavController

    constructor(private ormService: OrmService, public modalCtrl: ModalController, private viewCtrl: ViewController,
                private sessionService: SessionService, private navParams: NavParams) {
        this.navCtrl = navParams.data.navCtrl;
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
        if(this.code.length <= 5 && this.code.length >= 4) {
            return this.codeInput = true;
        } else {
            return this.codeInput = false;
        }
    }

    async addTrailOrSessionByCode() {
        let route = await this.ormService.findRouteByCode(this.code);
        if (!route) {
            let session;
            try {
                session = await this.sessionService.getSessionByCode(this.code).toPromise();
            } catch (e) {
            }
            if (session) {
                let modal = this.modalCtrl.create(MCMTermsAndConditionsModal, {
                    session: session,
                    navCtrl: this.navCtrl
                });
                this.cancel();
                modal.present();
            } else {
                this.showError = true;
            }
        } else {
            await this.ormService.unlockRoute(route);
            this.viewCtrl.dismiss(route);
        }
    }

    public static async show(navCtrl: NavController, modalCtrl: ModalController,
                                          translateService: TranslateService, modalsService: ModalsService): Promise<Route> {
        return new Promise<Route>((success) => {
            let modal = modalCtrl.create(MCMRouteByCodeModal, {navCtrl: navCtrl});
            modal.onDidDismiss(function (route: Route) {
                if (route) {
                    modalsService.showDialog(null, translateService.instant('a_private_route_added', {'T': route.title}));
                }
                success(route);
            });
            modal.present();
        });
    }

}