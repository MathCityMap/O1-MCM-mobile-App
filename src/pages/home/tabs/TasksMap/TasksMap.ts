import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';

import {Helper} from '../../../../classes/Helper';
import {tilesDb} from '../../../../classes/tilesDb';

import {OrmService} from '../../../../services/orm-service';
import {Route} from '../../../../entity/Route';
import {Task, TaskFormat} from '../../../../entity/Task';
import {Score} from '../../../../entity/Score';

import {DeepLinker} from 'ionic-angular/navigation/deep-linker';

import {GpsService} from '../../../../services/gps-service';
import {ModalsService} from '../../../../services/modals-service';
import 'leaflet-rotatedmarker';
import 'conic-gradient';

import {ImagesService} from '../../../../services/images-service';
import {Storage} from '@ionic/storage';
import {SpinnerDialog} from '@ionic-native/spinner-dialog';
import {MCMModalType, MyApp} from "../../../../app/app.component";
import {MCMIconModal} from "../../../../modals/MCMIconModal/MCMIconModal";
import {MCMIntroModal} from "../../../../modals/MCMIntroModal/MCMIntroModal";
import {ModalController} from "ionic-angular/components/modal/modal-controller";
import {MCMSessionFinishedModal} from "../../../../modals/MCMSessionFinishedModal/MCMSessionFinishedModal";
import {ChatPage} from "../../../chat/chat";
import {ChatAndSessionService, SessionInfo} from '../../../../services/chat-and-session-service';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {Observable} from "rxjs";
import {MCMTrailFinishedModal} from "../../../../modals/MCMTrailFinishedModal/MCMTrailFinishedModal";
import {el} from "@angular/platform-browser/testing/src/browser_util";

declare var ConicGradient: any;

@IonicPage({
    segment: 'TasksMap/:routeId'
})
@Component({
    selector: 'page-tasks-map',
    templateUrl: 'TasksMap.html'
})
export class TasksMap implements OnDestroy {
    @ViewChild('tasks-map') mapContainer: ElementRef;

    private static UPDATE_SESSION_TIME_INTERVAL_IN_SECS: number = 15;

    private map: any;
    private routeId: number;
    protected route: Route;
    private taskList: Task[];

    protected state: TaskMapState = {
        selectedTask: null,
        isShowingAllTasks: false,
        visibleTasks: {},
        skippedTaskIds: [],
        selectedStartTask: false,
        showIntroModal: false,
        showGuidedTrailModal: false
    };
    private score: Score;
    private stateKey: string = "savedMapStateByRoute";
    private taskToSkip: Task = null;
    protected gamificationIsDisabled = false;

    taskOpenIcon;
    taskSkippedIcon;
    taskDoneIcon;
    taskDonePerfectIcon;
    taskFailedIcon;
    taskSavedIcon;
    taskGroupIcon;

    userPositionIcon;
    userPositionArrow;
    userMarker: any;
    prevPos: any;
    isUserInsideMap: boolean = true;

    currentScore: any;
    user = null;
    private sessionInfo: SessionInfo;
    private sessionSubscription: Subscription;
    private watchSubscription: Subscription;

    private countdownOrTimerForSession: number;
    private countdownBeforeSession: boolean = false;
    private startInterval: boolean = false;
    private showCountdownOrTimer: boolean = false;
    private showSessionEnds: boolean = false;
    private taskBlocked: boolean = false;

    private sessionTimeTimer = Observable.interval(TasksMap.UPDATE_SESSION_TIME_INTERVAL_IN_SECS * 1000);
    private sessionTimeSubscription: Subscription;
    private redrawingMarkers = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        private ormService: OrmService,
        private deepLinker: DeepLinker,
        private gpsService: GpsService,
        private modalsService: ModalsService,
        private imagesService: ImagesService,
        private storage: Storage,
        private spinner: SpinnerDialog,
        private modalCtrl: ModalController,
        private app: MyApp,
        protected chatAndSessionService: ChatAndSessionService,
    ) {
        this.chatAndSessionService.init();
        this.events.subscribe('user:kicked', (user) => {
            if (user == 'self') {
                console.log("userKicked");
                this.sessionKicked();
                this.events.unsubscribe('user:kicked', null);
            } else {
                console.log("Someone else was kicked.")
            }
        });
        this.events.subscribe('session:updated', (sessionInfo) => {
            console.log('Session has been updated');
            this.updateSession(sessionInfo);
        });
        this.events.subscribe('user:assigned_task', (taskId) => {
            console.log('User has been assigned task with id: ' + taskId);
            this.sessionInfo.sessionUser.assigned_task_id = taskId;
            this.forceStartFromTask(taskId).then(() => {
                this.redrawMarker();
            });
        });
    }

    isTrailCompleted() {
        if (this.route.isAnswerFeedbackEnabled()) {
            return (this.taskList && this.score.getTasksSolved().length + this.score.getTasksSolvedLow().length + this.score.getTasksFailed().length == this.taskList.length);
        } else {
            return this.score.getTasksSaved() && this.score.getTasksSaved().length == this.taskList.length;
        }
    }

    showTrailCompletedAlert() {
        let that = this;
        let modal = this.modalCtrl.create(MCMTrailFinishedModal,
            {
                score: this.score,
                tasks: this.taskList,
                narrative: this.app.activeNarrative,
                callback: function () {
                    modal.dismiss().then(() => {
                        that.route.completed = true;
                        that.route.completedDate = new Date().toDateString().split(' ').slice(1).join(' ');
                        that.ormService.saveAndFireChangedEvent(that.route);
                    });
                }
            }, {cssClass: this.app.activeNarrative});
        modal.present();
    }


    async ionViewWillEnter() {
        console.log('TasksMap ionViewWillEnter()');
        console.log(this.navCtrl);
        this.routeId = this.navParams.get('routeId');
        console.log(this.routeId);
        this.route = await this.ormService.findRouteById(this.routeId);
        this.gamificationIsDisabled = this.route.isGamificationDisabled();
        this.user = await this.ormService.getActiveUser();
        this.score = this.route.getScoreForUser(this.user);
        let sessionInfo = this.chatAndSessionService.getSessionInfo();
        this.updateSession(sessionInfo);
        this.events.publish('narrativeChange', this.route.getNarrativeName());

        this.updateIcons();

        await this.loadMap();
        setTimeout(async () => {
            // adding markers immediately after map initialization caused marker cluster problems -> use timeout
            await this.initializeMap();
            this.spinner.hide();
            if (this.isTrailCompleted() && !this.route.completed) {
                this.showTrailCompletedAlert();
            }
        }, 100);
    }

    async ionViewDidEnter() {
        console.log('TasksMap ionViewDidEnter()');
        /*
        When a session is active and started the first time:
        Reset all tasks
        If user was automatically assigned a task, display only that task
         */
        if (this.sessionInfo != null) {
            // Add event of user entering trail when session active
            let details = JSON.stringify({});
            this.chatAndSessionService.addUserEvent("event_trail_opened", details, "0");

            if (this.sessionInfo.started === false) {
                this.showAllTasks();
                this.resetTasks();

                if (this.sessionInfo.sessionUser.assigned_task_id != 0) {
                    this.taskList = await this.route.getTasks();
                    await this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id);
                    if (this.route.isNarrativeEnabled()) {
                        this.showIntroModal().then(() => {
                            this.state.showIntroModal = false;
                        })
                    }
                } else {
                    if (this.route.isNarrativeEnabled()) {
                        this.showIntroModal().then(() => {
                            this.state.showIntroModal = false;
                            this.showGuidedTrailModalWithDelay(500);
                        })
                    }
                }

                this.saveMapStateToLocalStorage();
                this.sessionInfo.started = true;
                await this.chatAndSessionService.updateSession(this.sessionInfo);
                await this.redrawMarker();
                return;
            }
        }

        if (this.navParams.data.tasksMapState) {
            console.log("3");
            this.state = this.navParams.data.tasksMapState;
            if (this.taskToSkip || (this.state.selectedStartTask && (this.score.getTasksSolved().indexOf(this.state.selectedTask.id) > -1 || this.score.getTasksSolvedLow().indexOf(this.state.selectedTask.id) > -1))) {
                this.goToNextTask(this.state.selectedTask, true);
            }
        } else {
            this.state = await this.getMapStateFromLocalStorage();
            console.log(this.state);
            if (this.taskToSkip) {
                this.goToNextTask(this.taskToSkip, true);
                this.taskToSkip = null;
            }
            if (!this.state) {
                // attach state to navParams so that state is restored when moving back in history (from task detail view)
                this.state = this.navParams.data.tasksMapState = {
                    selectedTask: this.navParams.get("selectedTask"),
                    isShowingAllTasks: false,
                    visibleTasks: {},
                    skippedTaskIds: [],
                    selectedStartTask: false,
                    showIntroModal: false, // Intro Modal for narratives will be displayed on first start anyway
                    showGuidedTrailModal: false // GuidedTrail Modal will be displayed on first start anyway
                };
                this.state.isShowingAllTasks = !this.state.selectedTask;
                if (this.state.selectedTask) {
                    this.state.visibleTasks[this.state.selectedTask.position] = true;
                } else if (this.route.isNarrativeEnabled()) {
                    this.showIntroModal().then(() => {
                        this.showGuidedTrailModalWithDelay(500);
                    });
                } else {
                    this.showGuidedTrailModalWithDelay(500);
                }
            } else {
                if (this.state.showIntroModal && this.route.isNarrativeEnabled()) {
                    this.showIntroModal().then(() => {
                        const that = this;
                        that.state.showIntroModal = false;
                        this.saveMapStateToLocalStorage();
                        if (this.state.showGuidedTrailModal) {
                            this.showGuidedTrailModalWithDelay(500);
                        }
                    });
                } else if (this.state.showGuidedTrailModal) {
                    this.showGuidedTrailModalWithDelay(500);
                }
            }
        }
        await this.redrawMarker();
    }

    private showGuidedTrailModalWithDelay(delay) {
        const that = this;
        this.state.showGuidedTrailModal = false;
        setTimeout(function () {
            that.modalsService.showDialog('a_guided_trail_title', 'a_guided_trail',
                'no', () => {
                },
                'yes', async () => {
                    that.selectStartPoint();
                    that.state.selectedStartTask = true;
                }, that.app.activeNarrative);
        }, delay);
    }

    private async forceStartFromTask(taskId) {
        if (!this.taskList || this.taskList.length === 0) {
            this.taskList = await this.route.getTasks();
        }
        console.log('Force Start From Task', this.taskList);
        let selectedTask = this.taskList.filter(x => x.id == taskId).pop();
        this.state.selectedTask = selectedTask;
        console.debug("forceStartFromTask");
        this.state.visibleTasks = {};
        this.state.visibleTasks[selectedTask.position] = true;
        this.state.isShowingAllTasks = false;
        this.state.showGuidedTrailModal = false;
        this.centerSelectedTask();
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

        // Unsubscribe events:
        this.events.unsubscribe('user:kicked');
        this.events.unsubscribe('session:updated');
        this.events.unsubscribe('user:assigned_task');
        this.events.publish('narrativeChange', 'default');
    }

    markerGroup: any = null;
    pathGroup: any = null;

    async initializeMap() {
        this.currentScore = this.score.score;
        // await this.redrawMarker();
        this.gpsService.isLocationOn();
        // This should fix the gray tiles and missing marker issue on android
        if (this.map != null) {
            this.map.invalidateSize();
        }
    }

    updateSession(sessionInfo: SessionInfo) {
        console.log(this.routeId);
        console.log(sessionInfo);
        if (sessionInfo && sessionInfo.session) {
            if (this.routeId != sessionInfo.session.trail_id) {
                console.log(`active session belongs to different trail`);
                this.sessionInfo = null;
            } else {
                this.sessionInfo = sessionInfo;
                console.log('active session: ' + sessionInfo.session.code);
                if (this.sessionTimeSubscription) {
                    this.sessionTimeSubscription.unsubscribe();
                }
                this.sessionTime();
                this.sessionTimeSubscription = this.sessionTimeTimer.subscribe(tick => {
                    this.sessionTime();
                });
            }
        } else {
            console.log('no active session');
            this.sessionInfo = null;
        }
    }

    async getMapStateFromLocalStorage() {
        let mapState = await this.storage.get(this.stateKey);
        if (mapState && mapState[this.routeId]) {
            let state = mapState[this.routeId];
            console.log(this.navParams);
            state.selectedTask = this.navParams.get("selectedTask");
            return state;
        }
        return null;
    }

    async saveMapStateToLocalStorage() {
        let mapState = await this.storage.get(this.stateKey);
        if (!mapState) {
            mapState = {};
        }
        mapState[this.routeId] = this.state;
        return this.storage.set(this.stateKey, mapState);
    }

    async ionViewWillLeave() {
        this.saveMapStateToLocalStorage();
    }

    assignedTask() {
        if (this.sessionInfo == null) {
            return false
        } else {
            return this.sessionInfo.session.assign_tasks;
        }
    }


    async redrawMarker() {
        if (this.redrawingMarkers) {
            return;
        }
        this.redrawingMarkers = true;
        if (!this.map) {
            return;
        }
        if (this.markerGroup != null) {
            console.warn('removing markerGroup');
            this.map.removeLayer(this.markerGroup);
            this.markerGroup = null;
        }
        if (this.pathGroup != null) {
            console.warn('removing pathGroup');
            for (let layer of this.pathGroup) {
                this.map.removeLayer(layer);
            }
            this.pathGroup = null;
        }
        // this.map.eachLayer(layer => {
        //     if ((layer instanceof L.Polyline) || (layer instanceof L.Marker)) {
        //         this.map.removeLayer(layer);
        //     }
        // })
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
                    style = `background-color: ${colors[0]}`;
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
                    img = `<img src="${gradient.png}"></img>`;
                }
                return new L.DivIcon({
                    html: `<div style="${style}">${img}<span>${childCount}</span></div>`,
                    className: className,
                    iconSize: new L.Point(40, 40)
                });
            },
        });

        this.taskList = await this.route.getTasks();
        console.log("Task List", this.taskList);

        let geoJSON = this.route.getPathGeoJson();
        let pathGroup = [];

        for (let i = 0; i < this.taskList.length; i++) {
            let task: Task = this.taskList[i];
            if (!this.state.isShowingAllTasks && !this.state.visibleTasks[task.position]) {
                continue;
            }
            let icon = this.taskOpenIcon;

            if (task.taskFormat === TaskFormat.GROUP) {
                // TODO add proper Logic for task Icon
                icon = this.getMarkerForGroup(task);
            } else {
                let removeTaskFromSkippedArray = true;
                if (this.score.getTasksSaved().indexOf(task.id) > -1) {
                    icon = this.taskSavedIcon;
                } else if (this.score.getTasksSolved().indexOf(task.id) > -1) {
                    icon = this.taskDonePerfectIcon;
                } else if (this.score.getTasksSolvedLow().indexOf(task.id) > -1) {
                    icon = this.taskDoneIcon;
                } else if (this.score.getTasksFailed().indexOf(task.id) > -1) {
                    icon = this.taskFailedIcon;
                } else if (this.state.skippedTaskIds.indexOf(task.id) > -1) {
                    icon = this.taskSkippedIcon;
                    removeTaskFromSkippedArray = false;
                }

                if (removeTaskFromSkippedArray && this.state.skippedTaskIds.indexOf(task.id) > -1) {
                    // remove task from skipped array
                    this.state.skippedTaskIds.splice(this.state.skippedTaskIds.indexOf(task.id), 1);
                }
            }
            if (geoJSON) {
                let taskGeoJsons = geoJSON.data.features.filter(data => {
                    //don't match types because some are string and some are numbers for some reason
                    return data.properties.task_id == task.id;
                });
                console.log("GEO JSON", taskGeoJsons, task);
                if (taskGeoJsons) {
                    for (let taskGeoJson of taskGeoJsons) {
                        // for (let coordinateArray of taskGeoJson.geometry.coordinates) {
                        //     coordinateArray = coordinateArray.reverse();
                        // }
                        let GeoJsonLayer = L.geoJSON(taskGeoJson, {
                            style: function (feature) {
                                return {color: feature.properties.color, dashArray: "10 10"};
                            }
                        });
                        // let polyline = new L.Polyline(taskGeoJson.geometry.coordinates, {
                        //     color: taskGeoJson.properties.color,
                        //     dashArray: "10 10"
                        // });
                        this.map.addLayer(GeoJsonLayer);
                        pathGroup.push(GeoJsonLayer);
                    }
                }
            }
            markerGroup.addLayer(L.marker([task.lat, task.lon], {icon: icon}).on('click', () => {
                if (this.state.selectedTask == task) {
                    this.gototask(task.id, task.title, task.taskFormat);
                } else {
                    // Add event of user entering trail when session active
                    if (this.sessionInfo != null) {
                        let details = JSON.stringify({});
                        this.chatAndSessionService.addUserEvent("event_task_previewed", details, task.id.toString());
                    }
                    this.state.selectedTask = task;
                    this.map.panTo([task.lat, task.lon]);
                }
            }));
        }
        // this.map.addLayer(pathGroup);
        this.map.addLayer(markerGroup);
        console.log("MAP AFTER UPDATE", this.map);
        this.markerGroup = markerGroup;
        this.pathGroup = pathGroup;
        this.redrawingMarkers = false;
    }

    async loadMap() {
        //const center = [50.1208566, 8.66158515]; // Frankfurt-am Main
        let mapquestUrl = /*Helper.mapquestUrl*/ this.route.getTilesMap(this.app.activeNarrative);
        let subDomains = this.route.getTilesServerSubdomains(this.app.activeNarrative);//Helper.subDomains;

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

            // TODO: Replace leaflet-mapbox-gl Bridge with native MapboxGl JS implementation
            // (<any>L).mapboxGL({
            //     accessToken: "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww",
            //     style: mapquestUrl,
            //     updateInterval: 0,
            // }).addTo(this.map);

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
            let zoomLevels = Helper.calculateZoom(this.route.getViewBoundingBoxLatLng());
            let offlineLayer = (L.tileLayer as any).offline(mapquestUrl, tilesDb, {
                attribution: '&copy; mapbox.com',
                subdomains: subDomains,
                minZoom: zoomLevels.min_zoom,
                maxZoom: zoomLevels.max_zoom,
                tileSize: 256,
                crossOrigin: true,
                detectRetina: true,
                bounds: this.route.getBoundingBoxLatLng()
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
                                let bBox = this.map.getBounds();
                                if (bBox.contains(lanlng)) {
                                    // User entered visible map bounding box -> Change Icon
                                    if (!this.isUserInsideMap) {
                                        this.userMarker.setIcon(this.userPositionIcon);
                                    }
                                    this.userMarker.setLatLng(lanlng);
                                    //Rotate the user marker
                                    if (this.prevPos != null) {
                                        let angle = Helper.getAngle(this.prevPos, resp.coords);
                                        this.userMarker.setRotationAngle(angle);
                                    }
                                    this.isUserInsideMap = true;
                                } else {
                                    // User left visible map bounding box -> Change icon to arrow
                                    if (this.isUserInsideMap) {
                                        this.userMarker.setIcon(this.userPositionArrow);
                                    }
                                    this.updateUserLocationArrow(lanlng);
                                    this.isUserInsideMap = false;
                                }
                                this.prevPos = resp.coords;
                            }
                        });

                        // Add map listener events
                        this.map.on('moveend', e => {
                            if (!this.isUserInsideMap) {
                                this.updateUserLocationArrow(new L.LatLng(this.prevPos.latitude, this.prevPos.longitude))
                            }
                        });


                    }
                })
                .catch(error => {
                    console.error(`Location error: ${JSON.stringify(error)}`);
                });

            const tiles = this.ormService.getTileURLsAsObject(this.route);
            const resolveOfflineURLsAsTiles = !this.route.isNarrativeEnabled();
            let that = this;
            offlineLayer.getTileUrl = function (coords) {
                var url = (L.TileLayer.prototype as any).getTileUrl.call(this, coords);
                var dbStorageKey = this._getStorageKey(url);

                if (tiles[dbStorageKey]) {
                    return Promise.resolve(that.imagesService.getOfflineURL(dbStorageKey, false, resolveOfflineURLsAsTiles));
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
            if (this.state.selectedTask != null) {
                this.centerSelectedTask()
                /* todo: show only selectedTask */
            }
        }
    }

    /*
    @description: Shows direction arrow pointing towards users geolocation if he isn't inside the current boundaries
    @param userLatLng array - [lat, lng]
     */
    updateUserLocationArrow(userLatLng) {
        if (!userLatLng) {
            return;
        }
        let bBox = this.map.getBounds();
        let alpha = (L as any).GeometryUtil.bearing(this.map.getCenter(), userLatLng);
        let beta = (L as any).GeometryUtil.bearing(this.map.getCenter(), bBox.getNorthEast());
        let dx2 = ((L as any).GeometryUtil.length([bBox.getNorthWest(), bBox.getNorthEast()])) / 2;
        let dy2 = ((L as any).GeometryUtil.length([bBox.getSouthWest(), bBox.getNorthWest()])) / 2;
        let length = 0;

        // fix negative alpha values
        if (alpha < 0) {
            alpha = alpha + 360;
        }

        // Calculate length to bounding box in direction of own position
        if (
            (alpha >= beta && alpha <= (180 - beta)) ||
            (alpha >= (180 + beta) && alpha <= (360 - beta))
        ) {
            length = Math.abs(dx2 / Math.sin(alpha * (Math.PI / 180)));
        } else {
            length = Math.abs(dy2 / Math.cos(alpha * (Math.PI / 180)));
        }
        let closestPoint = (L as any).GeometryUtil.destination(this.map.getCenter(), alpha, 0.90 * length);
        this.userMarker.setLatLng(closestPoint);
        this.userMarker.setRotationAngle(alpha);
    }

    centerSelectedTask() {
        this.map.panTo([this.state.selectedTask.lat, this.state.selectedTask.lon]);
    }

    goToNextTaskById(taskId: number, skip?: boolean) {
        this.taskList.forEach(task => {
            if (task.id == taskId) {
                this.goToNextTask(task, skip);
                return;
            }
        });
    }

    goToNextTask(task: Task, skip?: boolean) {
        if (skip) {
            this.state.skippedTaskIds.push(task.id);
        }
        console.debug("goToNextTask");
        this.state.selectedTask = this.taskList[task.position % this.taskList.length];
        this.state.visibleTasks[this.state.selectedTask.position] = true;
        this.centerSelectedTask();
        this.saveMapStateToLocalStorage();
    }

    async selectStartPoint() {
        /* open the damn modal again */
        let that = this;
        console.log('Active Narrative is: ' + this.app.activeNarrative);
        return this.modalsService.presentTaskListModal(this.route, this.score, this.state, this.app.activeNarrative, this.navCtrl, function (selectedTask: Task) {
            console.debug("back in tasksMap");
            that.state.selectedTask = selectedTask;
            that.state.visibleTasks = {};
            that.state.visibleTasks[selectedTask.position] = true;
            that.state.isShowingAllTasks = false;
            that.centerSelectedTask();
            that.redrawMarker();
            if (that.sessionInfo != null) {
                let details = JSON.stringify({title: that.state.selectedTask.title});
                that.chatAndSessionService.addUserEvent("event_trail_start_from_task", details, that.state.selectedTask.id.toString());
            }
        });
    }

    showAllTasks() {
        this.state.isShowingAllTasks = true;
        this.redrawMarker();
    }

    displayResetTasksModal() {
        this.modalsService.showDialog('a_route_detail_settings_resetTasks', 'a_route_detail_settings_resetTasks_msg',
            'no', () => {
            },
            'yes', async () => {
                await this.resetTasks();
                this.showGuidedTrailModalWithDelay(50);
            }, this.app.activeNarrative);
    }

    resetTasks() {
        return new Promise(resolve => {
            this.ormService.deleteUserScore(this.score).then(async () => {
                this.score = new Score();
                this.state = this.navParams.data.tasksMapState = {
                    selectedTask: null,
                    isShowingAllTasks: true,
                    visibleTasks: {},
                    skippedTaskIds: [],
                    selectedStartTask: false,
                    showIntroModal: true,
                    showGuidedTrailModal: true
                };
                if (!this.taskList) {
                    this.taskList = await this.route.getTasks();
                }
                if (this.sessionInfo != null && this.sessionInfo.sessionUser.assigned_task_id != 0) {
                    await this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id);
                }
                this.route.completed = false;
                this.route.completedDate = null;
                await this.saveMapStateToLocalStorage();
                await this.ormService.saveAndFireChangedEvent(this.route);
                await this.redrawMarker();
                resolve();
            });
        });
    }

    async sessionFinished() {
        this.modalsService.showDialog('a_private_session_quit', 'a_private_session_quit_text',
            'no', () => {
            },
            'yes', () => {
                let modal = this.modalCtrl.create(MCMSessionFinishedModal,
                    {
                        session: this.sessionInfo.session,
                        score: this.score,
                        tasks: this.taskList,
                        narrative: this.app.activeNarrative
                    }, {cssClass: this.app.activeNarrative});
                modal.present();
                if (this.sessionInfo != null) {
                    let details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_session_leave", details, "0");
                }
                this.chatAndSessionService.exitActiveSession();
                if (this.sessionTimeSubscription) {
                    this.sessionTimeSubscription.unsubscribe();
                }
            }, this.app.activeNarrative);
    }

    async sessionKicked() {
        let that = this;
        let modal = this.modalCtrl.create(MCMIconModal, {
            title: 'a_private_session_kicked',
            message: 'a_private_session_kicked_text',
            modalType: MCMModalType.hint,
            type: 'text',
            gamificationEnabled: false,
            narrativeEnabled: this.route.isNarrativeEnabled(),
            narrative: this.app.activeNarrative,
            buttons: [
                {
                    title: 'a_g_ok',
                    callback: function () {
                        modal.dismiss();
                        let finishedModal = that.modalCtrl.create(MCMSessionFinishedModal,
                            {
                                session: that.sessionInfo.session,
                                score: that.score,
                                tasks: that.taskList,
                                narrative: this.app.activeNarrative
                            }, {
                                showBackdrop: true,
                                enableBackdropDismiss: false
                            });
                        if (that.sessionInfo != null) {
                            that.chatAndSessionService.exitActiveSession();
                        }
                        if (that.sessionTimeSubscription) {
                            that.sessionTimeSubscription.unsubscribe();
                        }
                        finishedModal.present();
                    }
                },
            ]
        }, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
        modal.present();
    }

    async gototask(taskId: number, taskName: string, taskFormat: TaskFormat) {
        if (this.taskBlocked) {
            console.log('session in preparation.');
            return;
        }
        console.debug('taskId', taskId);
        let that = this;
        if (taskFormat === TaskFormat.GROUP) {
            this.navCtrl.push('TaskGroupDetail', {
                taskId: taskId,
                headerTitle: taskName,
                routeId: this.routeId,
                goToNextTaskById: function (taskIdToSkip: number, skip?: boolean) {
                    that.goToNextTaskById(taskIdToSkip, skip);
                }
            }, {}, () => {
                // necessary because of bug which does not update URL
                this.deepLinker.navChange('forward');
            });
        } else {
            this.navCtrl.push('TaskDetail', {
                taskId: taskId,
                headerTitle: taskName,
                routeId: this.routeId,
                goToNextTaskById: function (taskIdToSkip: number, skip?: boolean) {
                    that.goToNextTaskById(taskIdToSkip, skip);
                }
            }, {}, () => {
                // necessary because of bug which does not update URL
                this.deepLinker.navChange('forward');
            });
        }
    }

    async navigateToChat() {
        console.debug('showChat');
        if (this.sessionInfo != null) {
            let details = JSON.stringify({});
            this.chatAndSessionService.addUserEvent("event_trail_chat_open", details, "0");
        }
        this.navCtrl.push(ChatPage, {
            val: 'chatseite',
            headerTitle: this.sessionInfo.session.name
        });

    }

    private sessionTime() {
        if (this.sessionInfo == null) {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            return;
        }
        let session = this.sessionInfo.session;
        let currentTimeUnix = moment().unix();
        let startTimeInUnix = moment(session.starts_at).unix();
        let endTimeInUnix = moment(session.ends_at).unix();
        let countdown = startTimeInUnix - currentTimeUnix;
        let countdownInMin = Math.floor(countdown / 60);
        let timerInMin = Math.floor((endTimeInUnix - currentTimeUnix) / 60);

        if (currentTimeUnix > (startTimeInUnix - 3600) && currentTimeUnix < endTimeInUnix) {
            this.startInterval = true;
            if (currentTimeUnix < startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownBeforeSession = true;
                this.countdownOrTimerForSession = countdownInMin;
                this.taskBlocked = true;
            }
            if (currentTimeUnix > startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownOrTimerForSession = timerInMin;
                this.countdownBeforeSession = false;
                this.taskBlocked = false;
            }
        } else {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            this.showSessionEnds = true;
            this.taskBlocked = false;
            // Leave session
            let modal = this.modalCtrl.create(MCMSessionFinishedModal,
                {
                    session: this.sessionInfo.session,
                    score: this.score,
                    tasks: this.taskList,
                    narrative: this.app.activeNarrative
                }, {cssClass: this.app.activeNarrative});
            modal.present();
            return;
        }

    }

    showIntroModal(): Promise<any> {
        return new Promise<any>(success => {
            let title = 'a_alert_welcome';
            let message = 'a_alert_welcome_msg';
            if (this.route.isNarrativeEnabled()) {
                title = this.route.getNarrativeString(title);
                message = this.route.getNarrativeString(message);
            }
            let introModal = this.modalCtrl.create(MCMIntroModal, {
                title: title,
                message: message,
                modalType: MCMModalType.hint,
                narrative: this.app.activeNarrative,
                routeTitle: this.route.title,
                buttons: [
                    {
                        title: 'a_alert_close',
                        callback: function () {
                            introModal.dismiss();
                            success();
                        }
                    }
                ]

            }, {cssClass: this.app.activeNarrative});
            introModal.present();
        });
    }

    updateIcons() {

        switch (this.app.activeNarrative) {
            case 'pirates':
                this.userPositionIcon = L.icon({
                    iconUrl: "./assets/icons/pirates/mapposition.png",
                    iconSize: [100, 100],
                    iconAnchor: [50, 50],
                    className: 'marker userPosition'
                });       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.userPositionArrow = L.icon({
                    iconUrl: "./assets/icons/userDirection.png",
                    iconSize: [36, 36],
                    iconAnchor: [18, 18],
                    className: 'marker userArrow'
                });       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.taskOpenIcon = L.icon({
                    iconUrl: 'assets/icons/pirates/marker-task-open.png',
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    className: 'marker'
                });
                this.taskSkippedIcon = L.icon({
                    iconUrl: 'assets/icons/pirates/marker-task-skipped.png',
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    className: 'marker'
                });
                this.taskSavedIcon = L.icon({
                    iconUrl: 'assets/icons/marker-task-saved.png',
                    iconSize: [35, 48],
                    iconAnchor: [17.5, 43],
                    className: 'marker'
                });
                this.taskDoneIcon = L.icon({
                    iconUrl: 'assets/icons/pirates/marker-task-good.png',
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    className: 'marker'
                });
                this.taskDonePerfectIcon = L.icon({
                    iconUrl: 'assets/icons/pirates/marker-task-perfect.png',
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    className: 'marker'
                });
                this.taskFailedIcon = L.icon({
                    iconUrl: 'assets/icons/pirates/marker-task-failed.png',
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    className: 'marker'
                });

                this.taskOpenIcon.clusterColor = '#AA2000';
                this.taskSkippedIcon.clusterColor = '#b2b2b2';
                this.taskSavedIcon.clusterColor = '#6E38B9';
                this.taskDoneIcon.clusterColor = '#FFC033';
                this.taskDonePerfectIcon.clusterColor = '#33CC00';
                this.taskFailedIcon.clusterColor = '#333333';
                break;
            default:
                this.userPositionIcon = L.icon({
                    iconUrl: "./assets/icons/mapposition.png",
                    iconSize: [100, 100],
                    iconAnchor: [50, 50],
                    className: 'marker userPosition'
                });       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.userPositionArrow = L.icon({
                    iconUrl: "./assets/icons/userDirection.png",
                    iconSize: [36, 36],
                    iconAnchor: [18, 18],
                    className: 'marker userArrow'
                });
                this.taskOpenIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-open.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskSkippedIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-skipped.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskSavedIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-saved.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskDoneIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-good.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskDonePerfectIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-perfect.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskFailedIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-failed.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskGroupIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-group-open.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskOpenIcon.clusterColor = '#036D99';
                this.taskSkippedIcon.clusterColor = '#B2B2B2';
                this.taskSavedIcon.clusterColor = '#6E38B9';
                this.taskDoneIcon.clusterColor = '#F3B100';
                this.taskDonePerfectIcon.clusterColor = '#4CAF50';
                this.taskFailedIcon.clusterColor = '#E62B25';
                break;
        }
    }

    getMarkerForGroup(group: Task) {
        //Circle Generation done using https://codepen.io/wmetz/pen/ONoRmV as reference
        const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
            var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };
        const describeArc = (x, y, radius, startAngle, endAngle) => {
            var start = polarToCartesian(x, y, radius, endAngle),
                end = polarToCartesian(x, y, radius, startAngle),
                arcSweep = endAngle - startAngle <= 180 ? '0' : '1',
                d = [
                    'M', start.x, start.y,
                    'A', radius, radius, 0, arcSweep, 0, end.x, end.y
                ].join(' ');
            return d;
        };

        const getClassStringForSubtask = (task: Task) => {
            if (this.score.getTasksSaved().indexOf(task.id) > -1) {
                return "saved";
            }
            if (this.score.getTasksSolved().indexOf(task.id) > -1) {
                return "perfect";
            }
            if (this.score.getTasksSolvedLow().indexOf(task.id) > -1) {
                return "good";
            }
            if (this.score.getTasksFailed().indexOf(task.id) > -1) {
                return "failed";
            }
            if (this.state.skippedTaskIds.indexOf(task.id) > -1) {
                return "skipped";
            }
            return "";
        }
        const subtasks = group.getSubtasksInOrder();
        const svg = `<svg viewBox="0 0 38 51.024" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <style>
                                    .shadow {
                                        filter: url(#Pfad_177)
                                    }
                                </style>
                                <filter id="Pfad_177" x="0" y="0" width="37" height="51.024" filterUnits="userSpaceOnUse">
                                    <feOffset dy="1" input="SourceAlpha"/>
                                    <feGaussianBlur stdDeviation="0.5" result="blur"/>
                                    <feFlood flood-opacity="0.549"/>
                                    <feComposite operator="in" in2="blur"/>
                                    <feComposite in="SourceGraphic" in2="SourceGraphic"/>
                                </filter>
                            </defs>
                            <g transform="translate(1.5 0.5)">
                                <g class="shadow" transform="matrix(1, 0, 0, 1, -1.5, -0.5)" style="">
                                    <path class="marker-base" d="M-717.081,1567.17c-8.481,0-17.066,6-17.066,17.481,0,5.182,2.562,11.775,7.615,19.594a99.025,99.025,0,0,0,7.408,10.014,2.7,2.7,0,0,0,2.038.935h.005a2.7,2.7,0,0,0,2.037-.927,94.877,94.877,0,0,0,7.35-9.921c5.008-7.774,7.547-14.4,7.547-19.694C-700.147,1574.358-707.11,1567.17-717.081,1567.17Z" transform="translate(735.65 -1566.67)"></path>
                                </g>
                                <text class="segment-counter" x="17" y="22.5">${subtasks.length}</text>
                                <g class="segment-container" transform="matrix(0.088463, 0, 0, 0.088463, -29, -5)">
                                </g>
                            </g>
                        </svg>`
        const div = document.createElement('div')
        div.classList.add("marker-task-group");
        div.innerHTML = svg;
        let segmentLength = 360 / subtasks.length;
        let prevStartAngle = 0;
        let prevEndAngle = 0;
        let segment = "";

        if (subtasks.length === 1) {
            segment = `<circle cx="520" cy="244" r="140" class="${getClassStringForSubtask(subtasks[0])}"/>`
        } else {
            for (let i = 1; i <= subtasks.length; i++) {
                prevStartAngle = prevEndAngle;
                prevEndAngle = segmentLength * i;
                segment += `<path class="segment-part ${getClassStringForSubtask(subtasks[i-1])}" d="${describeArc(520, 244, 140, prevStartAngle, prevEndAngle)}"/>`
            }
        }

        const circleContainer = div.getElementsByClassName('segment-container')[0];
        circleContainer.innerHTML = segment;

        return new L.DivIcon({
            html: div.outerHTML,
            iconSize: [38, 54],
            iconAnchor: [19, 43],
            className: 'marker'
        });
    }

    getSolvedSubtaskCount(task: Task) {
        let count = 0;
        for (let subtask of task.getLegitSubtasks()) {
            if (this.score.getTasksSaved().indexOf(subtask.id) > -1 ||
                this.score.getTasksSolved().indexOf(subtask.id) > -1 ||
                this.score.getTasksSolvedLow().indexOf(subtask.id) > -1 ||
                this.score.getTasksFailed().indexOf(subtask.id) > -1
            ) {
             count++;
            }
        }
        return count;
    }


    protected readonly TaskFormat = TaskFormat;
}

export interface TaskMapState {
    selectedTask: Task;
    isShowingAllTasks: boolean;
    visibleTasks: any;
    skippedTaskIds: number[];
    selectedStartTask: boolean;
    showIntroModal: boolean;
    showGuidedTrailModal: boolean;
}
