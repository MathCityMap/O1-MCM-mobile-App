import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';

import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

import { OrmService } from '../../../../services/orm-service';
import { Route } from '../../../../entity/Route';
import { Task } from '../../../../entity/Task';
import { DeepLinker } from 'ionic-angular/navigation/deep-linker';

import {gpsService} from  '../../../../services/gps-service';

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
  private selectedTask: Task;

    taskOpenIcon;
    taskSkippedIcon;
    taskDoneIcon;
    taskDonePerfectIcon;
    taskFailedIcon;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService,
    private deepLinker: DeepLinker,
    private gpsService: gpsService
  ) {
      this.taskOpenIcon = L.icon({iconUrl:'../../../../assets/icons/icon_taskmarker-open.png' , iconSize: [35, 48], className:['marker'], shadowUrl: '../../../../assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskSkippedIcon = L.icon({iconUrl:'../../../../assets/icons/icon_taskmarker-skipped.png' , iconSize: [35, 48], className:['marker'], shadowUrl: '../../../../assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskDoneIcon = L.icon({iconUrl:'../../../../assets/icons/icon_taskmarker-done.png' , iconSize: [35, 48], className:['marker'], shadowUrl: '../../../../assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskDonePerfectIcon = L.icon({iconUrl:'../../../../assets/icons/icon_taskmarker-done-perfect.png' , iconSize: [35, 48], className:['marker'], shadowUrl: '../../../../assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskFailedIcon = L.icon({iconUrl:'../../../../assets/icons/icon_taskmarker-failed.png' , iconSize: [35, 48], className:['marker'], shadowUrl: '../../../../assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
  }

  async ionViewWillEnter() {
    console.log('TasksMap ionViewWillEnter()');
    this.routeId = this.navParams.get('routeId');
    this.route = await this.ormService.findRouteById(this.routeId);
    this.selectedTask = this.navParams.get("selectedTask");
    await this.loadMap();
    this.initializeMap();
  }

  markerGroup: any = null;

  async initializeMap() {
      if (this.markerGroup != null) {
          console.warn('removing markerGroup');
          this.map.removeLayer(this.markerGroup);
          this.markerGroup = null;
      }
      let markerGroup = (L as any).markerClusterGroup({
          maxClusterRadius: 30
      });
      (await this.route.getTasks()).forEach(task => {
          markerGroup.addLayer(L.marker([task.lat, task.lon], {icon: this.taskOpenIcon}).on('click', () => {
              this.selectedTask = task;
          }));
      })
      this.map.addLayer(markerGroup);
      this.markerGroup = markerGroup;
      this.gpsService.isLocationOn();
  }

  async loadMap() {
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
          await tilesDb.initialize();
          let offlineLayer = (L.tileLayer as any).offline(mapquestUrl, tilesDb, {
              attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
              subdomains: subDomains,
              minZoom: 15,
              maxZoom: 21,
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

                    //centers map in the selected task
          if(this.selectedTask != null) this.map.panTo( [this.selectedTask.lat, this.selectedTask.lon] );
      }
  }

  async gototask(taskId: number, taskName: string) {
    console.log('taskId', taskId);
    this.navCtrl.push('TaskDetail', {taskId: taskId, headerTitle: taskName, routeId: this.routeId}, {}, () => {
      // necessary because of bug which does not update URL
      this.deepLinker.navChange('forward');
    });
  }

}