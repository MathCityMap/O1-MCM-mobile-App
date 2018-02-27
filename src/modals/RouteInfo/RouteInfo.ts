import { Component } from '@angular/core';
import { AlertController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { OrmService } from '../../services/orm-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalsService } from '../../services/modals-service';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from "ionic-angular/navigation/nav-controller";


@Component({
    selector: 'route-info',
    templateUrl: 'RouteInfo.html',
})
export class RouteInfo {
    private route: Route;


    private totalTasks: number;
    private currentProgress = 0;


    constructor(public navParams: NavParams,
                private ormService: OrmService,
                private viewCtrl: ViewController,
                public alertCtrl: AlertController,
                public navCtrl: NavController,
                public translateService: TranslateService) {
    }

    async ionViewWillEnter() {
        let routeId = this.navParams.get('routeId');
        this.route = this.viewCtrl.data.route = await this.ormService.findRouteById(routeId);
        this.totalTasks = (await this.route.getTasks()).length;
        let score = this.route.getScoreForUser(await this.ormService.getActiveUser());
        this.currentProgress = score.getTasksSolved().length + score.getTasksSolvedLow().length + score.getTasksFailed().length;
        console.log(this.currentProgress);
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

    async removeRoute(route: Route) {
        await this.ormService.removeDownloadedRoute(this.route);
    }
}
