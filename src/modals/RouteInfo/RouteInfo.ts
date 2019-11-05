import { Component } from '@angular/core';
import { AlertController, NavParams } from 'ionic-angular';
import { Route } from '../../entity/Route';
import { OrmService } from '../../services/orm-service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { ModalsService } from '../../services/modals-service';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from "ionic-angular/navigation/nav-controller";
import {SocialSharing} from "@ionic-native/social-sharing";
import {Helper} from "../../classes/Helper";


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
                public helper: Helper,
                public navCtrl: NavController,
                public translateService: TranslateService,
                private social: SocialSharing) {
    }

    async ionViewWillEnter() {
        let routeId = this.navParams.get('routeId');
        this.route = this.viewCtrl.data.route = await this.ormService.findRouteById(routeId);
        this.totalTasks = await this.route.getTaskCount();
        let score = this.route.getScoreForUser(await this.ormService.getActiveUser());
        this.currentProgress = score.getTasksSolved().length + score.getTasksSolvedLow().length + score.getTasksFailed().length;
        eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
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
        await this.ormService.removeDownloadedRoute(this.route);
    }

    async share(){
        let url = `https://dev.mathcitymap.eu/${this.route.id}`;
        const options = {
            message: 'this is a test message for the route' + this.route.title,
            url: url
        };
        this.social.shareWithOptions(options);
    }
}
