import { Component } from '@angular/core';
import { AlertController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { OrmService } from '../../services/orm-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalsService } from '../../services/modals-service';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from "ionic-angular/navigation/nav-controller";
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {TranslationService} from "../../app/api/services/translation.service";
import {TrailTranslation} from "../../app/api/models/trail-translation";

declare var MathJax;


@Component({
    selector: 'route-info',
    templateUrl: 'RouteInfo.html',
})
export class RouteInfo {
    protected route: Route;


    protected totalTasks: number;
    private currentProgress = 0;

    protected translation: TrailTranslation;
    protected translationFetched: boolean;
    protected translatePage: boolean = false;


    constructor(public navParams: NavParams,
                private ormService: OrmService,
                private viewCtrl: ViewController,
                public alertCtrl: AlertController,
                public navCtrl: NavController,
                public translateService: TranslateService,
                private spinnerDialog: SpinnerDialog,
                protected translationService: TranslationService) {
    }

    async ionViewWillEnter() {
        let routeId = this.navParams.get('routeId');
        this.route = this.viewCtrl.data.route = await this.ormService.findRouteById(routeId);
        //Fetch tasks in Route so Tools of tasks can be shown properly
        await this.route.getTasks();
        this.totalTasks = await this.route.getTaskCount();
        let score = this.route.getScoreForUser(await this.ormService.getActiveUser());
        this.currentProgress = score.getTasksSolved().length + score.getTasksSolvedLow().length + score.getTasksFailed().length;
        MathJax.typeset();
        let {translation, isFetched} = await this.translationService.getTranslationForRoute(this.route.code);
        this.translation = translation;
        this.translationFetched = isFetched;
    }

    async doDownload(route: Route) {
        // retrieve modalsService via viewCtrl.data to avoid circular dependency
        let modalsService: ModalsService = this.viewCtrl.data.modalsService;
        modalsService.doDownload(route);
    }

    showRoute(route: Route) {
        if (route.downloaded) {
            this.viewCtrl.dismiss({showRoute: true, route: route});
        }
    }

    async removeRoute() {
        this.spinnerDialog.show();
        await this.ormService.removeDownloadedRoute(this.route, true);
        this.spinnerDialog.hide();
    }

    displayRemoveTrailModal() {
        const modalsService: ModalsService = this.viewCtrl.data.modalsService;
        modalsService.showDialog('a_route_info_modal_removeRoute', 'a_route_info_modal_removeRoute_msg',
            'no', () => {},
            'yes', async () => {
                await this.removeRoute();
            });
    }

    async toggleTranslation() {
        if (!this.translation) {
            let {translation, isFetched} = await this.translationService.getTranslationForRoute(this.route.code, true);
            this.translation = translation;
            this.translationFetched = isFetched;
        }
        this.translatePage = this.translation && !this.translatePage;
    }
}
