import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as L from 'leaflet';
// import 'leaflet.markercluster';
import 'leaflet-offline';

import { DB_Handler } from '../../../../classes/DB_Handler';
import { DBC } from '../../../../classes/DBC';
import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';


@Component({
  selector: 'page-tasks-map',
  templateUrl: 'TasksMap.html'
})
export class TasksMap {
  @ViewChild('tasks-map') mapContainer: ElementRef;
  private map: any;
  private route: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidEnter() {
    console.log('TasksMap ionViewDidEnter()');
    this.route = this.navParams.data.route;

    this.loadMap();
    this.initializeMap();
  }

  markerGroup: any = null;

  async initializeMap() {
    let dbHandler = DB_Handler.getInstance();
    if (this.markerGroup != null) {
      console.warn('removing markerGroup');
      this.map.removeLayer(this.markerGroup);
      this.markerGroup = null;
    }

    dbHandler.ready().then(() => {
      console.warn('db handler initialized');
      const table = DBC.DB_TASK;
      const conTable = DBC.DB_RELROUTETASK;
      // SELECT t.* FROM mcm_task as t,mcm_rel_route_task rt WHERE rt.task_id=t._id AND rt.route_id=6 AND t.public=1
      const sqlQry = `SELECT t.* FROM ${table.getTableName()} AS t,${conTable.getTableName()} AS rt WHERE rt.${conTable.fields[2]}=t.${table.fields[0]} AND rt.${conTable.fields[1]}=${this.route._id} AND t.${table.fields[2]}=1`;
      console.log(`SQL QUERY: ${sqlQry}`)
      let dbh = DB_Handler.getInstance();
      let db = dbh.getReadableDatabase();
      // let fileManager = new File();
      const map = this.map;
      db.executeSql(sqlQry, []).then(result => {
        // let markerGroup = L.layerGroup(); //L.markerClusterGroup();
        for (var i = 0; i < result.rows.length; i++) {
          let row = result.rows.item(i);

          let marker: any = L.marker([row.lat, row.lon]).on('click', () => {
            // let imageFileName = row.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "")
            // fileManager.readAsDataURL(fileManager.dataDirectory, imageFileName)
            //   .then(imageData => this.routeDetails.imageData = imageData, imageError => {
            //     console.error("Error making image DataURL:", imageError);
            //     // TODO: default empty image holder
            //   })
            //   .catch(error => {
            //     console.error("Error making image DataURL:", JSON.stringify(error));
            //     // TODO: default empty image holder
            //   })
            // this.routeDetails = row;
          });

          marker.bindPopup(`<h2>${row.title}</h2><p>${row.description}</p>`);

          map.addLayer(marker);
        }
        
        // this.map.addLayer(markerGroup);
        // this.markerGroup = markerGroup;
      }).catch(error => {
        console.error("SQL Error:",JSON.stringify(error));
      });
    }).catch(error => {
      console.error(`DB_Handler initialization error: ${JSON.stringify(error)}`);
    })
  }

  loadMap() {
    const center = [50.1208566, 8.66158515]; // Frankfurt-am Main
    let mapquestUrl = `http://{s}.tiles.mapbox.com/v4/${Helper.mapCode}/{z}/{x}/{y}.png?access_token=${Helper.accessToken}`
    let subDomains = ['a', 'b', 'c', 'd'];

    //[[38.4298915,27.1227443],[38.4129794,27.1416646]]
    // const corner1 = L.latLng(38.4313915, 27.1212443)
    // const corner2 = L.latLng(38.4114794, 27.1431646)
    const bbox = JSON.parse(this.route.bounding_box);
    const corner1 = bbox[0];
    const corner2 = bbox[1];
    const bounds: L.latLngBounds = L.latLngBounds(corner1, corner2)


    if (this.map == null) {
      this.map = L.map('tasks-map', {
        // center: center,
        zoom: 18
      });
      this.map.fitBounds(bounds);
      // this.map.setZoom(18);
      this.map.on('click', e => {
        //check if details open and reset content. for now just reset content
        // this.routeDetails = null;
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
          crossOrigin: false
        });

        offlineLayer.addTo(map);

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
    }
  }
}