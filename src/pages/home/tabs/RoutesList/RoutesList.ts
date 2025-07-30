import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Helper} from '../../../../classes/Helper';
import {Route} from '../../../../entity/Route';
import {ModalsService} from '../../../../services/modals-service';
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';
import {MCMRouteByCodeModal} from '../../../../modals/MCMRouteByCodeModal/MCMRouteByCodeModal';
import {SearchPipe} from "../../../../app/pipes/search.pipe";
import {RouteApiService} from "../../../../services/route-api.service";

@IonicPage()
@Component({
    selector: 'routes-list',
    templateUrl: 'RoutesList.html'
})
export class RoutesListPage implements OnDestroy {
    @ViewChild(Content) content: Content;
    public downloadedItems: Route[] = [];
    public filteredItems: Route[] = [];
    protected routesListSearch: string = "";

    private isOpeningRoute: boolean = false;
    private pipe: SearchPipe;

    protected filteredResult: Route[];

    protected showAllRoutes: boolean = true;

    modal: any;
    private eventSubscription: Subscription;
    /**
     * How many elements shall be loaded each time the list is scrolled to the end.
     * @type {number}
     */
    private infiniteScrollBlockSize = 20;

    constructor(
            public navCtrl: NavController,
            public modalsService: ModalsService,
            private modalCtrl: ModalController,
            private translateService: TranslateService,
            public helper: Helper,
            private navParams: NavParams,
            protected routeApiService: RouteApiService,
    ) {

        this.eventSubscription = this.routeApiService.routesUpdated.subscribe(() => {
           this.filterItems();
        });
    }

    ngOnDestroy() {
        this.eventSubscription.unsubscribe();
    }

    public getRoutesList() {
        return this.routesListSearch.length > 2 ? this.routeApiService.publicRoutes : this.filteredItems;
    }

    async ionViewWillEnter() {
        this.pipe = new SearchPipe();
        if(this.navParams.data && this.navParams.data.showAllRoutes != null) {
            this.showAllRoutes = this.navParams.data && this.navParams.data.showAllRoutes;
        }
        await this.routeApiService.fetchPublicRoutes(this.infiniteScrollBlockSize);
        this.filterItems();

        if(this.helper.getActivateAddRoute()){
            this.addRouteByCode();
            this.helper.setActivateAddRoute(false);
        }

    }

    async doRefresh(refresher) {
        let online = await this.modalsService.showNoInternetModalIfOffline();
        if (online) {
            // TODO need to refresh here
            // try {
            //     await this.dbUpdater.checkForUpdates();
            // } catch (e) {
            //     console.error('caught error while checking for updates:', e);
            // }
            // this.items = await this.ormService.getVisibleRoutes(false, null, true);
            // this.sortAndRebuildFilteredItems();
        }
        refresher.complete();
    }

    async addRouteByCode() {
        await MCMRouteByCodeModal.show(this.navCtrl, this.modalCtrl, this.translateService, this.modalsService);
    }

    fetchMoreRoutes(infiniteScroll) {
        this.routeApiService.fetchPublicRoutes(this.infiniteScrollBlockSize).then(() => {
           infiniteScroll.complete();
        });
    }

    async switchToMap() {
        this.navCtrl.setRoot('RoutesMapPage', {showAllRoutes: this.showAllRoutes});
    }

    async updateRoutes() {
        this.downloadedItems = await this.routeApiService.downloadedRoutes;
    }

    showRouteDetail(item: any) {
        if(!this.isOpeningRoute){
            this.isOpeningRoute = true;
            this.modalsService.showRoute(item, this.navCtrl).then(async () => {
                this.isOpeningRoute = false;
                await this.updateRoutes();
            })
        }

    }

    filterItems(){
        let value;
        if(this.showAllRoutes) value = this.routeApiService.publicRoutes;
        else value = this.routeApiService.downloadedRoutes;
        this.filteredResult = this.pipe.transform(value, 'title,city,code', this.routesListSearch)
    }
}
