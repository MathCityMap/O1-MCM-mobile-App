import {Component, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {File} from '@ionic-native/file';
import {OnInit} from "@angular/core";
import * as L from 'leaflet';
import 'leaflet.markercluster';
//import 'leaflet-offline';
import {checkAvailability} from "@ionic-native/core";

import {DB_Updater} from '../../../../classes/DB_Updater';
import {Helper} from '../../../../classes/Helper';
import {tilesDb} from '../../../../classes/tilesDb';

import {OrmService} from '../../../../services/orm-service';
import {Route} from '../../../../entity/Route';
import {geoJSON, LatLngBounds} from 'leaflet';
import {ModalsService} from '../../../../services/modals-service';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {TranslateService} from '@ngx-translate/core';


import {GpsService} from '../../../../services/gps-service';
import 'rxjs/add/operator/filter';
//import 'leaflet-rotatedmarker';
import {Subscription} from 'rxjs/Subscription';
import {LanguageService} from '../../../../services/language-service';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import {forEach} from "typescript-collections/dist/lib/arrays";

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
    mapBoxUserMarker: any;
    isFilePluginAvailable: boolean;
    routes: Route[];

    prevPos: any;

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
        this.eventSubscription = this.ormService.eventEmitter.subscribe(async (event) => {
            if (this.map && this.map.getLayer('unclustered-point')) {
                if (!this.showAllRoutes) this.routes = await this.ormService.getDownloadedRoutes();
                this.redrawMapBoxMarker()
                console.log("REDRAWED")
                this.routeDetails = null;
            }
        });
    }


    async ionViewWillEnter() {
        console.log("ionViewWillEnter:");

        this.gpsService.isLocationOn();

        if (this.map && this.map.getLayer('unclustered-point')) {
            if (this.showAllRoutes) this.routes = await this.ormService.getVisibleRoutes();
            else this.routes = await this.ormService.getDownloadedRoutes();
            this.redrawMapBoxMarker()
        }
    }

    async ngOnInit() {
        this.isFilePluginAvailable = checkAvailability(File.getPluginRef(), null, File.getPluginName()) === true;

        if (this.navParams.data && this.navParams.data.showAllRoutes != null) {
            if (this.navParams.data.showAllRoutes) this.showAllRoutes = true;
            else this.showAllRoutes = false;
        }
        this.languageService.initialize().then(async () => {
            //this.loadMap();
            this.loadMapBox();
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
    merkerMapBoxGroup: any = null;

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
        this.map.on('load', () => {
            const waiting = () => {
                if (!this.map.isStyleLoaded()) {
                    setTimeout(waiting, 200);
                } else {
                    this.redrawMapBoxMarker();
                }
            };
            waiting();
        });
        this.spinner.hide();
    }

    redrawMapBoxMarker() {
        const map = this.map;
        //clean layers to be redrawn
        if (this.map.getLayer('unclustered-point')) {
            console.log("###removing unclustered points layer");
            this.map.removeLayer('unclustered-point');
            this.markerGroup = null;
        }

        if (this.map.getLayer('clusters')) {
            console.log("###removing unclustered points layer");
            this.map.removeLayer('clusters');
            this.markerGroup = null;
        }
        if (this.map.getLayer('cluster-count')) {
            console.log("###removing unclustered points layer");
            this.map.removeLayer('cluster-count');
            this.markerGroup = null;
        }

        let GeoJson =
            {
                "type": "FeatureCollection",
                "features": []
            };

        for (let route in this.routes) {

            let icon;

            if (this.routes[route].downloaded) {
                if (this.routes[route].completed) {
                    icon = 'completed-route';
                } else {
                    icon = 'downloaded-route';
                }
            } else if (this.routes[route].public == "1") {
                icon = 'public-route';
            } else {
                icon = 'private-route';
            }

            let routeCenter = this.routes[route].getCenterLatLng();
            let data = {
                "type": "Feature",
                "properties": {
                    'routeIndex': route,
                    'icon': icon
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        routeCenter.lng,
                        routeCenter.lat
                    ]
                }
            };
            GeoJson.features.push(data);
        }

        if (this.map.getSource("routes")) this.map.getSource('routes').setData(GeoJson);
        else {
            this.map.addSource("routes", {
                type: "geojson",
                data: GeoJson,
                cluster: true,
                clusterRadius: 30
            });
        }

        this.map.addLayer({
            id: "clusters",
            type: "circle",
            source: "routes",
            filter: ["has", "point_count"],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 20
            }
        });

        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'routes',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 15
            }
        });

        map.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'routes',
            filter: ['!', ['has', 'point_count']],
            layout: {
                'icon-size': 0.23,
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true
            }
        });

    }

    loadMapBox() {

        let isLoadedViaHttp = window.location.href.indexOf('http') === 0
        let keepPositionBecauseOfReload = false;

        mapboxgl.accessToken = Helper.accessToken;

        //Either draws the map for all routes or for downloaded ones only
        if (this.showAllRoutes) {
            this.map = new mapboxgl.Map({
                style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
                center: [8.66158515, 50.1208566], // Frankfurt-am Main
                zoom: 16,
                container: 'map',
                trackResize: false
            });
        } else {
            this.map = new mapboxgl.Map({
                style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
                center: [8.66158515, 50.1208566], // Frankfurt-am Main
                zoom: 16,
                container: 'mapDownloaded',
                trackResize: false
            });
        }
        this.loadImagesToMap();
        this.map.touchZoomRotate.disableRotation();
        //removes labels for points of interest
        this.map.on('load', () => {
            this.map.style.stylesheet.layers.forEach(layer => {
                if (layer.id === "poi-label") {
                    this.map.removeLayer(layer.id);
                }
            });
        });

        if (isLoadedViaHttp && window.location.search && window.location.search.indexOf('pos=') > -1) {
            keepPositionBecauseOfReload = true;
            let startIndex = window.location.search.indexOf('pos=') + 4;
            let bboxString = window.location.search.substring(startIndex).split("&|/")[0]
                .replace(/LngLat\(/g, '')
                .replace(/%20/g, ' ')
                .replace(/\)/g, '');
            console.log("BBOX: ", bboxString);
            let coords = bboxString.split(",").map(parseFloat);
            const bounds = [[coords[0], coords[1]], [coords[2], coords[3]]];
            console.log("BOUNDS: ", bounds);
            this.map.fitBounds(bounds);
        }


        this.map.on('click', e => {
            //check if details open and reset content. for now just reset content
            this.routeDetails = null;
            console.log('cleared route details');
        });

        let that = this;
        //Zoom clusters
        that.map.on('click', 'clusters', function (e) {
            let features = that.map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            let clusterId = features[0].properties.cluster_id;
            that.map.getSource('routes').getClusterExpansionZoom(
                clusterId,
                function (err, zoom) {
                    if (err) return;

                    that.map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );
        });


        that.map.on('click', 'unclustered-point', async function (e) {
            let features = that.map.queryRenderedFeatures(e.point, {
                layers: ['unclustered-point']
            });
            let index = features[0].properties.routeIndex;
            let route = that.routes[index];
            if (that.routeDetails == route) {
                that.modalsService.showRoute(route, that.navCtrl);
            } else {
                if (route.downloaded){
                    that.isRouteDownloaded = 'downloaded';
                    console.log("THIS.ROUTE: ", route);
                    that.routeDetails = await that.ormService.findRouteByCode(route.code);
                }
                else {
                    that.routeDetails = route;
                    that.isRouteDownloaded = null;
                }
                that.map.panTo(features[0].geometry.coordinates);
            }
        });


        if (isLoadedViaHttp) {
            // when loaded via http (for development), keep track of map position
            this.map.on('moveend', event => {
                let bounds: mapboxgl.LngLatBounds = this.map.getBounds();
                let boundsString = bounds.toString();
                boundsString = boundsString.substring(13, boundsString.length - 1);
                window.history.replaceState(
                    {},
                    "",
                    `${window.location.origin}?pos=${boundsString}/${window.location.hash}`
                );
            });
        }

        this.gpsService.getCurrentPosition()
            .then(resp => {
                if (resp && resp.coords) {
                    console.warn('found you');
                    // let markerGroup = L.featureGroup();

                    let el = document.createElement('div');
                    el.className = 'marker';
                    el.style.backgroundImage = "url(assets/icons/mapposition.png)";
                    el.style.backgroundSize = 'cover';
                    el.style.width = 100 + 'px';
                    el.style.height = 100 + 'px';
                    el.addEventListener('click', function () {
                        //window.alert(marker.properties.message);
                        console.log("HEY clicked");
                    });


                    this.mapBoxUserMarker = new mapboxgl.Marker(el)
                        .setLngLat([resp.coords.longitude, resp.coords.latitude])
                        .addTo(this.map);

                    if (!keepPositionBecauseOfReload) {
                        this.map.panTo([resp.coords.longitude, resp.coords.latitude]);
                    }

                    if (this.watchSubscription) {
                        this.watchSubscription.unsubscribe();
                    }
                    this.watchSubscription = this.gpsService.watchPosition().subscribe(resp => {
                        if (resp && resp.coords) {
                            const lnglat = [resp.coords.longitude, resp.coords.latitude];
                            this.mapBoxUserMarker.setLngLat(lnglat);


                            //Rotate the user marker
                            if (this.prevPos != null) {
                                let angle = Helper.getAngle(this.prevPos, resp.coords);
                                this.mapBoxUserMarker.setRotation(angle);
                            }
                            this.prevPos = resp.coords;
                        }
                    });
                }
            })
            .catch(error => {
                console.log("error: ", error);
                console.error(`Location error: ${JSON.stringify(error)}`);
            })
    }

    async doDownload() {
        await this.modalsService.doDownload(this.routeDetails);
        console.log("DID DOWNLOAD");
        this.redrawMapBoxMarker()
    }

    async presentRouteInfoModal() {
        this.routeDetails = await this.modalsService.presentRouteInfoModal(this.routeDetails, this.navCtrl);
        this.redrawMapBoxMarker()
    }

    showRouteDetail(item: any) {
        console.log("##### ROUTE: ", item);
        this.modalsService.showRoute(item, this.navCtrl).then(async () => {
            await this.reactOnRemovedRoute();
        })
    }

    async switchToList() {
        this.navCtrl.setRoot('RoutesListPage', {showAllRoutes: this.showAllRoutes});
    }

    async reactOnRemovedRoute() {
        if (this.showAllRoutes) this.routes = await this.ormService.getVisibleRoutes();
        else this.routes = await this.ormService.getDownloadedRoutes();
        this.redrawMapBoxMarker()
    }

    loadImagesToMap() {
        let map = this.map;
        map.loadImage('assets/icons/marker-route-private.png', function (error, image) {
            map.addImage('private-route', image);
        });

        map.loadImage('assets/icons/marker-route-public.png', function (error, image) {
            map.addImage('public-route', image);
        });

        map.loadImage('assets/icons/marker-route-downloaded.png', function (error, image) {
            map.addImage('downloaded-route', image);
        });

        map.loadImage('assets/icons/marker-route-done.png', function (error, image) {
            map.addImage('completed-route', image);
        });


    }


}
