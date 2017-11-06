import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'leaflet';
import 'leaflet.markercluster';
import { OfflineLayer } from './OfflineLayer';
import { OfflineProgressControl } from './OfflineProgressControl';
import { CacheBtnControl } from './CacheBtnControl';

import { Helper } from '../../classes/Helper';
import { DBC } from '../../classes/DBC';
import { DB_Handler } from '../../classes/DB_Handler';
import { Platform } from 'ionic-angular';
import { DB_Updater } from '../../classes/DB_Updater';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  center: L.PointTuple;

  constructor(public navCtrl: NavController, private platform: Platform, private updater: DB_Updater) { }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");

    this.platform.ready().then(() => {
      console.log('Platform is ready!')
      let dbHandler = DB_Handler.getInstance();
      dbHandler.initialize().then(() => {
        this.updater.execute(["getVersions", DBC.DATABASE_TABLE_STATE, "checkForUpdates"]).then(() => {
          console.log("updater finished!")
          let table = DBC.DB_ROUTE;
          let sqlQry = `SELECT ${table.fields[3]},${table.fields[13]} FROM ${table.getTableName()} WHERE ${table.fields[2]}=1;`;
          console.log(`SQL QUERY: ${sqlQry}`)
          let dbh = DB_Handler.getInstance();
          let db = dbh.getWritableDatabase();
          db.executeSql(sqlQry, []).then(result => {
            let markerGroup = L.markerClusterGroup();
            for (var i = 0; i < result.rows.length; i++) {
              let row = result.rows.item(i);
              let center = JSON.parse(row.center);
              let marker: any = L.marker([center[0], center[1]]).on('click', () => {
                alert(`Route: ${row.title}`);
              })
              markerGroup.addLayer(marker);
            }

            this.map.addLayer(markerGroup);
          });
        })
      })

    });
    console.log("Doing task after this.updater.execute ran")
    this.loadMap();
  }

  loadMap() {
    this.center = [50.1208566,8.66158515]; // Frankfurt-am Main

    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    let mapquestUrl = `http://{s}.tiles.mapbox.com/v4/${Helper.mapCode}/{z}/{x}/{y}.png?access_token=${Helper.accessToken}`
    let subDomains = ['a', 'b', 'c', 'd'];

    var mapquestAttrib = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.';
    var offlineLayer;
    var map = this.map;
    var onReady = function () {
      var cacheBtn, progressControls;
      console.log("The OfflineLayer is ready to be used");
      offlineLayer.addTo(map);
      cacheBtn = new CacheBtnControl(offlineLayer);
      map.addControl(cacheBtn);
      progressControls = new OfflineProgressControl();
      progressControls.setOfflineLayer(offlineLayer);
      map.addControl(progressControls);
    };

    var onError = function (errorType, errorData1, errorData2) {
      console.log(errorType);
      console.log(errorData1);
      return console.log(errorData2);
    };


    var options = { maxZoom: 18, attribution: mapquestAttrib, subdomains: subDomains, onReady: onReady, onError: onError, storeName: "myStoreName", dbOption: "WebSQL" }
    offlineLayer = new OfflineLayer(mapquestUrl, options)
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
