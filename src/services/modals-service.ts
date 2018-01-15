import { NavController } from "ionic-angular/navigation/nav-controller";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { OrmService } from './orm-service';
import { DeepLinker } from "ionic-angular/navigation/deep-linker";
import { Route } from '../entity/Route';
import { MCMDownloadProgressPopupComponent } from '../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import { RouteInfo } from '../modals/RouteInfo/RouteInfo';
import { Injectable } from '@angular/core';

import { Task } from '../entity/Task';

@Injectable()
export class ModalsService {

    constructor(
        public modalCtrl: ModalController,
        public ormService: OrmService,
        public deepLinker: DeepLinker) { }

    async doDownload(route: Route) {
        console.log(`doDownload ${JSON.stringify(route.id)}`);

        let cancelHasBeenClicked = false;
        let data = {
          total: 0,
          currentProgress: 0,
          cancelCallback: () => {
            console.log("cancel has been clicked");
            cancelHasBeenClicked = true;
          }
        };
        let downloadModal = this.modalCtrl.create(MCMDownloadProgressPopupComponent, data, {showBackdrop: true, enableBackdropDismiss: false});
        downloadModal.present();
        await this.ormService.downloadRoute(route, function (doneDownload, totalDownload) {
          data.total = totalDownload;
          data.currentProgress = doneDownload;
          return cancelHasBeenClicked;
        });
        downloadModal.dismiss();
    }

    showRoute(route: Route, navCtrl: NavController, selectedTask: Task): void {
        if(route.downloaded){
            navCtrl.parent.parent.push('TasksMap', {routeId: route.id, headerTitle: route.title, selectedTask: selectedTask}, {}, () => {
              // necessary because of bug which does not update URL
              this.deepLinker.navChange('forward');
            });
        }else{
            this.presentRouteInfoModal(route, navCtrl);
        }
      }

    presentRouteInfoModal(route: Route, navCtrl: NavController): void {
        let self = this;
        let routeInfoModal = this.modalCtrl.create(RouteInfo, {routeId: route.id, modalsService: this});
        routeInfoModal.onDidDismiss(data => {
          if(data.showRoute){
            self.showRoute(data.route, navCtrl, data.selectedTask);
          }
        })
        routeInfoModal.present();
    }
}