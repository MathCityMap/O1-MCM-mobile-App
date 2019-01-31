import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
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

import { GpsService} from  '../../../../services/gps-service';
import { ModalsService } from '../../../../services/modals-service';
import 'leaflet-rotatedmarker';
import 'conic-gradient';

import { ImagesService } from '../../../../services/images-service';
import { Storage } from '@ionic/storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { MCMModalType } from "../../../../app/app.component";
import { MCMIconModal } from "../../../../modals/MCMIconModal/MCMIconModal";
import { ModalController} from "ionic-angular/components/modal/modal-controller";
import { MCMSessionFinishedModal} from "../../../../modals/MCMSessionFinishedModal/MCMSessionFinishedModal";
import { ChatPage } from "../../../chat/chat";
import { ChatAndSessionService, SessionInfo } from '../../../../services/chat-and-session-service';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';


declare var ConicGradient: any;

@IonicPage({
  segment: 'TasksMap/:routeId'
})
@Component({
  selector: 'page-tasks-map',
  templateUrl: 'TasksMap.html'
})
export class TasksMap implements OnInit, OnDestroy {
    @ViewChild('tasks-map') mapContainer: ElementRef;
  private map: any;
  private routeId: number;
  private route: Route;
  private taskList: Task[];

  private state: TaskMapState = {
      selectedTask: null,
      isShowingAllTasks: false,
      visibleTasks : {},
      skippedTaskIds: [],
      selectedStartTask: false
  };
  private score: Score;
  private stateKey: string = "savedMapStateByRoute";
  private taskToSkip: Task= null;
  private gamificationIsDisabled = false;

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
    private sessionInfo: SessionInfo;
    private sessionSubscription: Subscription;
    private watchSubscription: Subscription;

    private countdownOrTimerForSession: number;
    private countdownBeforeSession: boolean = false;
    private startInterval: boolean = false;
    private showCountdownOrTimer: boolean = false;
    private refreshIntervalId: any = null;
    private showSessionEnds: boolean = false;
    private taskBlocked: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ormService: OrmService,
    private deepLinker: DeepLinker,
    private gpsService: GpsService,
    private modalsService: ModalsService,
    private imagesService: ImagesService,
    private storage: Storage,
    private spinner: SpinnerDialog,
    private modalCtrl: ModalController,
    private chatAndSessionService: ChatAndSessionService,
  ) {
      this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [100, 100], iconAnchor: [50, 50], className:'marker userPosition'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
      this.taskOpenIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-open.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
      this.taskOpenIcon.clusterColor = '#036D99';
      this.taskSkippedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-skipped.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
      this.taskSkippedIcon.clusterColor = '#B2B2B2';
      this.taskDoneIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
      this.taskDoneIcon.clusterColor = '#F3B100';
      this.taskDonePerfectIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done-perfect.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
      this.taskDonePerfectIcon.clusterColor = '#4CAF50';
      this.taskFailedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-failed.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
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
                      modal.dismiss().then(() => {
                          that.route.completed = true;
                          that.ormService.saveAndFireChangedEvent(that.route);
                      });
                  }
              }
          ]}, {showBackdrop: true, enableBackdropDismiss: true});
      modal.present();
  }


  async ionViewWillEnter() {
    console.log('TasksMap ionViewWillEnter()');
    console.log(this.navCtrl);
    this.routeId = this.navParams.get('routeId');
    this.route = await this.ormService.findRouteById(this.routeId);
    this.gamificationIsDisabled = this.route.isGamificationDisabled();
    this.user = await this.ormService.getActiveUser();
    this.score = this.route.getScoreForUser(this.user);
    this.updateSession(await this.chatAndSessionService.getActiveSession());

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
        console.debug('mapState ',this.state);
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
                that.modalsService.showDialog('a_guided_trail_title', 'a_guided_trail',
                    'no', () => {},
                    'yes', async () => {
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

    // Add event of user entering trail when session active
      if(this.sessionInfo != null){
          let details = JSON.stringify({});
          this.chatAndSessionService.addUserEvent("event_trail_opened", details, "0");
      }
  }

    ngOnInit() {
      console.log(this.navCtrl);
        this.sessionSubscription = this.chatAndSessionService.getSubject().subscribe(this.updateSession);
    }

    ngOnDestroy() {
        if (this.sessionSubscription) {
            this.sessionSubscription.unsubscribe();
            this.sessionSubscription = null;
        }
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }

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

    updateSession(sessionInfo: SessionInfo) {
        if (sessionInfo && sessionInfo.session) {
            if (this.routeId != sessionInfo.session.trail_id) {
                console.log(`active session belongs to different trail`);
                this.sessionInfo = null;
            } else {
                console.log('active session: ' + sessionInfo.session.code);
                this.sessionTime(sessionInfo.session);
                if (this.startInterval == true) {
                    this.refreshIntervalId = setInterval(() => {
                        this.sessionTime(sessionInfo.session);
                    }, 15000)
                }
                this.sessionInfo = sessionInfo;
            }
        } else {
            console.log('no active session');
            this.sessionInfo = null;
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

  async saveMapStateToLocalStorage(){
      let mapState = await this.storage.get(this.stateKey);
      if(!mapState){
          mapState = {};
      }
      mapState[this.routeId] = this.state;
      this.storage.set(this.stateKey, mapState);
  }

  async ionViewWillLeave(){
    this.saveMapStateToLocalStorage();
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

        let removeTaskFromSkippedArray = true;
        if(this.score.getTasksSolved().indexOf(task.id) > -1){
            icon = this.taskDonePerfectIcon;
        }else if(this.score.getTasksSolvedLow().indexOf(task.id) > -1){
            icon = this.taskDoneIcon;
        }else  if(this.score.getTasksFailed().indexOf(task.id) > -1){
            icon = this.taskFailedIcon;
        }else if(this.state.skippedTaskIds.indexOf(task.id) > -1){
          icon = this.taskSkippedIcon;
          removeTaskFromSkippedArray = false;
      }
      if (removeTaskFromSkippedArray && this.state.skippedTaskIds.indexOf(task.id) > -1) {
            // remove task from skipped array
            this.state.skippedTaskIds.splice(this.state.skippedTaskIds.indexOf(task.id), 1);
      }
      markerGroup.addLayer(L.marker([task.lat, task.lon], {icon: icon}).on('click', () => {
          if (this.state.selectedTask == task) {
              this.gototask(task.id, task.title);
          } else {
              // Add event of user entering trail when session active
              if(this.sessionInfo != null){
                  let details = JSON.stringify({});
                  this.chatAndSessionService.addUserEvent("event_task_previewed", details, task.id.toString());
              }
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
              attributionControl: false,
              zoom: 18,
              trackResize: false, // if map gets resized when not visible (when keyboard shows up) it can get into undefined state
              maxBounds: this.route.getBoundingBoxLatLng()
          });
          L.control.attribution({position: 'bottomleft', prefix: 'Leaflet'}).addTo(this.map);
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
              attribution: '&copy; mapbox.com',
              subdomains: subDomains,
              minZoom: Helper.min_zoom,
              maxZoom: Helper.max_zoom,
              tileSize: 256,
              crossOrigin: true,
              detectRetina: true
          });

          this.gpsService.getCurrentPosition()
                .then(resp => {
                    if (resp && resp.coords) {
                        console.debug('found you');
                        // let markerGroup = L.featureGroup();

                        this.userMarker = L.marker([resp.coords.latitude, resp.coords.longitude], {icon: this.userPositionIcon}).on('click', () => {
                            // alert('Marker clicked');
                        });
                        this.userMarker.setRotationOrigin('center center');
                        this.userMarker.addTo(this.map);

                        if (this.watchSubscription) {
                            this.watchSubscription.unsubscribe();
                        }
                        this.watchSubscription = this.gpsService.watchPosition().subscribe(resp => {
                            if (resp && resp.coords) {
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
              console.debug(data);
              console.debug('Saving ' + data.nTilesToSave + ' tiles.');
          });

          offlineLayer.on('offline:save-end', function () {
              alert('All the tiles were saved.');
          });

          offlineLayer.on('offline:save-error', function (err) {
              console.error('Error when saving tiles: ' + err);
          });

          offlineLayer.on('offline:remove-start', function () {
              console.debug('Removing tiles.');
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
   //  setTimeout(async () => {
    if(skip){
        this.state.skippedTaskIds.push(task.id);
    }
    // task.position == index + 1
    this.state.selectedTask = this.taskList[task.position % this.taskList.length];
    this.state.visibleTasks[this.state.selectedTask.position] = true;
    //this.redrawMarker();
    this.centerSelectedTask();
    this.saveMapStateToLocalStorage();
   // }, 200);
  }

  async selectStartPoint(){
    /* open the damn modal again */
    let that = this;
    this.modalsService.presentTaskListModal(this.route, this.score, this.state, this.navCtrl, function(selectedTask: Task){
            console.debug("back in tasksMap");
            that.state.selectedTask = selectedTask;
            that.state.visibleTasks = {};
            that.state.visibleTasks[selectedTask.position] = true;
            that.state.isShowingAllTasks = false;
            that.centerSelectedTask();
            that.redrawMarker();
            if(that.sessionInfo != null){
            let details = JSON.stringify({title: that.state.selectedTask.title});
            that.chatAndSessionService.addUserEvent("event_trail_start_from_task", details, that.state.selectedTask.id.toString());
        }
    });
    /* this.showOnlyCurrentlySelectedTadk(); */
    /*   */
  }

  showAllTasks() {
      this.state.isShowingAllTasks = true;
      this.redrawMarker();
  }

  resetTasks() {
      this.modalsService.showDialog('a_route_detail_settings_resetTasks', 'a_route_detail_settings_resetTasks_msg',
          'no', () => {},
          'yes', () => {
              this.ormService.deleteUserScore(this.score).then( async ()=> {
                  this.score = new Score();
                  this.state.skippedTaskIds = [];
                  this.route.completed = false;
                  await this.ormService.saveAndFireChangedEvent(this.route);
                  this.redrawMarker();
              });
          });
  }

  async sessionFinished() {
      this.modalsService.showDialog('a_private_session_quit', 'a_private_session_quit_text',
          'no', () => {},
          'yes', () => {
              let modal = this.modalCtrl.create(MCMSessionFinishedModal,
                  {
                      session: this.sessionInfo.session,
                      score: this.score,
                      tasks: this.taskList
                  });
              modal.present();
              if(this.sessionInfo != null){
                  let details = JSON.stringify({});
                  this.chatAndSessionService.addUserEvent("event_session_leave", details, "0");
              }
              this.chatAndSessionService.exitActiveSession();
              clearInterval(this.refreshIntervalId);

          });

      // btn = () => {
      //     this.navCtrl.push('TasksMap', {'routeId' : this.route.id});
      // };
  }

  async gototask(taskId: number, taskName: string) {
    console.debug('taskId', taskId);
    let that = this;
    this.navCtrl.push('TaskDetail', {taskId: taskId, headerTitle: taskName, routeId: this.routeId, goToNextTaskById: function(taskIdToSkip: number, skip?: boolean){
            that.goToNextTaskById(taskIdToSkip, skip);
        }}, {}, () => {
      // necessary because of bug which does not update URL
      this.deepLinker.navChange('forward');
    });
  }

  async navigateToChat() {
      console.debug('showChat');
      if(this.sessionInfo != null){
          let details = JSON.stringify({});
          this.chatAndSessionService.addUserEvent("event_trail_chat_open", details, "0");
      }
    this.navCtrl.push(ChatPage, {
        val: 'chatseite',
        headerTitle: this.sessionInfo.session.name
    });

  }

    private sessionTime(session) {
        if (!session) {
            this.startInterval = false;
            return;
        }

        let currentTimeUnix = moment().unix();
        let startTimeInUnix = moment(session.starts_at).unix();
        let endTimeInUnix = moment(session.ends_at).unix();
        let countdown = startTimeInUnix - currentTimeUnix;
        let countdownInMin = Math.floor(countdown / 60);
        let timerInMin = Math.floor((endTimeInUnix -currentTimeUnix) / 60);

        if (currentTimeUnix > (startTimeInUnix - 3600) && currentTimeUnix < endTimeInUnix) {
            this.startInterval = true;
            if (currentTimeUnix < startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownBeforeSession = true;
                this.countdownOrTimerForSession = countdownInMin;
                this.taskBlocked = true;
            }
            if (currentTimeUnix > startTimeInUnix && currentTimeUnix < endTimeInUnix ) {
                this.showCountdownOrTimer = true;
                this.countdownOrTimerForSession = timerInMin;
                this.countdownBeforeSession = false;
            }
        } else {
            this.startInterval = false;
            clearInterval(this.refreshIntervalId);
            this.showSessionEnds = true;
            this.taskBlocked = false;
            return;
        }

    }
}

export interface TaskMapState {
    selectedTask: Task;
    isShowingAllTasks: boolean;
    visibleTasks: any;
    skippedTaskIds: number[];
    selectedStartTask: boolean;
}
