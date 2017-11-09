import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';
import { tilesDb } from './tilesDb';
import { File } from '@ionic-native/file';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Helper } from '../../classes/Helper';
import { DBC } from '../../classes/DBC';
import { DB_Handler } from '../../classes/DB_Handler';
import { Platform } from 'ionic-angular';
import { DB_Updater } from '../../classes/DB_Updater';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  center: L.PointTuple;
  routeImage: SafeUrl;
  imageObject: any;
  routeText: string;

  constructor(public navCtrl: NavController, private sanitize: DomSanitizer, private transfer: FileTransfer, private platform: Platform, private updater: DB_Updater) { }


  private downloadImage(fileTransfer: FileTransferObject, imgFileName: string, outputName: string) {
    let fileManager = new File();
    let imageAddress = Helper.WEBSERVER_URL + encodeURI(imgFileName);
    fileTransfer.download(imageAddress, fileManager.dataDirectory + outputName)
    .then(entry => {
      console.log(`Image download from: ${imageAddress}`)
      console.log(`Image download completed: ${JSON.stringify(this.sanitize.bypassSecurityTrustUrl(entry.toURL()))}`)
      this.routeImage = this.sanitize.bypassSecurityTrustUrl(entry.toInternalURL());
      // fileManager.readAsDataURL(entry.toURL()).then(value => this.routeImage = value, reason => this.failInfo = "Fail: " + reason);
    }, error => {
      console.error(`Download error URL: [${imgFileName}]`)
    }).catch(error => {
      console.error(`Download error URL: [${imgFileName}]`)
    })
  }


  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.platform.ready().then(() => {
      
      console.log('Platform is ready!')
      let dbHandler = DB_Handler.getInstance();
      dbHandler.initialize().then(() => {
        this.updater.execute(["getVersions", DBC.DATABASE_TABLE_STATE, "checkForUpdates"]).then(() => {
          console.log("updater finished!")
          let table = DBC.DB_ROUTE;
          let sqlQry = `SELECT ${table.fields[3]},${table.fields[6]},${table.fields[13]} FROM ${table.getTableName()} WHERE ${table.fields[2]}=1;`;
          console.log(`SQL QUERY: ${sqlQry}`)
          let dbh = DB_Handler.getInstance();
          let db = dbh.getWritableDatabase();
          
          // this.fileManager.dataDirectory + outputName
          let fileManager = new File();

          db.executeSql(sqlQry, []).then(result => {
            let markerGroup = L.markerClusterGroup();
            for (var i = 0; i < result.rows.length; i++) {
              let row = result.rows.item(i);
              let center = JSON.parse(row.center);
              let marker: any = L.marker([center[0], center[1]]).on('click', () => {
                // let imageUrl = fileManager.dataDirectory + row.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "")
                // this.routeImage = imageUrl;
                // alert(`Route: ${row.title} ${imageUrl}`);
                const fileTransfer: FileTransferObject = this.transfer.create();
                let outputName = row.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "")
                this.downloadImage(fileTransfer, row.image, outputName);
                this.routeText = row.title;
              })
              markerGroup.addLayer(marker);
            }

            this.map.addLayer(markerGroup);
          });
        })
      })

    });

    this.loadMap();
  }

  loadMap() {
    this.center = [50.1208566, 8.66158515]; // Frankfurt-am Main

    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    let mapquestUrl = `http://{s}.tiles.mapbox.com/v4/${Helper.mapCode}/{z}/{x}/{y}.png?access_token=${Helper.accessToken}`
    let subDomains = ['a', 'b', 'c', 'd'];
    var map = this.map;

    tilesDb.initialize().then(() => {
      console.log("Tiles DB Initialized");
      var offlineLayer = L.tileLayer.offline(mapquestUrl, tilesDb, {
        attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
        subdomains: subDomains,
        minZoom: 10,
        maxZoom: 18,
        crossOrigin: true
      });
      var offlineControl = L.control.offline(offlineLayer, tilesDb, {
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
    })

    // var options = { maxZoom: 18, attribution: mapquestAttrib, subdomains: subDomains, onReady: onReady, onError: onError, storeName: "myStoreName", dbOption: "WebSQL" }
    // offlineLayer = new OfflineLayer(mapquestUrl, options)



    this.map.locate({
      setView: true,
      maxZoom: 16
    }).on('locationfound', (e) => {
      console.log('found you');
      let markerGroup = L.featureGroup();
      let marker: any = L.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }).on('locationerror', (error) => {
      alert(error.message);
    })
  }
}
