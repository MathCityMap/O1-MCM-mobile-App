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
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import {MCMModalType} from "../../../../app/app.component";
import {MCMIconModal} from "../../../../modals/MCMIconModal/MCMIconModal";
import {ModalController} from "ionic-angular/components/modal/modal-controller";

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
    private storage: Storage,
    private spinner: SpinnerDialog,
    private modalCtrl: ModalController
  ) {
      this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [38, 41], className:'marker'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
      this.taskOpenIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-open.png' , iconSize: [35, 48], className:'marker'});
      this.taskOpenIcon.clusterColor = '#036D99';
      this.taskSkippedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-skipped.png' , iconSize: [35, 48], className:'marker'});
      this.taskSkippedIcon.clusterColor = '#B2B2B2';
      this.taskDoneIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done.png' , iconSize: [35, 48], className:'marker'});
      this.taskDoneIcon.clusterColor = '#F3B100';
      this.taskDonePerfectIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done-perfect.png' , iconSize: [35, 48], className:'marker'});
      this.taskDonePerfectIcon.clusterColor = '#4CAF50';
      this.taskFailedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-failed.png' , iconSize: [35, 48], className:'marker'});
      this.taskFailedIcon.clusterColor = '#E62B25';
  }

  isTrailCompleted(){
      return this.score.getTasksSolved().length + this.score.getTasksSolvedLow().length + this.score.getTasksFailed().length == this.taskList.length;
  }

  showTrailCompletedAlert(){
      let that = this;
      let modal = this.modalCtrl.create(MCMIconModal,  {
          title: 'a_alert_congrats',
          message: 'a_alert_congrats_msg',
          modalType: MCMModalType.solved,
          param: {TITLE: this.route.title},
          buttons: [
              {
                  title: 'a_alert_close',
                  callback: function(){
                      modal.dismiss().then(() =>{
                          that.ormService.markRouteAsCompleted(that.route);

                      });
                  }
              }
          ]}, {showBackdrop: true, enableBackdropDismiss: true});
      modal.present();
  }

  async ionViewWillEnter() {
    console.log('TasksMap ionViewWillEnter()');
    this.routeId = this.navParams.get('routeId');
    this.route = await this.ormService.findRouteById(this.routeId);
    this.user = await this.ormService.getActiveUser();
    this.score = this.route.getScoreForUser(this.user);


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
    setTimeout(async () => {
        // adding markers immediately after map initialization caused marker cluster problems -> use timeout
        await this.initializeMap();
        this.spinner.hide();
        if(this.isTrailCompleted() && !this.route.completed){
            this.showTrailCompletedAlert();
        }
    }, 100);

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
    if (!this.map) {
      return;
    }
    if (this.markerGroup != null) {
        console.warn('removing markerGroup');
        this.map.removeLayer(this.markerGroup);
        this.markerGroup = null;
    }
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
            let colorOccurrences = {};
            let numberOfColoredMarkers = 0;
            markers.map(marker => {
                if (marker.options.icon.clusterColor) {
                    numberOfColoredMarkers++;
                    if (colorOccurrences[marker.options.icon.clusterColor]) {
                        colorOccurrences[marker.options.icon.clusterColor] += 1;
                    } else {
                        colorOccurrences[marker.options.icon.clusterColor] = 1;
                    }
                }
            });
            let style = '';
            let img = '';
            let colors = Object.keys(colorOccurrences);
            if (colors.length == 1) {
                style=`background-color: ${colors[0]}`;
            } else {
                let stops = '';
                let alreadyFilledPercentage = 0;
                colors.map(color => {
                    let n = colorOccurrences[color];
                    let percentage = Math.round(n / numberOfColoredMarkers * 100);
                    if (alreadyFilledPercentage > 0) {
                        stops += ', ';
                    }
                    alreadyFilledPercentage += percentage;
                    stops += `${color} 0 ${alreadyFilledPercentage}%`
                });

                let gradient = new ConicGradient({
                    stops: stops,
                    size: 24
                });
                img=`<img src="${gradient.png}"></img>`;
            }
            return new L.DivIcon({
                html: `<div style="${style}">${img}<span>${childCount}</span></div>`,
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
    let that = this;
    this.modalService.presentTaskListModal(this.route, this.navCtrl, function(selectedTask: Task){
            console.log("back in tasksMap");
            that.state.selectedTask = selectedTask;
            that.state.visibleTasks = {};
            that.state.visibleTasks[selectedTask.position] = true;
            that.state.isShowingAllTasks = false;
            that.centerSelectedTask();
            that.redrawMarker();
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
                  this.state.skippedTaskIds = [];
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
