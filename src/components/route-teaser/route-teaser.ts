import {EventEmitter, Component, Input, Output} from '@angular/core';
import {Route} from "../../entity/Route";
import {ModalsService} from "../../services/modals-service";
import {Helper} from "../../classes/Helper";
import {RouteApiService} from "../../services/route-api.service";
import {RouteInfos} from "../../services/ApiResponseDefinition/RouteInfos";


@Component({
    selector: 'route-teaser',
    templateUrl: 'route-teaser.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteTeaserComponent {

    @Input()
    route: Route;

    @Input()
    isOnline: boolean;

    @Output()
    downloadRoute = new EventEmitter<any>();

    @Output()
    removeRoute = new EventEmitter<any>();

    private routeDetails: RouteInfos;
    protected currentProgress: number = 0;
    protected total: number = 0;

    private completedRadius: number = 339.292;

    constructor( private modalsService: ModalsService,
                 private helper: Helper,
                 private routeApiService: RouteApiService) {
    }

    async ngOnChanges(){
        if(this.route && this.route.downloaded) {
            this.routeDetails = await this.routeApiService.getDetailsForRoute(this.route);
            this.total = await Route.getTrueTaskCount(this.routeDetails.tasks);
            if(this.route.scores) {
                let data = await this.helper.calculateProgress(this.route, this.routeDetails);
                this.currentProgress = data.currentProgress;
                this.completedRadius = this.calculatePercentage();
            }
        }
    }

    calculatePercentage(){
        let c = 2 * Math.PI * 54;
        let completedPercentage = (1/this.total) *this.currentProgress;
        return c * (1-completedPercentage);
    }

    async doDownload(event, route: Route) {
        event.stopPropagation();
        if (await this.modalsService.doDownload(route)) {
            this.downloadRoute.emit({route: route});
        }
    }

    async deleteRoute(event, route: Route) {
        event.stopPropagation();
        if (await this.routeApiService.removeDownloadedRoute(route)) {
            this.removeRoute.emit();
        }
    }
}
