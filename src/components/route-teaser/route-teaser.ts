import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
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
export class RouteTeaserComponent implements OnChanges, OnDestroy {

    @Input()
    route: Route;

    @Input()
    isOnline: boolean;

    @Output()
    downloadRoute = new EventEmitter<any>();

    @Output()
    removeRoute = new EventEmitter<any>();

    protected routeDetails: RouteInfos;
    protected currentProgress: number = 0;
    protected total: number = 0;

    protected completedRadius: number = 339.292;
    private routesUpdatedSubscription: Subscription;

    constructor( private modalsService: ModalsService,
                 private helper: Helper,
                 private routeApiService: RouteApiService) {
        this.routesUpdatedSubscription = this.routeApiService.routesUpdated.subscribe((routeCode?: string) => {
            if (this.route && (!routeCode || routeCode === this.route.code)) {
                this.updateDetails();
            }
        });
    }

    ngOnChanges() {
        this.updateDetails();
    }

    ngOnDestroy() {
        if (this.routesUpdatedSubscription) {
            this.routesUpdatedSubscription.unsubscribe();
            this.routesUpdatedSubscription = null;
        }
    }

    async updateDetails() {
        if(this.route && this.route.downloaded) {
            this.routeDetails = await this.routeApiService.getDetailsForRoute(this.route);
            this.total = await Route.getTrueTaskCount(this.routeDetails.tasks);
            if(this.routeDetails.score) {
                let data = await this.helper.calculateProgress(this.route, this.routeDetails);
                this.currentProgress = data.currentProgress;
                this.completedRadius = this.calculatePercentage();
            }
        }
    }

    calculatePercentage() {
        let c = 2 * Math.PI * 54;
        if (!this.total) {
            return c;
        }
        let completedPercentage = (1 / this.total) * this.currentProgress;
        return c * (1 - completedPercentage);
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
