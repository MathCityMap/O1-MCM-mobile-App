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
import { Score } from '../../../../entity/Score';

import { DeepLinker } from 'ionic-angular/navigation/deep-linker';

import {gpsService} from  '../../../../services/gps-service';
import { ModalsService } from '../../../../services/modals-service';
import { Geolocation } from '@ionic-native/geolocation';
import 'leaflet-rotatedmarker';
import 'conic-gradient';

import { ImagesService } from '../../../../services/images-service';
import { Storage } from '@ionic/storage';

declare var ConicGradient: any;

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
  private taskList: Task[];

  private state: State = {
      selectedTask: null,
      isShowingAllTasks: false,
      visibleTasks : {},
      skippedTaskIds: [],
      selectedStartTask: false
  };
  private score: Score;
  private stateKey: string = "savedMapStateByRoute";
  private taskToSkip: Task= null;

    taskOpenIcon;
    taskSkippedIcon;
    taskDoneIcon;
    taskDonePerfectIcon;
    taskFailedIcon;

    userPositionIcon;
    userMarker: any;
    prevPos: any;

    currentScore: any;

    clusterClass2Color = {
        open: '#036D99',
        skipped: '#B2B2B2',
        done: '#F3B100',
        donePerfect: '#4CAF50',
        failed: '#E62B25',
    };

    user = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService,
    private deepLinker: DeepLinker,
    private gpsService: gpsService,
    private modalService: ModalsService,
    private geolocation: Geolocation,
    private imagesService: ImagesService,
    private storage: Storage
  ) {
      this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [38, 41], className:'marker'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
      this.taskOpenIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-open.png' , iconSize: [35, 48], className:'marker', shadowUrl: 'assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskOpenIcon.clusterClass = 'open';
      this.taskSkippedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-skipped.png' , iconSize: [35, 48], className:'marker'});
      this.taskSkippedIcon.clusterClass = 'skipped';
      this.taskDoneIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done.png' , iconSize: [35, 48], className:'marker', shadowUrl: 'assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskDoneIcon.clusterClass = 'done';
      this.taskDonePerfectIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done-perfect.png' , iconSize: [35, 48], className:'marker', shadowUrl: 'assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskDonePerfectIcon.clusterClass = 'donePerfect';
      this.taskFailedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-failed.png' , iconSize: [35, 48], className:'marker', shadowUrl: 'assets/icons/icon_taskmarker-shadow.png', shadowSize: [35, 48]});
      this.taskFailedIcon.clusterClass = 'failed';
  }


  async ionViewWillEnter() {

    console.log('TasksMap ionViewWillEnter()');
    this.routeId = this.navParams.get('routeId');
    this.route = await this.ormService.findRouteById(this.routeId);
    this.user = await this.ormService.getActiveUser();
    this.score = this.route.getScoreForUser(this.user);
    console.log(this.score);
    console.log(this.taskToSkip);
    if (this.navParams.data.tasksMapState) {
        this.state = this.navParams.data.tasksMapState;
        if(this.taskToSkip || (this.state.selectedStartTask && (this.score.getTasksSolved().indexOf(this.state.selectedTask.id) > -1 || this.score.getTasksSolvedLow().indexOf(this.state.selectedTask.id) > -1))){
            this.goToNextTask(this.state.selectedTask, true);
        }
    } else {
        this.state = await this.getMapStateFromLocalStorage();
        if(this.taskToSkip){
            this.goToNextTask(this.taskToSkip, true);
            this.taskToSkip = null;
        }
        console.log('mapState ',this.state);
        if( !this.state){
            // attach state to navParams so that state is restored when moving back in history (from task detail view)
            this.state = this.navParams.data.tasksMapState = {
                selectedTask: this.navParams.get("selectedTask"),
                isShowingAllTasks: false,
                visibleTasks: {},
                skippedTaskIds: [],
                selectedStartTask: false
            };
            this.state.isShowingAllTasks = !this.state.selectedTask;
            if (this.state.selectedTask) {
                this.state.visibleTasks[this.state.selectedTask.position] = true;
            }
            const that = this;
            setTimeout(function() {
                that.modalService.showDialog('a_guided_trail_title', 'a_guided_trail',
                    'no', () => {},
                    'yes', () => {
                        that.selectStartPoint();
                        that.state.selectedStartTask = true;
                    });
            }, 500);
        }
    }
    await this.loadMap();
    this.initializeMap();
  }

  markerGroup: any = null;

   async initializeMap() {
      this.currentScore = this.score.score;
      this.redrawMarker();
      this.gpsService.isLocationOn();
      // This should fix the gray tiles and missing marker issue on android
      if(this.map != null){
          this.map.invalidateSize();
      }
  }


    async getMapStateFromLocalStorage(){
      let mapState = await this.storage.get(this.stateKey);
      if(mapState && mapState[this.routeId]){
          let state = mapState[this.routeId];
          state.selectedTask = this.navParams.get("selectedTask");
          return state;
      }
      return null;
  }

  async ionViewWillLeave(){
      let mapState = await this.storage.get(this.stateKey);
      if(!mapState){
          mapState = {};
      }
      mapState[this.routeId] = this.state;
      this.storage.set(this.stateKey, mapState);
  }




  async redrawMarker(){
    if (this.markerGroup != null) {
        console.warn('removing markerGroup');
        this.map.removeLayer(this.markerGroup);
        this.markerGroup = null;
    }
    let that = this;
    let markerGroup = (L as any).markerClusterGroup({
        maxClusterRadius: 30,
        iconCreateFunction: function (cluster) {
            let childCount = cluster.getChildCount();
            let markers = cluster.getAllChildMarkers();
            let className = 'marker-cluster marker-cluster-';
            if (childCount < 10) {
                className += 'small';
            } else if (childCount < 100) {
                className += 'medium';
            } else {
                className += 'large';
            }
            let classOccurrences = {};
            let numberOfColoredMarkers = 0;
            markers.map(marker => {
                // append all cluster classes from child markers to class name
                if (marker.options.icon.clusterClass && className.indexOf(marker.options.icon.clusterClass) === -1) {
                    className += ' ' + marker.options.icon.clusterClass;
                }
                if (marker.options.icon.clusterClass) {
                    numberOfColoredMarkers++;
                    if (classOccurrences[marker.options.icon.clusterClass]) {
                        classOccurrences[marker.options.icon.clusterClass] += 1;
                    } else {
                        classOccurrences[marker.options.icon.clusterClass] = 1;
                    }
                }
            });
            let stops = '';
            let alreadyFilledPercentage = 0;
            Object.keys(classOccurrences).map(key => {
               let n = classOccurrences[key];
               let percentage = Math.round(n / numberOfColoredMarkers * 100);
               if (alreadyFilledPercentage > 0) {
                   stops += ', ';
               }
               alreadyFilledPercentage += percentage;
               stops += `${that.clusterClass2Color[key]} 0 ${alreadyFilledPercentage}%`
            });

            let gradient = new ConicGradient({
                stops: stops,
                size: 24
            });
            return new L.DivIcon({
                html: `<div style="background-image: url(${gradient.png})"><span>${childCount}</span></div>`,
                className: className,
                iconSize: new L.Point(40, 40)
            });
        },
    });

    this.taskList = await this.route.getTasks();

    for(let i = 0; i < this.taskList.length; i++){
        let task: Task = this.taskList[i];
        if (!this.state.isShowingAllTasks && !this.state.visibleTasks[task.position]) {
            continue;
        }
        let icon = this.taskOpenIcon;
        if(this.score.getTasksSolved().indexOf(task.id) > -1){
            icon = this.taskDonePerfectIcon;
        }else if(this.score.getTasksSolvedLow().indexOf(task.id) > -1){
            icon = this.taskDoneIcon;
        }else  if(this.score.getTasksFailed().indexOf(task.id) > -1){
            icon = this.taskFailedIcon;
        }else if(this.state.skippedTaskIds.indexOf(task.id) > -1){
          icon = this.taskSkippedIcon;
      }
      markerGroup.addLayer(L.marker([task.lat, task.lon], {icon: icon}).on('click', () => {
          if (this.state.selectedTask == task) {
              this.gototask(task.id, task.title);
          } else {
              this.state.selectedTask = task;
              this.map.panTo( [task.lat, task.lon] );
          }
      }));
    }
    this.map.addLayer(markerGroup);
    this.markerGroup = markerGroup;
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
              zoom: 18,
              maxBounds: this.route.getBoundingBoxLatLng()
          });
          this.map.fitBounds(this.route.getViewBoundingBoxLatLng());
          // this.map.setZoom(18);
          this.map.on('click', e => {
              //check if details open and reset content. for now just reset content
              // this.routeDetails = null;
              this.state.selectedTask = null;
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

                        let watch = this.geolocation.watchPosition();
                        watch.subscribe(resp => {  
                            if (resp && resp.coords) {
                                Helper.myLocation = resp;
                                console.log(`Coordinates: ${JSON.stringify(resp)}`);
                                const lanlng = new L.LatLng(resp.coords.latitude, resp.coords.longitude);
                                this.userMarker.setLatLng(lanlng);   
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
                });

          const tiles = this.ormService.getTileURLsAsObject(this.route);
          let that = this;
          offlineLayer.getTileUrl = function (coords) {
              var url = (L.TileLayer.prototype as any).getTileUrl.call(this, coords);
              var dbStorageKey = this._getStorageKey(url);

              if (tiles[dbStorageKey]) {
                  return Promise.resolve(that.imagesService.getOfflineURL(dbStorageKey));
              }
              return Promise.resolve(url);

          };

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
          if(this.state.selectedTask != null){
            this.centerSelectedTask()
            /* todo: show only selectedTask */
          }
      }
  }

  centerSelectedTask(){
    this.map.panTo( [this.state.selectedTask.lat, this.state.selectedTask.lon] );
  }

  goToNextTaskById(taskId: number, skip?: boolean){
      this.taskList.forEach(task => {
            if(task.id == taskId){
                this.goToNextTask(task, skip);
                return;
            }
      });
  }

  goToNextTask(task: Task, skip?: boolean){
    if(skip){
        this.state.skippedTaskIds.push(task.id);
    }
    // task.position == index + 1
    this.state.selectedTask = this.taskList[task.position % this.taskList.length];
    this.state.visibleTasks[this.state.selectedTask.position] = true;
    this.redrawMarker();
    this.centerSelectedTask();

  }

  selectStartPoint(){
    /* open the damn modal again */
    let _this = this;
    this.modalService.presentTaskListModal(this.route, this.navCtrl, function(selectedTask: Task){
            console.log("back in tasksMap");
            _this.state.selectedTask = selectedTask;
            _this.state.visibleTasks = {};
            _this.state.visibleTasks[selectedTask.position] = true;
            _this.state.isShowingAllTasks = false;
            _this.centerSelectedTask();
            _this.redrawMarker();
    });
    /* this.showOnlyCurrentlySelectedTadk(); */
    /*   */
  }

  showAllTasks() {
      this.state.isShowingAllTasks = true;
      this.redrawMarker();
  }

  resetTasks() {
      this.modalService.showDialog('a_route_detail_settings_resetTasks', 'a_route_detail_settings_resetTasks_msg',
          'no', () => {},
          'yes', () => {
              this.ormService.deleteUserScore(this.score).then( ()=> {
                  this.score = new Score();
                  this.redrawMarker();
              });
          });
  }

  async gototask(taskId: number, taskName: string) {
    console.log('taskId', taskId);
    let that = this;
    this.navCtrl.push('TaskDetail', {taskId: taskId, headerTitle: taskName, routeId: this.routeId, goToNextTaskById: function(taskIdToSkip: number, skip?: boolean){
            that.goToNextTaskById(taskIdToSkip, skip);
        }}, {}, () => {
      // necessary because of bug which does not update URL
      this.deepLinker.navChange('forward');
    });
  }

}
interface State {
    selectedTask: Task;
    isShowingAllTasks: boolean;
    visibleTasks: any;
    skippedTaskIds: number[];
    selectedStartTask: boolean;
}
