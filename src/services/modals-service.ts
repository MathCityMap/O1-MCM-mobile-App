import { NavController } from "ionic-angular/navigation/nav-controller";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { OrmService } from './orm-service';
import { DeepLinker } from "ionic-angular/navigation/deep-linker";
import { Route } from '../entity/Route';
import { MCMDownloadProgressPopupComponent } from '../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import { RouteInfo } from '../modals/RouteInfo/RouteInfo';
import { Injectable } from '@angular/core';
import { MCMRouteByCodeModal } from '../modals/MCMRouteByCodeModal/MCMRouteByCodeModal';

import { Task } from '../entity/Task';
import { CenteredTask } from '../modals/CenteredTask/CenteredTask';
import { AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ModalsService {

    constructor(public modalCtrl: ModalController,
                public ormService: OrmService,
                public alertCtrl: AlertController,
                public deepLinker: DeepLinker,
                public translateService: TranslateService) {
    }

    async doDownload(route: Route) {
        console.log(`doDownload ${JSON.stringify(route.id)}`);

        let cancelHasBeenClicked = false;
        let data = {
            total: 0,
            currentProgress: 0,
            cancelCallback: () => {
                console.log("cancel has been clicked");
                cancelHasBeenClicked = true;
            },
            titleKey: 'a_rdl_title_map'
        };
        let downloadModal = this.modalCtrl.create(MCMDownloadProgressPopupComponent, data, {
            showBackdrop: true,
            enableBackdropDismiss: false
        });
        downloadModal.present();
        await this.ormService.downloadRoute(route, function (doneDownload, totalDownload, titleKey) {
            data.total = totalDownload;
            data.currentProgress = doneDownload;
            if (titleKey) {
                data.titleKey = titleKey;
            }
            return cancelHasBeenClicked;
        });
        downloadModal.dismiss();
    }

    showRoute(route: Route, navCtrl: NavController, selectedTask: Task = null): void {
        if (route.downloaded) {
            let confirm = this.alertCtrl.create({
                title: this.translateService.instant('a_guided_trail_title'),
                message: this.translateService.instant('a_guided_trail'),
                buttons: [
                    {
                        text: this.translateService.instant('no'),
                        handler: () => {
                            this.navigateToRoute(route, navCtrl, null);
                        }
                    },
                    {
                        text: this.translateService.instant('yes'),
                        handler: () => {
                            this.presentTaskListModal(route, navCtrl);
                        }
                    }
                ]
            });
            confirm.present();
        } else {
            this.presentRouteInfoModal(route, navCtrl);
        }
    }

    private navigateToRoute(route: Route, navCtrl: NavController, selectedTask: Task = null): void {
        navCtrl.parent.parent.push('TasksMap', {
            routeId: route.id,
            headerTitle: route.title,
            selectedTask: selectedTask
        }, {}, () => {
            // necessary because of bug which does not update URL
            this.deepLinker.navChange('forward');
        });
    }

    presentRouteInfoModal(route: Route, navCtrl: NavController): void {
        let self = this;
        //Passing navCtrl to prevent issues of dismissing 2 modals and having no navCtrl to use for showRoute.
        let routeInfoModal = this.modalCtrl.create(RouteInfo, {
            routeId: route.id,
            modalsService: this
        });
        routeInfoModal.onDidDismiss(data => {
            if (data.showRoute) {
                //will probably never showRoute;
                self.showRoute(route, navCtrl);
            }
        })
        routeInfoModal.present();
    }

    showAddRouteByCodeModal(): Promise<Route> {
        return new Promise<Route>((success) => {
            let modal = this.modalCtrl.create(MCMRouteByCodeModal);
            modal.onDidDismiss(success);
            modal.present();
        });
    }

    presentTaskListModal(route: Route, navCtrl: NavController): void {
        let self = this;
        let testModal = this.modalCtrl.create(CenteredTask, {
            route: route,
            tasks: route.tasks,
            modalsService: this
        });
        testModal.onDidDismiss(data => {
            if (data.route != null && navCtrl != null) this.navigateToRoute(data.route, navCtrl, data.selectedTask);
        })
        testModal.present();
    }
}
