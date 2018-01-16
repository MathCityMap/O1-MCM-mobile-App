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

import { DB_Handler } from '../../../../classes/DB_Handler';
import { DB_Updater } from '../../../../classes/DB_Updater';
import { DBC } from '../../../../classes/DBC';
import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

import { OrmService } from '../../../../services/orm-service';
import {Route} from '../../../../entity/Route';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LatLngBounds } from 'leaflet';
import { MCMInputModal } from '../../../../modals/MCMInputModal/MCMInputModal';
import { ModalsService } from '../../../../services/modals-service';

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


    constructor(private platform: Platform,
                private geolocation: Geolocation,
                private updater: DB_Updater,
                private ormService: OrmService,
                private modalCtrl: ModalController,
                public modalsService: ModalsService,
                public navCtrl: NavController) {
    }

  async ionViewDidEnter() {
    console.log("ionViewDidEnter:");
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
    let dbHandler = DB_Handler.getInstance();
    await dbHandler.ready();
    console.warn('db handler initialized');

    await this.updater.execute(["getVersions", DBC.DATABASE_TABLE_STATE, "checkForUpdates"]);
    const map = this.map
    if (this.markerGroup != null) {
      console.warn('removing markerGroup');
      this.map.removeLayer(this.markerGroup);
      this.markerGroup = null;
    }
    const routes = await this.ormService.getVisibleRoutes();
    let markerGroup = (L as any).markerClusterGroup();
    for (let route of routes) {
      markerGroup.addLayer(L.marker(route.getCenterLatLng()).on('click', () => {
        this.routeDetails = route;
      }));
    }
    map.addLayer(markerGroup);
    this.markerGroup = markerGroup;
    let activeUser = await this.ormService.getActiveUser();
    if(!activeUser){
      let userModal = this.modalCtrl.create(MCMInputModal);
      userModal.present();
    }
  }

  loadMap() {
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
        if (window.location.search && window.location.search.indexOf('pos=') > -1) {
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
      this.map.on('moveend', event => {
        let bounds : LatLngBounds = this.map.getBounds();
          window.history.replaceState(
              {} ,
              "Title",
              `${window.location.origin}?pos=${bounds.toBBoxString()}/${window.location.hash}`
          );
      });
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
            this.userMarker = L.circleMarker([resp.coords.latitude, resp.coords.longitude]).on('click', () => {
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
            this.markerGroup.addLayer(L.marker(route.getCenterLatLng()).on('click', () => {
                this.routeDetails = route;
            }));
        }
    }


}
