import {Route} from "../../../../../entity/Route";
import {MAPBOX_ACCESS_TOKEN} from "../../../../../env/env";
import mapboxgl from "mapbox-gl";
import Supercluster from 'supercluster';
import {featureCollection} from "@turf/helpers";
import {EventEmitter} from "@angular/core";
import {MapHandlerInterface} from "./MapHandlerInterface";
import {Task} from "../../../../../entity/Task";
import {TaskMapState} from "../TasksMap";
import {Score} from "../../../../../entity/Score";
import {Coordinates} from "@ionic-native/geolocation";
import {Helper} from "../../../../../classes/Helper";
import 'conic-gradient';
import {TaskFormat} from "../../../../../services/ApiResponseDefinition/TaskFormat";

declare var ConicGradient: any;

export class MapboxMapHandler implements MapHandlerInterface {
    private map: any;
    private cluster: Supercluster;
    private customClusters = [];
    private markerEventsInitialized: boolean = false;
    private clusterColors = {
        taskOpenIcon: '#036D99',
        taskSkippedIcon: '#B2B2B2',
        taskSavedIcon: '#6E38B9',
        taskDoneIcon: '#F3B100',
        taskDonePerfectIcon:'#4CAF50',
        taskFailedIcon: '#E62B25',
        taskDisabledIcon: '#B2B2B2'
    }
    private redrawingMarkers: boolean = false;
    private prevPos: any;
    private isUserInsideMap: boolean = true;
    private _mapLoaded = false;
    public mapClickedEvent: EventEmitter<void> = new EventEmitter();
    public taskClickedEvent: EventEmitter<any> = new EventEmitter();
    public get mapLoaded() {
        return this._mapLoaded;
    }
    constructor(private containerId: string, private route: Route, private narrative: string) {
        console.log('mapboxMapHandler INIT', this);
    }

    async loadMap(initialPosition?: Coordinates) {
        if (this.map == null) {
            this._mapLoaded = true;
            const mapStyle = this.route.isNarrativeEnabled() ? 'mapbox://styles/igurjanow/ck0ezs4vd02ou1co75ep12pyz' : 'mapbox://styles/mapbox/outdoors-v11';
            const bounds = this.route.getBoundingBoxLatLngForMapBox(); // [[southWestLat, southWestLng], [northEastLat, northEastLng]]

            mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN; // Replace with your actual token

            this.map = new mapboxgl.Map({
                container: this.containerId,
                style: mapStyle,
                bounds: bounds,
                fitBoundsOptions: { padding: 200 },
                attributionControl: false
            });

            this.map.dragRotate.disable();
            this.map.touchZoomRotate.disableRotation();
            this.map.keyboard.disableRotation();

            this.map.on('pitch', () => {
                if (this.map.getPitch() !== 0) {
                    this.map.setPitch(0);
                }
            });

            // Add navigation controls (zoom, rotate)
            this.map.addControl(new mapboxgl.NavigationControl({
                showCompass: false,
                showZoom: true
            }), 'bottom-left');

            return new Promise<void>((resolve) => {

                this.map.on('load', async () => {
                    console.log('Map loaded');

                    // Set max bounds to prevent user from panning outside
                    this.map.setMaxBounds(bounds);

                    await this.addIconsForMap();

                    // set initial position of user
                    if (initialPosition) {

                        const geojson = {
                            type: 'FeatureCollection',
                            features: [{
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [initialPosition.longitude, initialPosition.latitude]
                                },
                                properties: {
                                    icon: 'userPositionIcon'
                                }
                            }]
                        };

                        this.map.addSource('user-position', {
                            type: 'geojson',
                            data: geojson
                        });

                        this.map.addLayer({
                            id: 'user-position-layer',
                            type: 'symbol',
                            source: 'user-position',
                            layout: {
                                'icon-image': ['get', 'icon'],
                                'icon-size': 0.5,
                                'icon-rotate': ['get', 'rotation'],
                                'icon-allow-overlap': true
                            }
                        });

                        this.updateUserPosition(initialPosition.latitude, initialPosition.longitude);
                    }

                    // Optional: handle clicks to reset selectedTask
                    this.map.on('click', () => {
                        this.mapClickedEvent.emit();
                    });
                    resolve();
                })

            })
        }
    }

    async redrawMarkers(tasks: Array<Task>, mapState: TaskMapState, score: Score) {
        if (this.redrawingMarkers) return;
        this.redrawingMarkers = true;

        const map = this.map;
        if (!map) {
            this.redrawingMarkers = false;
            return;
        }

        // Remove previous layers if they exist
        for (const layerId of ['unclustered-point']) {
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
            }
        }

        if (map.getSource('tasks')) {
            map.removeSource('tasks');
        }

        // Build GeoJSON features from task list
        const features = [];

        for (let task of tasks) {
            if (!mapState.isShowingAllTasks && !mapState.visibleTasks[task.position]) continue;

            let icon = 'taskOpenIcon'; // fallback default
            let clusterState = 'open';
            if (task.taskFormat === TaskFormat.GROUP) {
                const subtasks = task.getSubtasksInOrder();
                const iconKey = `task-group-${task.id}`;
                await this.registerGroupMarkerIcon(iconKey, subtasks, score);
                icon = iconKey;
            } else {
                if (task.inactive) {
                    icon = 'taskDisabledIcon';
                    clusterState = 'disabled';
                } else if (score.getTasksSaved().includes(task.id)) {
                    icon = 'taskSavedIcon';
                    clusterState = "saved";
                } else if (score.getTasksSolved().includes(task.id)) {
                    icon = 'taskDonePerfectIcon';
                    clusterState = "perfect";
                } else if (score.getTasksSolvedLow().includes(task.id)) {
                    icon = 'taskDoneIcon';
                    clusterState = "done";
                } else if (score.getTasksFailed().includes(task.id)) {
                    icon = 'taskFailedIcon';
                    clusterState = "failed";
                } else if (mapState.skippedTaskIds.includes(task.id)) {
                    icon = 'taskSkippedIcon';
                    clusterState = "skipped";
                }
            }

            // Clean up skippedTaskIds if necessary
            if (!mapState.skippedTaskIds.includes(task.id)) {
                const index = mapState.skippedTaskIds.indexOf(task.id);
                if (index > -1) mapState.skippedTaskIds.splice(index, 1);
            }

            features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [task.lon, task.lat]
                },
                properties: {
                    id: task.id,
                    icon: icon,
                    state: clusterState,
                    title: task.title
                }
            });
        }
        let tasksGeoJson: any = {
            type: "FeatureCollection",
            features
        };

        let clusterRadius = 30;
        let clusterMaxZoom = 15;

        this.cluster = new Supercluster({
            radius: clusterRadius,
            maxZoom: clusterMaxZoom,
            map(properties) {
                return {
                    open: properties.state === "open" ? 1 : 0,
                    disabled: properties.state === "disabled" ? 1 : 0,
                    saved: properties.state === "saved" ? 1 : 0,
                    perfect: properties.state === "perfect" ? 1 : 0,
                    done: properties.state === "done" ? 1 : 0,
                    failed: properties.state === "failed" ? 1 : 0,
                    skipped: properties.state === "skipped" ? 1 : 0,
                }
            },
            reduce(accumulated, properties) {
                accumulated.open += properties.open;
                accumulated.saved += properties.saved;
                accumulated.perfect += properties.perfect;
                accumulated.done += properties.done;
                accumulated.failed += properties.failed;
                accumulated.skipped += properties.skipped;
            }
        });

        this.cluster.load(tasksGeoJson.features);
        let clusterData;
        let worldBounds = [-180.0000, -90.0000, 180.0000, 90.0000];
        let updateClusterData = () => {
            // @ts-ignore
            clusterData = featureCollection(this.cluster.getClusters(worldBounds, this.map.getZoom()));
        }
        updateClusterData();

        map.addSource('tasks', {
            type: 'geojson',
            data: clusterData,
            buffer: 1,
            maxzoom: clusterMaxZoom
        });

        // Unclustered points (actual tasks)
        map.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'tasks',
            filter: ['!', ['has', 'point_count']],
            layout: {
                'icon-image': ['get', 'icon'],
                'icon-size': 1,
                'icon-allow-overlap': true
            }
        });

        /**
         * re-render the custom clusters layer
         */
        const updateCustomClusters = () => {
            // clear existing custom clusters "layer"
            this.customClusters.forEach(markerObj => markerObj.remove());
            this.customClusters = [];

            // create a custom icon (HTML element) for each cluster
            clusterData.features.forEach((c) => {
                // skip non-cluster points
                if (!c.properties.cluster) {
                    return;
                }

                const coords = c.geometry.coordinates;
                const childCount = c.properties.point_count;

                // create a DOM element for the marker
                const element = document.createElement('div');
                let classNames = 'marker-cluster marker-cluster-';
                if (childCount < 10) {
                    classNames += 'small';
                } else if (childCount < 100) {
                    classNames += 'medium';
                } else {
                    classNames += 'large';
                }
                let colorOccurrences = {};
                if (c.properties.open > 0) {
                    colorOccurrences[this.clusterColors.taskOpenIcon] = c.properties.open;
                }
                if (c.properties.disabled > 0) {
                    colorOccurrences[this.clusterColors.taskDisabledIcon] = c.properties.disabled;
                }
                if (c.properties.saved > 0) {
                    colorOccurrences[this.clusterColors.taskSavedIcon] = c.properties.saved;
                }
                if (c.properties.perfect > 0) {
                    colorOccurrences[this.clusterColors.taskDonePerfectIcon] = c.properties.perfect;
                }
                if (c.properties.done > 0) {
                    colorOccurrences[this.clusterColors.taskDoneIcon] = c.properties.done;
                }
                if (c.properties.failed > 0) {
                    colorOccurrences[this.clusterColors.taskFailedIcon] = c.properties.failed;
                }
                if (c.properties.skipped > 0) {
                    colorOccurrences[this.clusterColors.taskSkippedIcon] = c.properties.skipped;
                }
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
                        let percentage = Math.round(n / childCount * 100);
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

                element.innerHTML = `<div style="${style}">${img}<span>${childCount}</span></div>`;
                element.classList.add(...classNames.split(" "));
                element.onclick = (_ev) => {
                    let zoom = this.cluster.getClusterExpansionZoom(c.properties.cluster_id);
                    map.easeTo({
                        center: coords,
                        zoom: zoom+0.1
                    });
                }

                // add marker to map
                const markerObj = new mapboxgl.Marker(element)
                    .setLngLat(coords)
                    .addTo(map);

                this.customClusters.push(markerObj);
            });
        };
        setTimeout(() => {
            updateCustomClusters();
        }, 100);

        if (!this.markerEventsInitialized) {
            this.markerEventsInitialized = true;
            map.on('data', (e) => {
                if (e.sourceId !== 'tasks') return;
                updateCustomClusters();
            })

            map.on('moveend', (e) => {
                updateClusterData();
                // update the source for the unclustered points layer
                map.getSource('tasks').setData(clusterData);
                if (!this.isUserInsideMap) {
                    this.updateUserLocationArrow(this.prevPos.latitude, this.prevPos.longitude);
                }
            })


            // Handle clicks on individual tasks
            map.on('click', 'unclustered-point', (e: any) => {
                if (e.features[0].properties.state === 'disabled') return;
                this.taskClickedEvent.emit(e.features[0].properties.id);
            });
        }
        this.redrawingMarkers = false;
    }

    updateUserPosition(lat: number, lng: number) {
        const bounds = this.map.getBounds();
        const userPosition = new mapboxgl.LngLat(lng, lat);
        this.isUserInsideMap = bounds.contains(userPosition);
        console.log('updateUserPosition', this.isUserInsideMap);



        // Update or create the user marker source
        if (this.map.getSource('user-position')) {
            if (this.isUserInsideMap) {
                let angle = 1;
                if (this.prevPos != null) {
                    angle = Helper.getAngle(this.prevPos, {latitude: lat, longitude: lng});
                }
                const geojson = {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        },
                        properties: {
                            rotation: angle,
                            icon: 'userPositionIcon'
                        }
                    }]
                };

                this.map.getSource('user-position').setData(geojson);
            } else {
                this.updateUserLocationArrow(lat, lng);
            }
            this.prevPos = {latitude: lat, longitude: lng}
        }
    }

    moveTo(lat: number, lon: number) {
        this.map.flyTo({ center: [lon, lat], zoom: 16 });
    }

    private updateUserLocationArrow(lat: number, lng: number) {
        if (lng == null || lat == null) return;

        const source = this.map.getSource('user-position') as mapboxgl.GeoJSONSource;
        if (!source) return;

        const center = this.map.getCenter();
        const bounds = this.map.getBounds();

        const userLngLat = { lng, lat };
        let alpha = this.bearing(center, userLngLat);
        const beta = this.bearing(center, bounds.getNorthEast());

        const dx2 = this.distance(bounds.getNorthWest(), bounds.getNorthEast()) / 2;
        const dy2 = this.distance(bounds.getSouthWest(), bounds.getNorthWest()) / 2;

        if (alpha < 0) alpha += 360;

        let length = 0;
        if (
            (alpha >= beta && alpha <= (180 - beta)) ||
            (alpha >= (180 + beta) && alpha <= (360 - beta))
        ) {
            length = Math.abs(dx2 / Math.sin(this.toRad(alpha)));
        } else {
            length = Math.abs(dy2 / Math.cos(this.toRad(alpha)));
        }

        const closestPoint = this.destinationPoint(center, alpha, 0.90 * length);

        const geojson = {
            type: 'FeatureCollection',
            features: [{
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [closestPoint.lng, closestPoint.lat]
                },
                properties: {
                    rotation: alpha,
                    icon: 'userPositionArrow'
                }
            }]
        };

        source.setData(geojson);
    }

    private async registerGroupMarkerIcon(iconKey: string, subtasks: Task[], score: any) {
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
        const svg = `<svg viewBox="0 0 38 51.024" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <style>
                                    .segment-container {
                                       stroke: rgb(255, 255, 255);
                                       stroke-width: 35;
                                       fill: none;
                                    }
                                    .segment-part {
                                      stroke: white;
                                      stroke-width: 3px;
                                      fill: none;
                                      vector-effect: non-scaling-stroke;
                                    }
                                    .segment-part.perfect {
                                        stroke: #08BB27
                                    }
                                    .segment-part.good {
                                        stroke: #f3b100
                                    }
                                    .segment-part.failed {
                                        stroke: #F35800
                                    }
                                    .segment-part.skipped {
                                        stroke: #a6a6a6
                                    }
                                    .segment-part.saved {
                                        stroke: #7D3FD4
                                    }
                                    .segment-counter {
                                        white-space: pre;
                                        fill: #ffffff;
                                        font-size: 18px;
                                        text-anchor: middle;
                                    }
                                    .marker-base {
                                        fill: #035f87
                                    }
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

        if (this.map.hasImage(iconKey)) {
            this.map.removeImage(iconKey);
        }
        this.addIconUsingSvgText(div.innerHTML, this.map, iconKey, 51, 38);
    }

    private async addIconsForMap() {
        const addPng = async (map: mapboxgl.Map, url: string, id: string) => {
            return new Promise<void>((resolve) => {
                map.loadImage(url, (error, image) => {
                    if (error) throw error;

                    if (!map.hasImage(id)) {
                        map.addImage(id, image);
                    }
                    resolve();
                })
            })
        }
        const addSvg = async (map: mapboxgl.Map, url: string, id: string) => {
            const response = await fetch(url);
            const svgText = await response.text();

            let width: number,height: number;
            const match = svgText.match(/viewBox="([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)"/);
            if (match) {
                const [, , , widthStr, heightStr] = match;
                width = parseFloat(widthStr);
                height = parseFloat(heightStr);
            }

           this.addIconUsingSvgText(svgText, map, id, height, width);
        }

        switch (this.narrative) {
            case 'pirates':
                await addPng(this.map, "assets/icons/pirates/mapposition.png", 'userPositionIcon');
                await addPng(this.map, "assets/icons/userDirection.png", 'userPositionArrow');
                await addPng(this.map, "assets/icons/pirates/marker-task-open.png", 'taskOpenIcon');
                await addPng(this.map, "assets/icons/pirates/marker-task-skipped.png", 'taskSkippedIcon');
                await addPng(this.map, "assets/icons/marker-task-saved.png", 'taskSavedIcon');
                await addPng(this.map, "assets/icons/pirates/marker-task-good.png", 'taskDoneIcon');
                await addPng(this.map, "assets/icons/pirates/marker-task-perfect.png", 'taskDonePerfectIcon');
                await addPng(this.map, "assets/icons/pirates/marker-task-failed.png", 'taskFailedIcon');
                await addSvg(this.map, "assets/icons/map/task-disabled.svg", 'taskDisabledIcon');
                this.clusterColors =  {
                    taskOpenIcon: '#AA2000',
                    taskSkippedIcon: '#b2b2b2',
                    taskSavedIcon: '#6E38B9',
                    taskDoneIcon: '#FFC033',
                    taskDonePerfectIcon:'#33CC00',
                    taskFailedIcon: '#333333',
                    taskDisabledIcon: '#B2B2B2'
                }
                break;
            default:
                await addPng(this.map, "assets/icons/mapposition.png", 'userPositionIcon');
                await addPng(this.map, "assets/icons/userDirection.png", 'userPositionArrow');
                await addSvg(this.map,"assets/icons/map/task-open.svg", 'taskOpenIcon');
                await addSvg(this.map,"assets/icons/map/task-skipped.svg", 'taskSkippedIcon');
                await addSvg(this.map, "assets/icons/map/task-saved.svg", 'taskSavedIcon');
                await addSvg(this.map, "assets/icons/map/task-good.svg", 'taskDoneIcon');
                await addSvg(this.map, "assets/icons/map/task-perfect.svg", 'taskDonePerfectIcon');
                await addSvg(this.map, "assets/icons/map/task-failed.svg", 'taskFailedIcon');
                await addSvg(this.map, "assets/icons/map/task-disabled.svg", 'taskDisabledIcon');
                this.clusterColors = {
                    taskOpenIcon: '#036D99',
                    taskSkippedIcon: '#B2B2B2',
                    taskSavedIcon: '#6E38B9',
                    taskDoneIcon: '#F3B100',
                    taskDonePerfectIcon:'#4CAF50',
                    taskFailedIcon: '#E62B25',
                    taskDisabledIcon: '#B2B2B2'
                };
                break;
        }
    }

    private addIconUsingSvgText(svgText: string, map: mapboxgl.Map, id: string, height?: number, width?: number) {
        const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
        const urlBlob = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = width ?? img.width;
            canvas.height = height ?? img.height;
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                if (!map.hasImage(id)) {
                    map.addImage(id, ctx.getImageData(0, 0, canvas.width, canvas.height));
                }
                URL.revokeObjectURL(urlBlob);
            }
        };
        img.src = urlBlob;
    }

    private toRad(deg: number) {
        return deg * Math.PI / 180;
    }

    private toDeg(rad: number) {
        return rad * 180 / Math.PI;
    }

    private bearing(from: mapboxgl.LngLatLike, to: mapboxgl.LngLatLike): number {
        const fromLngLat = mapboxgl.LngLat.convert(from);
        const toLngLat = mapboxgl.LngLat.convert(to);
        const dLon = this.toRad(toLngLat.lng - fromLngLat.lng);
        const lat1 = this.toRad(fromLngLat.lat);
        const lat2 = this.toRad(toLngLat.lat);
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        return (this.toDeg(Math.atan2(y, x)) + 360) % 360;
    }

    private distance(a: mapboxgl.LngLatLike, b: mapboxgl.LngLatLike): number {
        const R = 6371000; // Earth radius in meters
        const aPt = mapboxgl.LngLat.convert(a);
        const bPt = mapboxgl.LngLat.convert(b);
        const dLat = this.toRad(bPt.lat - aPt.lat);
        const dLon = this.toRad(bPt.lng - aPt.lng);
        const lat1 = this.toRad(aPt.lat);
        const lat2 = this.toRad(bPt.lat);

        const sinDLat = Math.sin(dLat / 2);
        const sinDLon = Math.sin(dLon / 2);

        const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
        const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
        return R * c;
    }

    private destinationPoint(from: mapboxgl.LngLatLike, bearingDeg: number, distanceMeters: number): mapboxgl.LngLat {
        const R = 6371000;
        const brng = this.toRad(bearingDeg);
        const fromLngLat = mapboxgl.LngLat.convert(from);
        const lat1 = this.toRad(fromLngLat.lat);
        const lon1 = this.toRad(fromLngLat.lng);

        const lat2 = Math.asin(Math.sin(lat1) * Math.cos(distanceMeters / R) +
            Math.cos(lat1) * Math.sin(distanceMeters / R) * Math.cos(brng));
        const lon2 = lon1 + Math.atan2(
            Math.sin(brng) * Math.sin(distanceMeters / R) * Math.cos(lat1),
            Math.cos(distanceMeters / R) - Math.sin(lat1) * Math.sin(lat2)
        );

        return new mapboxgl.LngLat(this.toDeg(lon2), this.toDeg(lat2));
    }
}
