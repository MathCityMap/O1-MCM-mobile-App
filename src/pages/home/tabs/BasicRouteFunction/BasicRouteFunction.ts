import { NavController } from "ionic-angular/navigation/nav-controller";
import { Platform } from "ionic-angular/platform/platform";
import { DB_Updater } from "../../../../classes/DB_Updater";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { OrmService } from "../../../../services/orm-service";
import { DeepLinker } from "ionic-angular/navigation/deep-linker";
import { BroadcastService } from "../../../../services/broadcast-service";
import { Route } from "../../../../entity/Route";
import { MCMProgressBarPopupComponent } from "../../../../components/mcm-progress-bar-popup/mcm-progress-bar-popup.component";
import { RouteInfo } from "../../../../modals/RouteInfo/RouteInfo";

export class BasicRouteFunction{
    doneDownload: number;
    totalDownload: number;
    isDownloading: boolean = false;

    constructor(
        public modalCtrl: ModalController,
        public ormService: OrmService,
        public broadcastService: BroadcastService,
        public navCtrl: NavController,
        public deepLinker: DeepLinker) { }

    async doDownload(route: Route) {
        console.log(`doDownload ${JSON.stringify(route.id)}`);

        // uncommend this line to switch displaying route (online only mode)
        this.isDownloading = true;

        this.totalDownload = 0;
        this.doneDownload = 0;
        let downloadModal = this.modalCtrl.create(MCMProgressBarPopupComponent,  {total: this.totalDownload, done: this.doneDownload}, {showBackdrop: true, enableBackdropDismiss: false});
        downloadModal.present();
        const self = this;
        await this.ormService.downloadRoute(route, function (doneDownload, totalDownload) {
            self.broadcastService.downloadProgressChanged(totalDownload, doneDownload);
            self.doneDownload = doneDownload;
            self.totalDownload = totalDownload;
        });
        this.isDownloading = false;
        downloadModal.dismiss();
    }

    showRoute(routeId: number, routeTitle: string): void {
        this.navCtrl.parent.parent.push('TasksMap', {routeId: routeId, routeTitle: routeTitle}, {}, () => {
          // necessary because of bug which does not update URL
          this.deepLinker.navChange('forward');
        });
      }

    presentRouteInfoModal(route: Route): void {
        let self = this;
        let routeInfoModal = this.modalCtrl.create(RouteInfo, {route: route});
        routeInfoModal.onDidDismiss(data => {
          if(data.showRoute){
            self.showRoute(data.routeId, data.routeTitle);
          }
        })
        routeInfoModal.present();
    }
}