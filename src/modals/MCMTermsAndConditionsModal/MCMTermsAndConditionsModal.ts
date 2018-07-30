import { Component, ViewChild } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { OrmService } from '../../services/orm-service';


@Component({
    selector: 'mcm-terms-and-conditions-modal',
    templateUrl:'./MCMTermsAndConditionsModal.html'
})
export class MCMTermsAndConditionsModal {
    @ViewChild('input') input;

    //tacCheckbox: boolean;
    showError: boolean;

    constructor(private ormService: OrmService, private viewCtrl: ViewController) {

    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.input.setFocus();
        }, 150);
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    // async addRouteByCode() {
    //     let route = await this.ormService.findRouteByCode(this.tacCode);
    //     if (!route) {
    //         this.showError = true;
    //     } else {
    //         await this.ormService.unlockRoute(route);
    //         this.viewCtrl.dismiss(route);
    //     }
    // }
}