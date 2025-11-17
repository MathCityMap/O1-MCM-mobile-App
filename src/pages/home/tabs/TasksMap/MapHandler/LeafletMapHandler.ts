import {MapHandlerInterface} from "./MapHandlerInterface";
import {EventEmitter} from "@angular/core";
import {Coordinates} from "@ionic-native/geolocation";
import {Task} from "../../../../../entity/Task";
import {Score} from "../../../../../entity/Score";
import {tilesDb} from "../../../../../classes/tilesDb";
import {Helper} from "../../../../../classes/Helper";
import {Route} from "../../../../../entity/Route";
import * as L from 'leaflet';
import 'conic-gradient';
import 'leaflet.markercluster';
import 'leaflet-offline';
import 'leaflet-rotatedmarker';
import {ImagesService} from "../../../../../services/images-service";
import {TaskMapState} from "../TasksMap";
import {TaskFormat} from "../../../../../services/ApiResponseDefinition/TaskFormat";
import {RouteApiService} from "../../../../../services/route-api.service";

declare var ConicGradient: any;

export class LeafletMapHandler implements MapHandlerInterface {
    private map: any;
    private userMarker: any;
    private taskOpenIcon;
    private taskSkippedIcon;
    private taskDoneIcon;
    private taskDonePerfectIcon;
    private taskFailedIcon;
    private taskSavedIcon;
    private taskDisabledIcon;
    private userPositionIcon;
    private userPositionArrow;
    private prevPos: any;
    private isUserInsideMap: boolean = true;
    private redrawingMarkers = false;

    private markerGroup: any = null;
    private pathGroup: any = null;

    private _mapLoaded = false;
    public mapClickedEvent: EventEmitter<void> = new EventEmitter();
    public taskClickedEvent: EventEmitter<any> = new EventEmitter();

    public get mapLoaded() {
        return this._mapLoaded;
    }

    constructor(
        private containerId: string,
        private route: Route,
        private narrative: string,
        private routeApiService: RouteApiService,
        private imagesService: ImagesService) {
        this.updateIcons()
    }

    async loadMap(initialPosition?: Coordinates): Promise<void> {
        //const center = [50.1208566, 8.66158515]; // Frankfurt-am Main
        let mapquestUrl = /*Helper.mapquestUrl*/ this.route.getTilesMap(this.narrative);
        let subDomains = this.route.getTilesServerSubdomains(this.narrative);//Helper.subDomains;

        //[[38.4298915,27.1227443],[38.4129794,27.1416646]]
        // const corner1 = L.latLng(38.4313915, 27.1212443)
        // const corner2 = L.latLng(38.4114794, 27.1431646)
        // const bbox = JSON.parse(this.route.bounding_box);
        // const corner1 = bbox[0];
        // const corner2 = bbox[1];
        // const bounds: L.latLngBounds = L.latLngBounds(corner1, corner2)


        if (this.map == null) {
            this.map = L.map(this.containerId, {
                attributionControl: false,
                zoom: 18,
                trackResize: false, // if map gets resized when not visible (when keyboard shows up) it can get into undefined state
                maxBounds: this.route.getBoundingBoxLatLng()
            });

            L.control.attribution({position: 'bottomleft', prefix: 'Leaflet'}).addTo(this.map);
            this.map.fitBounds(this.route.getViewBoundingBoxLatLng());
            // this.map.setZoom(18);
            this.map.on('click', _e => {
                this.mapClickedEvent.emit();
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

            if (initialPosition) {
                    console.debug('found you');

                    this.addUserMarker(initialPosition);
            }

            const tiles = this.routeApiService.getTileURLsAsObject(this.route);
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
            this._mapLoaded = true;

            this.map.on('moveend', _e => {
                if (!this.isUserInsideMap) {
                    this.updateUserLocationArrow(new L.LatLng(this.prevPos.latitude, this.prevPos.longitude))
                }
            });

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
        }
    }

    addUserMarker(initialPosition: {latitude: number, longitude: number}) {
        this.userMarker = L.marker([initialPosition.latitude, initialPosition.longitude], {icon: this.userPositionIcon}).on('click', () => {
            // alert('Marker clicked');
        });
        this.userMarker.setRotationOrigin('center center');
        this.userMarker.addTo(this.map);
    }

    moveTo(lat: number, lon: number): void {
        this.map.panTo([lat, lon]);
    }

    redrawMarkers(tasks: Array<Task>, mapState: TaskMapState, score: Score): Promise<void> {
        console.log('LEAFLET REDRAW MARKERS', this.redrawingMarkers);
        if (this.redrawingMarkers) {
            return;
        }
        if (!this.map) {
            return;
        }
        this.redrawingMarkers = true;
        console.log('LEAFLET ACTUALLY REDRAWING');
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

        let geoJSON = this.route.getPathGeoJson();
        let pathGroup = [];

        for (let i = 0; i < tasks.length; i++) {
            let task: Task = tasks[i];
            if (!mapState.isShowingAllTasks && !mapState.visibleTasks[task.position]) {
                continue;
            }
            let icon = this.taskOpenIcon;

            if (task.taskFormat === TaskFormat.GROUP) {
                icon = this.getMarkerForGroup(task, score);
            } else {
                let removeTaskFromSkippedArray = true;
                if (task.inactive) {
                    icon = this.taskDisabledIcon;
                } else if (score.getTasksSaved().indexOf(task.id) > -1) {
                    icon = this.taskSavedIcon;
                } else if (score.getTasksSolved().indexOf(task.id) > -1) {
                    icon = this.taskDonePerfectIcon;
                } else if (score.getTasksSolvedLow().indexOf(task.id) > -1) {
                    icon = this.taskDoneIcon;
                } else if (score.getTasksFailed().indexOf(task.id) > -1) {
                    icon = this.taskFailedIcon;
                } else if (mapState.skippedTaskIds.indexOf(task.id) > -1) {
                    icon = this.taskSkippedIcon;
                    removeTaskFromSkippedArray = false;
                }

                if (removeTaskFromSkippedArray && mapState.skippedTaskIds.indexOf(task.id) > -1) {
                    // remove task from skipped array
                    mapState.skippedTaskIds.splice(mapState.skippedTaskIds.indexOf(task.id), 1);
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
                if (task.inactive) return;
                this.taskClickedEvent.emit(task.id);
            }));
        }
        // this.map.addLayer(pathGroup);
        this.map.addLayer(markerGroup);
        console.log("MAP AFTER UPDATE", this.map);
        this.markerGroup = markerGroup;
        this.pathGroup = pathGroup;
        this.redrawingMarkers = false;
    }

    updateUserPosition(lat: number, lng: number): void {
        const lanlng = new L.LatLng(lat, lng);
        let bBox = this.map.getBounds();
        if (!this.userMarker) {
            this.addUserMarker(lanlng);
        }
        if (bBox.contains(lanlng)) {
            // User entered visible map bounding box -> Change Icon
            if (!this.isUserInsideMap) {
                this.userMarker.setIcon(this.userPositionIcon);
            }
            this.userMarker.setLatLng(lanlng);
            //Rotate the user marker
            if (this.prevPos != null) {
                let angle = Helper.getAngle(this.prevPos, {latitude: lat, longitude: lng});
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
        this.prevPos = {latitude: lat, longitude: lng};
    }

    resizeToContainer() {
        this.map.invalidateSize();
    }

    private updateUserLocationArrow(userLatLng) {
        if (!userLatLng) {
            return;
        }
        if (!this.userMarker) {
            this.addUserMarker(userLatLng);
        }
        let bBox = this.map.getBounds();
        let alpha = (L as any).GeometryUtil.bearing(this.map.getCenter(), userLatLng);
        let beta = (L as any).GeometryUtil.bearing(this.map.getCenter(), bBox.getNorthEast());
        let dx2 = ((L as any).GeometryUtil.length([bBox.getNorthWest(), bBox.getNorthEast()])) / 2;
        let dy2 = ((L as any).GeometryUtil.length([bBox.getSouthWest(), bBox.getNorthWest()])) / 2;
        let length;

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

    private getMarkerForGroup(group: Task, score: Score) {
        //Circle Generation done using https://codepen.io/wmetz/pen/ONoRmV as reference
        const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
            var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };
        const describeArc = (x, y, radius, startAngle, endAngle) => {
            let start = polarToCartesian(x, y, radius, endAngle),
                end = polarToCartesian(x, y, radius, startAngle),
                arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
            return [
                'M', start.x, start.y,
                'A', radius, radius, 0, arcSweep, 0, end.x, end.y
            ].join(' ');
        };

        const getClassStringForSubtask = (task: Task) => {
            if (score.getTasksSaved().indexOf(task.id) > -1) {
                return "saved";
            }
            if (score.getTasksSolved().indexOf(task.id) > -1) {
                return "perfect";
            }
            if (score.getTasksSolvedLow().indexOf(task.id) > -1) {
                return "good";
            }
            if (score.getTasksFailed().indexOf(task.id) > -1) {
                return "failed";
            }
            let taskDetails = score.getTaskStateForTask(task.id);
            if (taskDetails.skipped) {
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
            segment = `<circle cx="520" cy="244" r="140" class="segment-part ${getClassStringForSubtask(subtasks[0])}"/>`
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

    private updateIcons() {

        switch (this.narrative) {
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
                this.taskDisabledIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-disabled.svg',
                    iconSize: [34, 48],
                    iconAnchor: [17, 43],
                    className: 'marker'
                });
                this.taskOpenIcon.clusterColor = '#AA2000';
                this.taskSkippedIcon.clusterColor = '#b2b2b2';
                this.taskSavedIcon.clusterColor = '#6E38B9';
                this.taskDoneIcon.clusterColor = '#FFC033';
                this.taskDonePerfectIcon.clusterColor = '#33CC00';
                this.taskFailedIcon.clusterColor = '#333333';
                this.taskDisabledIcon.clusterColor = '#B2B2B2';
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
                this.taskDisabledIcon = L.icon({
                    iconUrl: 'assets/icons/map/task-disabled.svg',
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
                this.taskDisabledIcon.clusterColor = '#B2B2B2';
                break;
        }
    }

}
