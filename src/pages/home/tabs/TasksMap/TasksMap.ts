import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as L from 'leaflet';
// import 'leaflet.markercluster';
import 'leaflet-offline';

import { DB_Handler } from '../../../../classes/DB_Handler';
import { DBC } from '../../../../classes/DBC';
import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

import { MathRoute } from '../../../../classes/MathRoute';
import { MathTask } from '../../../../classes/MathTask';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-tasks-map',
  templateUrl: 'TasksMap.html'
})
export class TasksMap {
  @ViewChild('tasks-map') mapContainer: ElementRef;
  private map: any;
  private route: MathRoute;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fileManager: File) { }

  ionViewDidEnter() {
    console.log('TasksMap ionViewDidEnter()');
    this.route = this.navParams.get('route');
    this.route.initTasks().then(() => {
      this.loadMap();
      this.initializeMap();
    })
  }

  markerGroup: any = null;

  async initializeMap() {
    let dbHandler = DB_Handler.getInstance();
    if (this.markerGroup != null) {
      console.warn('removing markerGroup');
      this.map.removeLayer(this.markerGroup);
      this.markerGroup = null;
    }
    let map = this.map;
    let test = this.route.getTasks();
    test.forEach(task => {
      let marker: any = L.marker([task.Lat, task.Lon]).on('click', () => {
        // let imageFileName = task.getInfo("image").replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "")
        // this.fileManager.readAsDataURL(this.fileManager.dataDirectory, imageFileName)
        //   .then(imageData => this.route.thumbImage = imageData, imageError => {
        //     console.error("Error making image DataURL:", imageError);
        //     // TODO: default empty image holder
        //   })
        //   .catch(error => {
        //     console.error("Error making image DataURL:", JSON.stringify(error));
        //     // TODO: default empty image holder
        //   })
        // this.routeDetails = row;
      })

      marker.bindPopup(`<h2>${task.getInfo("title")}</h2><p>${task.getInfo("description")}</p>`);
      map.addLayer(marker);
    })
  }

  loadMap() {
    const center = [50.1208566, 8.66158515]; // Frankfurt-am Main
    let mapquestUrl = `http://{s}.tiles.mapbox.com/v4/${Helper.mapCode}/{z}/{x}/{y}.png?access_token=${Helper.accessToken}`
    let subDomains = ['a', 'b', 'c', 'd'];

    //[[38.4298915,27.1227443],[38.4129794,27.1416646]]
    // const corner1 = L.latLng(38.4313915, 27.1212443)
    // const corner2 = L.latLng(38.4114794, 27.1431646)
    // const bbox = JSON.parse(this.route.bounding_box);
    // const corner1 = bbox[0];
    // const corner2 = bbox[1];
    // const bounds: L.latLngBounds = L.latLngBounds(corner1, corner2)


    if (this.map == null) {
      this.map = L.map('tasks-map', {
        // center: center,
        zoom: 18
      });
      this.map.fitBounds(this.route.ViewBoundingBox);
      // this.map.setZoom(18);
      this.map.on('click', e => {
        //check if details open and reset content. for now just reset content
        // this.routeDetails = null;
        console.log('do nothing for now');
      })
      let map = this.map;
      tilesDb.initialize().then(() => {
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