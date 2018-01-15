import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { OrmService } from '../../services/orm-service';


@Component({
    selector: 'mcm-route-by-code-modal',
    templateUrl:'./MCMRouteByCodeModal.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMRouteByCodeModal {


    code: string;
    showError: boolean;

    constructor(private ormService: OrmService, private viewCtrl: ViewController) {

    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    async addRouteByCode() {
        let route = await this.ormService.findRouteByCode(this.code);
        if (!route) {
            this.showError = true;
        } else {
            let repo = await this.ormService.getRouteRepository();
            route.unlocked = true;
            await repo.save(route);
            this.viewCtrl.dismiss(route);
        }
    }
}