import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../env/env";
import {map} from "rxjs/operators/map";
import {Route} from "../entity/Route";
import {Helper} from "../classes/Helper";
import {RouteListApiResponse} from "./ApiResponseDefinition/RouteListApiResponse";
import {GpsService} from "./gps-service";
import {Storage} from "@ionic/storage";
import {RouteDetailApiResponse} from "./ApiResponseDefinition/RouteDetailApiResponse";
import {Task} from "../entity/Task";
import {Score} from "../entity/Score";
import {CacheManagerMCM} from "../classes/CacheManagerMCM";
import {ImagesService} from "./images-service";
import {AlertController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {TranslationService} from "../app/api/services/translation.service";
import {RouteInfos} from "./ApiResponseDefinition/RouteInfos";
import {TaskState} from "../entity/TaskState";
import {RouteApiResponse} from "./ApiResponseDefinition/RouteApiResponse";
import {OrmService} from "./orm-service";
import {s3MediaType} from "./ApiResponseDefinition/s3Media";

const DOWNLOADED_ROUTES_KEY = "MCM_ROUTES_DOWNLOADED"
const DOWNLOADED_ROUTE_INFOS_PREFIX = "MCM_DOWNLOADED_ROUTE_INFOS_"

@Injectable()
export class RouteApiService {

    totalRoutes: number;
    nextOffset: number = 0;
    position: {latitude: number, longitude: number};
    routesUpdated: EventEmitter<void> = new EventEmitter();
    private searchTerm: string = "";
    private _publicRoutes: Route[] = [];
    private _downloadedRoutes: Route[];
    //Holds routes which have been added using code during this session in memory to enable showing their information
    private _unlockedRoutes: Route[] = [];

    get publicRoutes() {
        return this._publicRoutes;
    }

    get downloadedRoutes() {
        return this._downloadedRoutes;
    }

    constructor(
        private http: HttpClient,
        private gpsService: GpsService,
        private storage: Storage,
        private imagesService: ImagesService,
        private alertCtrl: AlertController,
        private translateService: TranslateService,
        private translationService: TranslationService,
        private ormService: OrmService
    ) {
    }

    async fetchPublicRoutes(count = 20) {
        if (this.nextOffset === this.totalRoutes) {
            return;
        }
        if (!this.position) {
            let lastPosition: {coords: {latitude: number, longitude: number}} = this.gpsService.getLastPosition();
            if (!lastPosition) {
                lastPosition = await this.gpsService.getCurrentPosition();
                if (!lastPosition) {
                    console.debug('Could not determine position, using Frankfurt am Main as fallback');
                    lastPosition = {coords: {longitude: 8.684708439135116, latitude: 50.11099446102349}}
                }
            }
            this.position = lastPosition.coords;
        }
        let newRoutes = [];
        try {
            newRoutes = await this.internalfetchRoutesForPosition(this.position.latitude, this.position.longitude, this.nextOffset, count);
        } catch (e) {
            console.error("Fetching routes failed");

        }
        this.nextOffset += newRoutes.length;
        this._publicRoutes.push(...newRoutes);
        this.routesUpdated.emit();
    }

    updateSearchTerm(term: string) {
        this.reset();
        this.searchTerm = term;
    }

    reset() {
        this.position = undefined;
        this._publicRoutes = [];
        this.nextOffset = 0;
        this.searchTerm = "";
    }

    async getDownloadedRoutes(): Promise<Array<Route>> {
        if (this._downloadedRoutes) {
            return this._downloadedRoutes;
        }
        let routes = await this.storage.get(DOWNLOADED_ROUTES_KEY);
        if (routes) {
            routes = Route.convertGenericsToRouteArray(routes);
            this._downloadedRoutes = routes;
            return routes;
        }
        return [];
    }

    async findRouteByCode(code: string): Promise<Route> {
        let downloaded = await this.getDownloadedRoutes();
        let route = downloaded.find(dRoute => dRoute.code === code);
        if (!route) {
            route = this._publicRoutes.find(pRoute => pRoute.code === code);
            if (!route) {
                route = this._unlockedRoutes.find(uRoute => uRoute.code === code);
                if (!route) {
                    try {
                        route = await this.http.get<RouteApiResponse>(`${API_URL}/app/v1/trails/${code}/unlock`, {headers: Helper.getApiRequestHeaders()}).pipe(
                            map(response => {
                                return Route.fromRouteResponse(response);
                            })
                        ).toPromise();
                    } catch (e) {
                        console.warn("No Route found for Code: ", code);
                        route = undefined;
                    }
                }
            }
        }
        return route;
    }

    unlockRoute(route: Route) {
        let index = this._unlockedRoutes.findIndex(uRoute => uRoute.id === route.id);
        if (index === -1) {
            this._unlockedRoutes.push(route);
        }
    }

    async getRouteFromId(id: number): Promise<Route|undefined> {
        let downloaded = await this.getDownloadedRoutes();
        let route = downloaded.find(dRoute => dRoute.id === id);
        if (!route) {
            route = this._publicRoutes.find(pRoute => pRoute.id === id);
            if (!route) {
                route = this._unlockedRoutes.find(uRoute => uRoute.id === id);
            }
        }
        return route;
    }

    async getDetailsForRoute(route: Route): Promise<RouteInfos> {
        let details: RouteInfos = await this.storage.get(DOWNLOADED_ROUTE_INFOS_PREFIX+route.code);
        if (!details) {
            return {tasks: [], score: new Score()};
        }
        return {tasks: Task.convertGenericsToTaskArray(details.tasks), score: Score.fromGenericScore(details.score)};
    }

    async getTaskDetails(routeCode: string, taskId: number, parentId?: number): Promise<{task: Task, score: Score}> {
        let details: RouteInfos = await this.storage.get(DOWNLOADED_ROUTE_INFOS_PREFIX+routeCode);
        let parent;
        if (parentId) {
            parent = details.tasks.find(dTask => dTask.id === parentId);
        }
        let task = (parent ? parent.subtasks : details.tasks).find(dTask => dTask.id === taskId);
        return {task: Task.fromGenericTask(task), score: Score.fromGenericScore(details.score)};
    }

    async downloadRoute(route: Route, statusCallback: (done: number, total: number, title?: string) => boolean) {
        let alreadyDownloadedUrls = [];

        try {
            let tasks = await this.internalFetchDetailsForRoute(route.code);
            let routeInfo = {tasks: tasks, score: new Score()}
            await this.storage.set(DOWNLOADED_ROUTE_INFOS_PREFIX + route.code, routeInfo);

            if (!route.isNarrativeEnabled()) {
                if (route.isMapAvailableOffline()) {
                    statusCallback(0, 100, 'a_rdl_title_map');
                    try {
                        await this.imagesService.downloadAndUnzip(route, (done) => {
                                return statusCallback(done, 100);
                            },
                            (tile) => {
                                alreadyDownloadedUrls.push(tile);
                            })
                    } catch (e) {
                        console.debug('Map download failed', e);
                        route.isOffline = false;
                    }
                }
            } else {
                let zoomLevels = Helper.calculateZoom(route.getViewBoundingBoxLatLng());
                await CacheManagerMCM.downloadTiles(route, zoomLevels.min_zoom, zoomLevels.max_zoom, (done, total, url) => {
                    alreadyDownloadedUrls.push(url);
                    return statusCallback(done, total);
                });
            }
            let downloadImages = this.getDownloadImagesForTasks(tasks);
            statusCallback(0, downloadImages.length, 'a_rdl_title_img');
            await this.imagesService.downloadURLs(downloadImages, false, (done, total, url) => {
                alreadyDownloadedUrls.push(url);
                return statusCallback(done, total);
            });
            await this.addRouteToDownloadedList(route)
        } catch (e) {
            if (e.message) {
                console.debug(e.message);
            }
            if(e.http_status && e.http_status === 404){
                const alert = this.alertCtrl.create({
                    title: this.translateService.instant("a_missing_map_data_error_msg"),
                    buttons: [{
                        text:  this.translateService.instant("a_g_ok"),
                        role: 'cancel'
                    }]
                });
                alert.present();
                let postparams = "&route_id=" + route.id;
                Helper.INSTANCE.invokeApi('downloadTrailFailed', postparams)
            }
            await this.imagesService.removeDownloadedURLs(alreadyDownloadedUrls, false);
        }
    }

    async removeDownloadedData() {
        let routes = await this.getDownloadedRoutes();
        for (let route of routes) {
            await this.removeDownloadedRoute(route);
        }
    }

    async removeDownloadedRoute(route: Route) {
        // Reset route before removing
        if (route.isMapAvailableOffline()) {
            await this.imagesService.removeDownloadedURLs(this.getTileURLs(route), false);
        }

        let routeInfos: RouteInfos = await this.getDetailsForRoute(route);

        if (routeInfos) {
            this.imagesService.removeDownloadedURLs(this.getDownloadImagesForTasks(routeInfos.tasks), false);
        }

        let state = await this.storage.get("savedMapStateByRoute");
        if (state && state[route.id]) {
            delete state[route.id];
        }
        this.storage.set("savedMapStateByRoute", state);
        this.translationService.removeTaskTranslations(route.code);

        this.removeRouteFromDownloadedList(route);
        return route;
    }

    private async addRouteToDownloadedList(route: Route) {
        route.downloaded = true;
        route.downloadedDate = new Date().toDateString().split(' ').slice(1).join(' ');

        let downloadedRoutes = await this.getDownloadedRoutes();
        downloadedRoutes.push(route);
        this._downloadedRoutes = downloadedRoutes;
        await this.storage.set(DOWNLOADED_ROUTES_KEY, downloadedRoutes);
        this.updateRouteInPublicList(route);
    }

    public async updateDownloadedRoute(route: Route) {
        let downloadedRoutes = await this.getDownloadedRoutes();
        let indexToPatch = downloadedRoutes.findIndex(dRoute => dRoute.id === route.id);
        if (indexToPatch !== -1) {
            downloadedRoutes[indexToPatch] = route;
        }
        await this.storage.set(DOWNLOADED_ROUTES_KEY, downloadedRoutes);
    }

    public async resetScoreForRoute(routeCode: string) {
        return this.updateScoreForRoute(new Score(), routeCode);
    }

    public async updateScoreForRoute(score: Score, routeCode: string) {
        let stats: RouteInfos = await this.storage.get(DOWNLOADED_ROUTE_INFOS_PREFIX+routeCode);
        stats.score = score;
        await this.storage.set(DOWNLOADED_ROUTE_INFOS_PREFIX+routeCode, stats);
        return Score.fromGenericScore(stats.score);
    }

    async insertOrUpdateTaskState(score: Score, detailsToSave: TaskState, routeCode: string) {
        score.addTaskStateForTask(score.getTaskState(), detailsToSave);
        return this.updateScoreForRoute(score, routeCode);
    }

    private async removeRouteFromDownloadedList(route: Route) {
        route.downloaded = null;
        route.downloadedDate = null;
        route.completed = null;
        route.completedDate = null;
        this.storage.remove(DOWNLOADED_ROUTE_INFOS_PREFIX+route.code);

        let downloadedRoutes = await this.getDownloadedRoutes();
        downloadedRoutes = downloadedRoutes.filter(dRoute => dRoute.id !== route.id);
        this._downloadedRoutes = downloadedRoutes;
        await this.storage.set(DOWNLOADED_ROUTES_KEY, downloadedRoutes);
        this.updateRouteInPublicList(route);
    }

    private getDownloadImagesForTasks(tasks: Task[]) {
        let result = [];
        tasks.map(task => task.getImagesForDownload()).map(images => {
            result = result.concat(images);
        });
        return result;
    }

    private getTileURLs(route: Route) {
        let zoomLevels = Helper.calculateZoom(route.getViewBoundingBoxLatLng());
        return CacheManagerMCM.getTileURLs(route, zoomLevels.min_zoom, zoomLevels.max_zoom);
    }

    getTileURLsAsObject(route: Route) {
        let tiles = this.getTileURLs(route);
        let result = {};
        for (let tile of tiles) {
            result[tile] = true;
        }
        return result;
    }

    private async internalfetchRoutesForPosition(lat: number, lon: number, offset = 0, limit = 20): Promise<Route[]> {
        const downloadedRoutes = await this.getDownloadedRoutes();
        return this.http.get<RouteListApiResponse>(`${API_URL}/app/v1/trails?offset=${offset}&limit=${limit}&lat=${lat}&lon=${lon}&searchTerm=${this.searchTerm}`, {headers: Helper.getApiRequestHeaders()}).pipe(
            map(value => {
                this.totalRoutes = value.total;
                return value.items.map(routeResponse => {
                    let downloadedRoute = downloadedRoutes.find(dRoute => routeResponse._id === dRoute.id);
                    if (downloadedRoute) {
                        return downloadedRoute;
                    }
                    return Route.fromRouteResponse(routeResponse);
                })
            })
        ).toPromise();
    }

    private async internalFetchDetailsForRoute(code: string): Promise<Array<Task>> {
        const body = {
            "userId": "0",
            "langCode": "de",
            "isUpdate": false
        }
        return this.http.post<RouteDetailApiResponse>(`${API_URL}/app/v1/trails/${code}`, body, {headers: Helper.getApiRequestHeaders()}).pipe(
            map(value => {
                return Task.createTaskListFromRouteDetailResponse(value);
            })
        ).toPromise();
    }

    private updateRouteInPublicList(routeToUpdate: Route) {
        if (this._publicRoutes) {
            let index = this._publicRoutes.findIndex((route) => route.id === routeToUpdate.id);
            if (index) {
                this._publicRoutes[index] = routeToUpdate;
            }
        }
        this.routesUpdated.emit();
    }

    public async migrateDataFromSQLiteStorage() {
        let key = 'MCM_DidMigrateFromSqLiteStorage'
        let didMigrate = await this.storage.get(key);
        if (didMigrate) return;

        let routes = await this.ormService.getDownloadedRoutes();
        let user = await this.ormService.getActiveUser();
        for (let route of routes) {
            let tasks = (await route.getTasks()).map(task => {
                task.forceSupportTask = Boolean(route.isSubtaskRequired(task.id));
                task.s3Media = {
                    image: RouteApiService.createS3ImageMediaForUrl(task.image)
                };
                if (task.getHint(1).type === "image") {
                    task.s3Media.hint1 = RouteApiService.createS3ImageMediaForUrl(task.getHint(1).value);
                }
                if (task.getHint(2).type === "image") {
                    task.s3Media.hint2 = RouteApiService.createS3ImageMediaForUrl(task.getHint(2).value);
                }
                if (task.getHint(3).type === "image") {
                    task.s3Media.hint3 = RouteApiService.createS3ImageMediaForUrl(task.getHint(3).value);
                }
                if (task.getSolutionSampleImgSrc() !== "") {
                    task.s3Media.solutionsample = RouteApiService.createS3ImageMediaForUrl(task.getSolutionSampleImgSrc());
                }
                return task;
            });
            let score = route.getScoreForUser(user);
            score.route = undefined;
            route.scores = undefined;

            route.s3Media = {
                mapFilename: {
                    mimeType: "archive/zip",
                    details: {
                        url: Helper.MEDIASERVER_IMAGE_URL + 'mcm_maps/' + route.mapFileName
                    },
                    type: s3MediaType.ZIP
                },
                image: RouteApiService.createS3ImageMediaForUrl(route.image)
            }
            route.tasks = undefined;
            route.task2Routes = undefined;
            let routeInfo = {tasks: tasks, score: score};

            await this.storage.set(DOWNLOADED_ROUTE_INFOS_PREFIX + route.code, routeInfo);
            await this.addRouteToDownloadedList(route);
        }

        await this.ormService.removeAllSqLiteData();
        await this.storage.set(key, true);
    }

    private static createS3ImageMediaForUrl(url: string) {
        let imageUrlSegments = url.split('/');
        let frontParts = imageUrlSegments.splice(0, imageUrlSegments.length - 1);
        return {mimeType: "image/*",
            type: s3MediaType.IMAGE,
            details: {
            thumbUrl: `${Helper.MEDIASERVER_IMAGE_URL}${frontParts.join('/')}/thumb/${imageUrlSegments.join('/')}`,
                smallUrl: `${Helper.MEDIASERVER_IMAGE_URL}${frontParts.join('/')}/s/${imageUrlSegments.join('/')}`,
                mediumUrl: `${Helper.MEDIASERVER_IMAGE_URL}${frontParts.join('/')}/m/${imageUrlSegments.join('/')}`,
                largeUrl: `${Helper.MEDIASERVER_IMAGE_URL}${frontParts.join('/')}/l/${imageUrlSegments.join('/')}`
        }
        }
    }
}
