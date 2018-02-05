import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';
import { checkAvailability } from "@ionic-native/core";

import { DB_Updater } from '../../../../classes/DB_Updater';
import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LatLngBounds } from 'leaflet';
import { MCMInputModal } from '../../../../modals/MCMInputModal/MCMInputModal';
import { ModalsService } from '../../../../services/modals-service';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { TranslateService } from '@ngx-translate/core';



import {gpsService} from  '../../../../services/gps-service';
import 'rxjs/add/operator/filter';
import 'leaflet-rotatedmarker';

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'Map.html'
})
export class MapPage implements OnInit {

    @ViewChild('map') mapContainer: ElementRef;
    map: any;
    center: L.PointTuple;
    imageObject: any;
    routeDetails: Route;
    userMarker: any;
    isFilePluginAvailable: boolean;

    prevPos: any;

    userPositionIcon;
    publicRouteIconAvailable;
    privateRouteIconAvailable;
    publicRouteIconOpen;
    privateRouteIconOpen;
    //Marker for Progress
    publicRouteIconDownloaded;
    privateRouteIconDownloaded;


    constructor(
        private platform: Platform,
        private geolocation: Geolocation,
        private updater: DB_Updater,
        private ormService: OrmService,
        private modalCtrl: ModalController,
        public modalsService: ModalsService,
        public navCtrl: NavController,
        private spinner: SpinnerDialog,
        private translateService: TranslateService,
        private gpsService: gpsService) {
            this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [38, 41], className:'marker'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
            this.publicRouteIconAvailable = L.icon({iconUrl:'./assets/icons/icon_routemarker-available.png', iconSize: [35, 48], className:'marker', shadowUrl: './assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
            this.privateRouteIconAvailable = L.icon({iconUrl:'./assets/icons/icon_routemarker-private-available.png', iconSize: [35, 48], className:'marker', shadowUrl: './assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
            this.publicRouteIconOpen = L.icon({iconUrl:'./assets/icons/icon_routemarker-open.png', iconSize: [35, 48], className:'marker', shadowUrl: './assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
            this.privateRouteIconOpen = L.icon({iconUrl:'./assets/icons/icon_routemarker-private-open.png', iconSize: [35, 48], className:'marker', shadowUrl: './assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
            //Marker for Progress
            this.publicRouteIconDownloaded = L.icon({iconUrl:'./assets/icons/icon_routemarker-done.png', iconSize: [35, 48], className:'marker', shadowUrl: './assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
            this.privateRouteIconDownloaded = L.icon({iconUrl:'./assets/icons/icon_routemarker-private-done.png', iconSize: [35, 48], className:'marker', shadowUrl: './assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
    }



    async ionViewWillEnter() {
        console.log("ionViewWillEnter:");
        this.gpsService.isLocationOn();
    }

    async ngOnInit() {
        this.isFilePluginAvailable = checkAvailability(File.getPluginRef(), null, File.getPluginName()) === true;
        this.platform.ready().then(() => {
            console.log('Platform is ready!');
            this.initializeMap();


        });

        this.loadMap();
    }


    markerGroup: any = null;

    async initializeMap() {
        this.spinner.show(null, this.translateService.instant('a_toast_update_start'));
        await this.updater.checkForUpdates();
        const map = this.map
        if (this.markerGroup != null) {
            console.warn('removing markerGroup');
            this.map.removeLayer(this.markerGroup);
            this.markerGroup = null;
        }
        this.spinner.hide();
        const routes = await this.ormService.getVisibleRoutes();
        let markerGroup = (L as any).markerClusterGroup();
        for (let route of routes) {
            let latLng = route.getCenterLatLng()
            let icon;
            if(route.public){
                icon = this.publicRouteIconOpen;
            }else{
                icon = this.privateRouteIconOpen;
            }
            markerGroup.addLayer(L.marker(latLng, {icon: icon}).on('click', () => {
                this.routeDetails = route;
                this.map.panTo( latLng );
            }));
        }
        map.addLayer(markerGroup);
        this.markerGroup = markerGroup;
        let activeUser = await this.ormService.getActiveUser();
        if (!activeUser) {
            let userModal = this.modalCtrl.create(MCMInputModal);
            userModal.present();
        }

        
    }

    loadMap() {
        let isLoadedViaHttp = window.location.href.indexOf('http') === 0
        this.center = [50.1208566, 8.66158515]; // Frankfurt-am Main
        let mapquestUrl = Helper.mapquestUrl
        let subDomains = Helper.subDomains
        let keepPositionBecauseOfReload = false;

        
        if (this.map == null) {
            this.map = (L as any).map('map', {
                center: this.center,
                zoom: 16,
                tileSize: 256
            });
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
                    attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
                    subdomains: subDomains,
                    minZoom: 7,
                    maxZoom: 20,
                    tileSize: 256,
                    crossOrigin: true,
                    detectRetina: true
                });

                offlineLayer.addTo(map);
            });
            this.geolocation.getCurrentPosition()
                .then(resp => {
                    if (resp && resp.coords) {
                        console.warn('found you');
                        Helper.myLocation = resp;
                        console.log(`Coordinates: ${JSON.stringify(resp)}`);
                        // let markerGroup = L.featureGroup();

                        this.userMarker = L.marker([resp.coords.latitude, resp.coords.longitude], {icon: this.userPositionIcon}).on('click', () => {
                            alert('Marker clicked');
                        });
                        this.userMarker.addTo(this.map);
                        if (!keepPositionBecauseOfReload) {
                            this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude), 8);
                        }

                        let watch = this.geolocation.watchPosition();
                        watch.subscribe(resp => {

                        	
                            if (resp && resp.coords) {
                                Helper.myLocation = resp;
                                console.log(`Coordinates: ${JSON.stringify(resp)}`);
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
                                if(this.prevPos!=null) {
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


    removeRoute(route: Route): void {
        this.ormService.removeDownloadedRoute(route);
    }

    async addRouteByCode() {
        let route = await this.modalsService.showAddRouteByCodeModal();
        if (route) {
            this.markerGroup.addLayer(L.marker(route.getCenterLatLng(), {icon: this.privateRouteIconAvailable}).on('click', () => {
                this.routeDetails = route;
            }));
        }
    }




}
