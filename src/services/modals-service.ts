import {NavController, ModalController} from "ionic-angular";
import {OrmService} from './orm-service';
import {DeepLinker} from "ionic-angular/navigation/deep-linker";
import {Route} from '../entity/Route';
import {Score} from "../entity/Score";
import {MCMDownloadProgressPopupComponent} from '../components/mcm-download-progress-popup/mcm-download-progress-popup.component';
import {RouteInfo} from '../modals/RouteInfo/RouteInfo';
import {Injectable} from '@angular/core';

import {Task} from '../entity/Task';
import {CenteredTask} from '../modals/CenteredTask/CenteredTask';
import {AlertController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {TaskMapState} from "../pages/home/tabs/TasksMap/TasksMap";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {ConnectionQuality, Helper} from '../classes/Helper';
import {DB_Updater} from "../classes/DB_Updater";


@Injectable()
export class ModalsService {

    constructor(public modalCtrl: ModalController,
                public ormService: OrmService,
                public alertCtrl: AlertController,
                public deepLinker: DeepLinker,
                public translateService: TranslateService,
                private spinner: SpinnerDialog,
                private dbUpdater: DB_Updater,
                private helper: Helper) {
    }

    async doDownload(route: Route): Promise<boolean> {
        if (!await this.showNoInternetModalIfOffline()) {
            return;
        }
        console.log(`doDownload ${JSON.stringify(route.id)}`);

        let cancelHasBeenClicked = false;
        let data: any = {
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

            if (data.updateView) {
                data.updateView();
            }
            // make sure that updated values are bound to DOM
            return cancelHasBeenClicked;
        }, this.dbUpdater);
        downloadModal.dismiss();
        return !cancelHasBeenClicked;
    }

    async showRoute(route: Route, navCtrl: NavController, startRoute: boolean = false, selectedTask: Task = null) {
        if (route.downloaded) {
            // 15.05.18 - Perform dataset refresh of related tasks of the route if online
            await this.dbUpdater.updateRouteTasksData(route, this.translateService.instant("a_language_code"))
            if(startRoute){
                this.navigateToRoute(route, navCtrl, null);
                return;
            }

        }
        await this.presentRouteInfoModal(route, navCtrl);
    }

    async showDialog(titleKey: string, messageKey: string,
                     button1Key?: string, button1Handler?: () => void,
                     button2Key?: string, button2Handler?: () => void,
                     narrative: string = 'default') {
        button1Key = button1Key || 'a_g_ok';
        let buttons = [{
            text: this.translateService.instant(button1Key),
            handler: button1Handler
        }];
        if (button2Key && button2Handler) {
            buttons.push({
                text: this.translateService.instant(button2Key),
                handler: button2Handler
            })
        }
        let confirm = this.alertCtrl.create({
            title: titleKey ? this.translateService.instant(titleKey) : null,
            message: messageKey ? this.translateService.instant(messageKey) : null,
            buttons: buttons,
            cssClass: narrative
        });
        confirm.present();
        return confirm;
    }

    showYesNoDialog(titleKey: string, messageKey: string,
                    yesKey?: string,
                    noKey?: string): Promise<boolean> {
        yesKey = yesKey || 'yes';
        noKey = noKey || 'no';
        return new Promise<boolean>((resolve, reject) => {
            this.showDialog(titleKey, messageKey, yesKey, () => resolve(true), noKey, () => resolve(false));
        });
    }

    private navigateToRoute(route: Route, navCtrl: NavController, selectedTask: Task = null): void {
        this.spinner.show(null, null, false);
        setTimeout(() => {
            if (navCtrl.parent && navCtrl.parent.parent) {
                navCtrl.parent.parent.push('TasksMap', {
                    routeId: route.id,
                    headerTitle: route.title,
                    selectedTask: selectedTask
                }, {}, () => {
                    // necessary because of bug which does not update URL
                    this.deepLinker.navChange('forward');
                });
            } else if (navCtrl.parent == null) {
                navCtrl.push('TasksMap', {
                    routeId: route.id,
                    headerTitle: route.title,
                    selectedTask: selectedTask
                }, {}, () => {
                    // necessary because of bug which does not update URL
                    this.deepLinker.navChange('forward');
                });
            }
        }, 10);
    }

    presentRouteInfoModal(route: Route, navCtrl: NavController): Promise<Route> {
        let self = this;
        return new Promise(success => {
            //Passing navCtrl to prevent issues of dismissing 2 modals and having no navCtrl to use for showRoute.
            let data = {
                routeId: route.id,
                modalsService: this,
                route: null
            };
            let routeInfoModal = this.modalCtrl.create(RouteInfo, data);
            routeInfoModal.onDidDismiss(result => {
                if (result && result.showRoute) {
                    self.showRoute(result.route, navCtrl, true);
                    success(result.route);
                } else {
                    // route is set by RouteInfo
                    success(data.route);
                }
            });
            routeInfoModal.present();
        });
    }

    async presentTaskListModal(route: Route, score: Score, state: TaskMapState, narrative: string = 'default', navCtrl: NavController, callback: any) {
        let testModal = this.modalCtrl.create(CenteredTask, {
            route: route,
            score: score,
            state: state,
            tasks: await route.getTasks(),
            modalsService: this
        }, {cssClass: narrative});
        testModal.onDidDismiss(data => {
            /* coming from List/Map View */
            if (data && data.route != null && navCtrl != null && !callback) this.navigateToRoute(data.route, navCtrl, data.selectedTask);
            /* already on taskMap */
            else if (data && data.selectedTask != null && navCtrl != null && callback) callback(data.selectedTask);
            /*          else if(data && data.route != null && navCtrl != null && fromTaskMap) console.log('You wanna see the marker now?'); */
        });
        testModal.present();
        return testModal;
    }

    async showNoInternetModalIfOffline(): Promise<boolean> {
        if (this.helper.isOnline) {
            let quality = await this.helper.checkConnection();
            if (quality == ConnectionQuality.FAST) {
                return true;
            } else {
                return await this.showYesNoDialog('a_slow_connection_title',
                    'a_slow_connection', 'a_alert_continue', 'a_alert_cancel');
            }
        } else {
            await this.showDialog(null, 'a_toast_need_internet_for_update');
            return false;
        }
    }

}

