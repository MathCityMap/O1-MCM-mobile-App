import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as L from 'leaflet';
// import 'leaflet.markercluster';
import 'leaflet-offline';

import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { Task } from '../../../../entity/Task';

@IonicPage({
  segment: 'TasksMap/:routeId'
})
@Component({
  selector: 'page-tasks-map',
  templateUrl: 'TasksMap.html'
})
export class TasksMap {
  @ViewChild('tasks-map') mapContainer: ElementRef;
  private map: any;
  private routeId: number;
  private route: Route;
  private showPopup: boolean = false;
  private selectedTask: Task;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService
  ) { }

  async ionViewDidEnter() {
    console.log('TasksMap ionViewDidEnter()');
    this.routeId = this.navParams.get('routeId');
    this.route = await this.ormService.findRouteById(this.routeId);
    this.loadMap();
    this.initializeMap();
  }

  markerGroup: any = null;

  async initializeMap() {
    if (this.markerGroup != null) {
      console.warn('removing markerGroup');
      this.map.removeLayer(this.markerGroup);
      this.markerGroup = null;
    }
    let map = this.map;
    let test = this.route.tasks;
    test.forEach(task => {
      let marker: any = L.marker([task.lat, task.lon]).on('click', () => {
        console.log('You clicked a marker')
        this.selectedTask = task;
        console.log(task);
        console.log(task.getHint1());
      })
      map.addLayer(marker);
    })
  }

  loadMap() {
    const center = [50.1208566, 8.66158515]; // Frankfurt-am Main
    let mapquestUrl = Helper.mapquestUrl
    let subDomains = Helper.subDomains

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
      this.map.fitBounds(this.route.getViewBoundingBoxLatLng());
      // this.map.setZoom(18);
      this.map.on('click', e => {
        //check if details open and reset content. for now just reset content
        // this.routeDetails = null;
        this.selectedTask = null;
      })
      let map = this.map;
      tilesDb.initialize().then(() => {
        let offlineLayer = (L.tileLayer as any).offline(mapquestUrl, tilesDb, {
          attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
          subdomains: subDomains,
          minZoom: 15,
          maxZoom: 19,
          tileSize: 256,
          crossOrigin: true,
          detectRetina: true
        });

        offlineLayer.addTo(map);
        this.map.fitBounds(this.route.getViewBoundingBoxLatLng());

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

  async gototask(taskId: number) {
    console.log('taskId', taskId);
    this.navCtrl.push('TaskDetail', {taskId: taskId});
  }

}