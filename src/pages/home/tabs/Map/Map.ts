import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';

import { DB_Handler } from '../../../../classes/DB_Handler';
import { DB_Updater } from '../../../../classes/DB_Updater';
import { DBC } from '../../../../classes/DBC';
import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

@Component({
  selector: 'page-map',
  templateUrl: 'Map.html'
})
export class MapPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  center: L.PointTuple;
  imageObject: any;
  routeDetails: any;
  offlineLayer: any;
  offlineControl: any;
  userMarker: any;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private geolocation: Geolocation,
    private updater: DB_Updater) { }

  ionViewDidEnter() {
    console.log("ionViewDidEnter:");
    this.platform.ready().then(() => {
      console.log('Platform is ready!');
      this.initializeMap();
    });

    this.loadMap();
  }

  markerGroup: any = null;

  initializeMap() {
    let dbHandler = DB_Handler.getInstance();
    if (this.markerGroup != null) {
      console.warn('removing markerGroup');
      this.map.removeLayer(this.markerGroup);
      this.markerGroup = null;
    }

    dbHandler.initialize().then(() => {
      console.warn('db handler initialized');
      this.updater.execute(["getVersions", DBC.DATABASE_TABLE_STATE, "checkForUpdates"]).then(() => {
        console.log("updater finished!")
        let table = DBC.DB_ROUTE;
        let sqlQry = `SELECT ${table.fields[3]},${table.fields[6]},${table.fields[13]} FROM ${table.getTableName()} WHERE ${table.fields[2]}=1;`;
        console.log(`SQL QUERY: ${sqlQry}`)
        let dbh = DB_Handler.getInstance();
        let db = dbh.getWritableDatabase();
        let fileManager = new File();
        db.executeSql(sqlQry, []).then(result => {
          let markerGroup = L.markerClusterGroup();
          for (var i = 0; i < result.rows.length; i++) {
            let row = result.rows.item(i);
            let center = JSON.parse(row.center);
            let marker: any = L.marker([center[0], center[1]]).on('click', () => {
              let imageFileName = row.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "")
              fileManager.readAsDataURL(fileManager.dataDirectory, imageFileName)
                .then(imageData => this.routeDetails.imageData = imageData, imageError => {
                  console.error("Error making image DataURL:", imageError);
                  // TODO: default empty image holder
                })
                .catch(error => {
                  console.error("Error making image DataURL:", JSON.stringify(error));
                  // TODO: default empty image holder
                })
              this.routeDetails = row;
            })
            markerGroup.addLayer(marker);
          }

          this.map.addLayer(markerGroup);
          this.markerGroup = markerGroup;
        });
      })
    }).catch(error => {
      console.error(`DB_Handler initialization error: ${JSON.stringify(error)}`);
    })
  }

  loadMap() {
    this.center = [50.1208566, 8.66158515]; // Frankfurt-am Main
    let mapquestUrl = `http://{s}.tiles.mapbox.com/v4/${Helper.mapCode}/{z}/{x}/{y}.png?access_token=${Helper.accessToken}`
    let subDomains = ['a', 'b', 'c', 'd'];

    if (this.map == null) {
      this.map = L.map('map', {
        center: this.center,
        zoom: 13
      });
      this.map.on('click', e => {
        //check if details open and reset content. for now just reset content
        this.routeDetails = null;
        console.log('cleared route details');
      })
      let map = this.map;
      tilesDb.initialize().then(() => {
        console.log("Tiles DB Initialized");
        let offlineLayer = L.tileLayer.offline(mapquestUrl, tilesDb, {
          attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
          subdomains: subDomains,
          minZoom: 10,
          maxZoom: 18,
          crossOrigin: true
        });
        let offlineControl = L.control.offline(offlineLayer, tilesDb, {
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
          maxZoom: 16
        });

        offlineLayer.addTo(map);
        offlineControl.addTo(map);

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
        console.warn('found you');
        Helper.myLocation = resp;
        console.log(`Coordinates: ${JSON.stringify(resp)}`);
        // let markerGroup = L.featureGroup();
        this.userMarker = L.circleMarker([resp.coords.latitude, resp.coords.longitude]).on('click', () => {
          alert('Marker clicked');
        })
        // markerGroup.addLayer(marker);
        // this.map.addLayer(markerGroup);
        this.userMarker.addTo(this.map);
        this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude), 16);
      })
      .catch(error => {
        console.error(`Location error: ${JSON.stringify(error)}`);
      })

      let watch = this.geolocation.watchPosition();
      watch.subscribe(resp => {
        if (resp) {
        Helper.myLocation = resp;
        console.log(`Coordinates: ${JSON.stringify(resp)}`);
        const lanlng = new L.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map.panTo(lanlng);
        this.userMarker.setLatLng(lanlng);
        }
      });
    }
  }
}