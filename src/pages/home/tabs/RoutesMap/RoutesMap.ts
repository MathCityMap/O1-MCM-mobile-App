import {Component, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {OnInit} from "@angular/core";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';
import {checkAvailability} from "@ionic-native/core";

import {DB_Updater} from '../../../../classes/DB_Updater';
import {Helper} from '../../../../classes/Helper';
import {tilesDb} from '../../../../classes/tilesDb';

import {OrmService} from '../../../../services/orm-service';
import {Route} from '../../../../entity/Route';
import {LatLngBounds} from 'leaflet';
import {ModalsService} from '../../../../services/modals-service';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {TranslateService} from '@ngx-translate/core';


import {GpsService} from '../../../../services/gps-service';
import 'rxjs/add/operator/filter';
import 'leaflet-rotatedmarker';
import {Subscription} from 'rxjs/Subscription';
import {LanguageService} from '../../../../services/language-service';

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import 'mapbox-gl-leaflet/leaflet-mapbox-gl.js';

@IonicPage()
@Component({
    selector: 'routes-map',
    templateUrl: 'RoutesMap.html'
})
export class RoutesMapPage implements OnInit, OnDestroy {

    @ViewChild('map') mapContainer: ElementRef;
    map: any;
    center: L.PointTuple;
    imageObject: any;
    routeDetails: Route;
    userMarker: any;
    isFilePluginAvailable: boolean;
    routes: Route[];

    prevPos: any;

    userPositionIcon;
    publicRouteIcon;
    privateRouteIcon;
    downloadedRouteIcon;
    doneRouteIcon;
    eventSubscription: Subscription;
    private watchSubscription: Subscription;

    showAllRoutes: boolean;
    isRouteDownloaded: string;

    constructor(
        private updater: DB_Updater,
        private ormService: OrmService,
        public modalsService: ModalsService,
        public navCtrl: NavController,
        private spinner: SpinnerDialog,
        private translateService: TranslateService,
        private gpsService: GpsService,
        public helper: Helper,
        private navParams: NavParams,
        private languageService: LanguageService) {
        this.userPositionIcon = L.icon({
            iconUrl: "./assets/icons/mapposition.png",
            iconSize: [100, 100],
            iconAnchor: [50, 50],
            className: 'marker userPosition'
        });       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
        this.publicRouteIcon = L.icon({
            iconUrl: './assets/icons/marker-route-public.png',
            iconSize: [35, 48],
            iconAnchor: [17.5, 43],
            className: 'marker'
        });
        this.privateRouteIcon = L.icon({
            iconUrl: './assets/icons/marker-route-private.png',
            iconSize: [35, 48],
            iconAnchor: [17.5, 43],
            className: 'marker'
        });
        this.downloadedRouteIcon = L.icon({
            iconUrl: './assets/icons/marker-route-downloaded.png',
            iconSize: [35, 48],
            iconAnchor: [17.5, 43],
            className: 'marker'
        });
        this.doneRouteIcon = L.icon({
            iconUrl: './assets/icons/marker-route-done.png',
            iconSize: [35, 48],
            iconAnchor: [17.5, 43],
            className: 'marker'
        });
        this.eventSubscription = this.ormService.eventEmitter.subscribe(async (event) => {
            if (this.markerGroup) {
                if(!this.showAllRoutes) this.routes = await this.ormService.getDownloadedRoutes();
                this.redrawMarker();
                this.routeDetails = null;
            }
        });
    }


    async ionViewWillEnter() {
        console.log("ionViewWillEnter:");

        this.gpsService.isLocationOn();

        if (this.markerGroup) {
            if (this.showAllRoutes) this.routes = await this.ormService.getVisibleRoutes();
            else this.routes = await this.ormService.getDownloadedRoutes();
            this.redrawMarker();
        }
    }

    async ngOnInit() {
        this.isFilePluginAvailable = checkAvailability(File.getPluginRef(), null, File.getPluginName()) === true;

        if (this.navParams.data && this.navParams.data.showAllRoutes != null) {
            if (this.navParams.data.showAllRoutes) this.showAllRoutes = true;
            else this.showAllRoutes = false;
        }
        this.languageService.initialize().then(async () => {
            this.loadMap();
           await this.initializeMap();
        });

    }

    ngOnDestroy() {
        this.navCtrl.setRoot('RoutesListPage', {showAllRoutes: this.showAllRoutes});        if (this.eventSubscription) {
            this.eventSubscription.unsubscribe();
            this.eventSubscription = null;
        }
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
    }


    markerGroup: any = null;

    async initializeMap() {
        let activeUser = await this.ormService.getActiveUser();
        if (!activeUser) {
            let online = await this.modalsService.showNoInternetModalIfOffline();
            if (online) {
                this.spinner.show(null, this.translateService.instant('a_toast_update_start'), true);
                try {
                    await this.updater.checkForUpdates();
                } catch (e) {
                    console.error('caught error while checking for updates:');
                    console.error(e);
                }
            }
        }
        if (this.showAllRoutes) this.routes = await this.ormService.getVisibleRoutes();
        else this.routes = await this.ormService.getDownloadedRoutes();
        this.redrawMarker();
        this.spinner.hide();
    }

    redrawMarker() {
        const map = this.map;
        if (this.markerGroup != null) {
            console.warn('removing markerGroup');
            this.map.removeLayer(this.markerGroup);
            this.markerGroup = null;
        }
        let markerGroup = (L as any).markerClusterGroup({
            maxClusterRadius: 30
        });
        for (let route of this.routes) {
            let latLng = route.getCenterLatLng()
            let icon;
            if (route.downloaded) {
                if (route.completed) {
                    icon = this.doneRouteIcon;
                } else {
                    icon = this.downloadedRouteIcon;
                }
            } else if (route.public == "1") {
                icon = this.publicRouteIcon;
            } else {
                icon = this.privateRouteIcon;
            }
            markerGroup.addLayer(L.marker(latLng, {icon: icon}).on('click', () => {
                if (this.routeDetails == route) {
                    this.modalsService.showRoute(route, this.navCtrl);
                } else {
                    this.routeDetails = route;
                    if(route.downloaded) this.isRouteDownloaded = 'downloaded';
                    else this.isRouteDownloaded = null;
                    this.map.panTo(latLng);
                }
            }));
        }
        map.addLayer(markerGroup);
        this.markerGroup = markerGroup;
    }

    loadMap() {
        let isLoadedViaHttp = window.location.href.indexOf('http') === 0
        this.center = [50.1208566, 8.66158515]; // Frankfurt-am Main
        let mapquestUrl = Helper.mapquestUrl
        let subDomains = Helper.subDomains
        let keepPositionBecauseOfReload = false;

        if (this.map == null) {
            if (this.showAllRoutes) {
                this.map = L.map('map', {
                    attributionControl: false,
                    center: this.center,
                    zoom: 16,
                    trackResize: false // if map gets resized when not visible (when keyboard shows up) it can get into undefined state
                });
            } else {
                this.map = L.map('mapDownloaded', {
                    attributionControl: false,
                    center: this.center,
                    zoom: 16,
                    trackResize: false // if map gets resized when not visible (when keyboard shows up) it can get into undefined state
                });
            }

            // (<any>L).mapboxGL({
            //     accessToken: "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww",
            //     style: 'mapbox://styles/mapbox/outdoors-v11',
            //     updateInterval: 0,
            // }).addTo(this.map);


            if (isLoadedViaHttp && window.location.search && window.location.search.indexOf('pos=') > -1) {
                keepPositionBecauseOfReload = true;
                let startIndex = window.location.search.indexOf('pos=') + 4;
                let bboxString = window.location.search.substring(startIndex).split("&|/")[0];
                let coords = bboxString.split(",").map(parseFloat);
                const bounds: LatLngBounds = L.latLngBounds(L.latLng(coords[1], coords[0]), L.latLng(coords[3], coords[2]));
                this.map.fitBounds(bounds);
            }
            this.map.on('click', e => {
                //check if details open and reset content. for now just reset content
                this.routeDetails = null;
                console.log('cleared route details');
            });
            L.control.attribution({position: 'bottomleft', prefix: 'Leaflet'}).addTo(this.map);
            if (isLoadedViaHttp) {
                // when loaded via http (for development), keep track of map position
                this.map.on('moveend', event => {
                    let bounds: LatLngBounds = this.map.getBounds();
                    window.history.replaceState(
                        {},
                        "",
                        `${window.location.origin}?pos=${bounds.toBBoxString()}/${window.location.hash}`
                    );
                });
            }
            let map = this.map;
            tilesDb.initialize().then(() => {
                console.log("Tiles DB Initialized");
                let offlineLayer = (L.tileLayer as any).offline(mapquestUrl, tilesDb, {
                    attribution: '&copy; mapbox.com',
                    subdomains: subDomains,
                    minZoom: 4,
                    maxZoom: 20,
                    tileSize: 256,
                    crossOrigin: true,
                    detectRetina: true
                });

                offlineLayer.addTo(map);
            });
            this.gpsService.getCurrentPosition()
                .then(resp => {
                    if (resp && resp.coords) {
                        console.warn('found you');
                        // let markerGroup = L.featureGroup();

                        this.userMarker = L.marker([resp.coords.latitude, resp.coords.longitude], {icon: this.userPositionIcon}).on('click', () => {
                            //alert('Marker clicked');
                        });
                        this.userMarker.setRotationOrigin('center center');
                        this.userMarker.addTo(this.map);
                        if (!keepPositionBecauseOfReload) {
                            this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude), 8);
                        }

                        if (this.watchSubscription) {
                            this.watchSubscription.unsubscribe();
                        }
                        this.watchSubscription = this.gpsService.watchPosition().subscribe(resp => {


                            if (resp && resp.coords) {
                                const lanlng = new L.LatLng(resp.coords.latitude, resp.coords.longitude);
                                // this.map.panTo(lanlng);
                                this.userMarker.setLatLng(lanlng);

                                //Check if it needs to move the map (in case the user is outside the threshold bounds)
                                /*let freeBounds = L.bounds(L.point(this.map.getSize().x * 0.2, this.map.getSize().y * 0.2),
                                                   L.point(this.map.getSize().x * 0.8, this.map.getSize().y * 0.8));
                                let newPos = Helper.followUser(freeBounds, this.map.latLngToContainerPoint(lanlng), this.map.getZoom());
                                if(newPos!= null) {
                                    //this.map.panTo(this.map.containerPointToLatLng(newPos));
                                }*/


                                //Rotate the user marker
                                if (this.prevPos != null) {
                                    let angle = Helper.getAngle(this.prevPos, resp.coords);
                                    this.userMarker.setRotationAngle(angle);
                                }
                                this.prevPos = resp.coords;
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error(`Location error: ${JSON.stringify(error)}`);
                })
        }
    }

    async doDownload() {
        await this.modalsService.doDownload(this.routeDetails);
        this.redrawMarker();
    }

    showRouteDetail(item: any){
        this.modalsService.showRoute(item, this.navCtrl).then( async () =>{
           await this.reactOnRemovedRoute();
        })
    }

    async addRouteByCode() {
        this.navCtrl.setRoot('RoutesListPage', {showAllRoutes: this.showAllRoutes});
    }

    async reactOnRemovedRoute() {
        if(this.showAllRoutes)this.routes = await this.ormService.getVisibleRoutes();
        else this.routes = await this.ormService.getDownloadedRoutes();
        this.redrawMarker();
    }



}