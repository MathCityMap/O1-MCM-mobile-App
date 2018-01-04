import { Component, ViewChild, ElementRef } from '@angular/core';
import { DeepLinker, IonicPage, NavController } from 'ionic-angular';
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

import { SpinnerDialog} from "@ionic-native/spinner-dialog";

import { OrmService } from '../../../../services/orm-service';
import {User} from '../../../../entity/User';
import {Route} from '../../../../entity/Route';
import {State} from '../../../../entity/State';
import {Task} from '../../../../entity/Task';
import { RouteInfo } from '../../../../modals/RouteInfo/RouteInfo';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { LatLngBounds } from 'leaflet';
import { MCMProgressBarPopupComponent } from '../../../../components/mcm-progress-bar-popup/mcm-progress-bar-popup.component';
import { BroadcastService } from '../../../../services/broadcast-service';

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
  offlineLayer: any;
  offlineControl: any;
  userMarker: any;
  isFilePluginAvailable: boolean;
  doneDownload: number;
  totalDownload: number;
  isDownloading: boolean = false;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private geolocation: Geolocation,
    private updater: DB_Updater,
    private spinner: SpinnerDialog,
    private modalCtrl: ModalController,
    private ormService: OrmService,
    private deepLinker: DeepLinker,
    private broadcastService: BroadcastService) { }

  async ionViewDidEnter() {
    console.log("ionViewDidEnter:");
  }

  ngOnInit() {
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

    this.spinner.show(null, "Lade Routen", true);
    const routes = await this.ormService.getPublicRoutes();
    let markerGroup = (L as any).markerClusterGroup();
    for (let route of routes) {
      markerGroup.addLayer(L.marker(route.getCenterLatLng()).on('click', () => {
        this.routeDetails = route;
      }));
    }
    map.addLayer(markerGroup);
    this.markerGroup = markerGroup;
    this.spinner.hide();
  }

  loadMap() {
    this.center = [50.1208566, 8.66158515]; // Frankfurt-am Main
    let mapquestUrl = Helper.mapquestUrl
    let subDomains = Helper.subDomains

    //[[38.4298915,27.1227443],[38.4129794,27.1416646]]
    const corner1 = L.latLng(52.3905689,13.0644729)
    const corner2 = L.latLng(52.3513863,13.1632323)
    const bounds: LatLngBounds = L.latLngBounds(corner1, corner2)


    if (this.map == null) {
      this.map = (L as any).map('map', {
        center: this.center,
        zoom: 16,
        tileSize: 256
      });
      // this.map.fitBounds(bounds);
      this.map.setZoom(16);
      this.map.on('click', e => {
        //check if details open and reset content. for now just reset content
        this.routeDetails = null;
        console.log('cleared route details');
      })
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
        let offlineControl = (L.control as any).offline(offlineLayer, tilesDb, {
          saveButtonHtml: '<i class="fa fa-download" aria-hidden="true">Save</i>',
          removeButtonHtml: '<i class="fa fa-trash" aria-hidden="true">Remove</i>',
          confirmSavingCallback: function (nTilesToSave, continueSaveTiles) {
            if (nTilesToSave > 1000) {
              window.alert('Too much tiles to save: ' + nTilesToSave);
            } else if (window.confirm('Save ' + nTilesToSave + '?')) {
              continueSaveTiles();
            }
          },
          confirmRemovalCallback: function (continueRemoveTiles) {
            if (window.confirm('Remove all the tiles?')) {
              continueRemoveTiles();
            }
          },
          minZoom: 10,
          maxZoom: 20
        });

        offlineLayer.addTo(map);
        // offlineControl.addTo(map);

        offlineLayer.on('offline:below-min-zoom-error', function () {
          alert('Can not save tiles below minimum zoom level.');
        });

        offlineLayer.on('offline:save-start', function (data) {
          console.log(data);
          console.log('Saving ' + data.nTilesToSave + ' tiles.');
        });

        offlineLayer.on('offline:save-end', function () {
          alert('All the tiles were saved.');
        });

        offlineLayer.on('offline:save-error', function (err) {
          console.error('Error when saving tiles: ' + err);
        });

        offlineLayer.on('offline:remove-start', function () {
          console.log('Removing tiles.');
        });

        offlineLayer.on('offline:remove-end', function () {
          alert('All the tiles were removed.');
        });

        offlineLayer.on('offline:remove-error', function (err) {
          console.error('Error when removing tiles: ' + err);
        });
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
            // this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude), 8);

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

  async doDownload(route: Route) {
    console.log(`doDownload ${JSON.stringify(route.id)}`);

    // uncommend this line to switch displaying route (online only mode)
    this.isDownloading = true;

    this.totalDownload = 0;
    this.doneDownload = 0;
    let downloadModal = this.modalCtrl.create(MCMProgressBarPopupComponent,  {total: this.totalDownload, done: this.doneDownload}, {showBackdrop: true, enableBackdropDismiss: false});
    downloadModal.present();
    const self = this;
    await this.ormService.downloadRoute(route, function (doneDownload, totalDownload) {
      self.broadcastService.downloadProgressChanged(totalDownload, doneDownload);
      self.doneDownload = doneDownload;
      self.totalDownload = totalDownload;
    });
    this.isDownloading = false;
    downloadModal.dismiss();
  }

  showRoute(routeId: number): void {
    this.navCtrl.parent.parent.push('TasksMap', {routeId: routeId}, {}, () => {
      // necessary because of bug which does not update URL
      this.deepLinker.navChange('forward');
    });
  }

  removeRoute(route: Route): void {
    this.ormService.removeDownloadedRoute(route);
  }


  presentRouteInfoModal(route: Route): void {
    let routeInfoModal = this.modalCtrl.create(RouteInfo, {route: route});
    routeInfoModal.present();
  }

}
