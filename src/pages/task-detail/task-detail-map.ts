/**
 * Created by Iwan Gurjanow on 19.02.2018.
 */

import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';
import 'leaflet-geometryutil';

import { Helper } from '../../classes/Helper';
import { tilesDb } from '../../classes/tilesDb';
import { OrmService } from '../../services/orm-service';
import { Route } from '../../entity/Route';
import { Task } from '../../entity/Task';
import { LatLngBounds } from 'leaflet';
import { Marker } from 'leaflet';
import { TranslateService } from '@ngx-translate/core';

import {gpsService} from  '../../services/gps-service';
import 'rxjs/add/operator/filter';
import 'leaflet-rotatedmarker';

export class TaskDetailMap{

    @ViewChild('gpsTaskMap') mapContainer: ElementRef;
    map: any;
    center: L.PointTuple;
    routeDetails: Route;
    taskDetails: Task;
    userMarker: any;
    prevPos: any;
    userPositionIcon;
    preDefinedPointIcon;

    // Markers (set by user) settings
    pointMarkers: Array<Marker> = [];
    pointIcon;
    ALLOWED_DISTANCE_TO_TASK: number = 300;

    // Axis setting
    AXIS_LENGTH: number = 110;
    ARROW_LENGTH: number = 6;
    ARROW_DEGREE: number = 25;
    MARK_DISTANCE: number = 10;
    MARK_LENGTH: number = 1.5;
    LINEAR_FX_EXTEND: number = 100;
    axisPoints = {
        origin: null,
        x: null,
        y: null
    };
    linearFxGraph:L.Polyline = null;

    constructor(
        private geolocation: Geolocation,
        private task: Task,
        private route: Route
    ) {
        this.userPositionIcon = L.icon({
            iconUrl:"./assets/icons/icon_mapposition.png" ,
            iconSize: [38, 41],
            className:'marker'
        });       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
        this.pointIcon = L.icon({
            iconUrl:"./assets/icons/icon_taskmarker-open.png" ,
            iconSize: [35, 48],
            iconAnchor: [17, 48],
            className:'marker'
        });
        this.preDefinedPointIcon = L.icon({
            iconUrl:"./assets/icons/icon_taskmarker-failed.png" ,
            iconSize: [35, 48],
            iconAnchor: [17, 48],
            className:'marker'
        });
        this.taskDetails = task;
        this.routeDetails = route;
        // Init Marker Array
        for(let i = 0; i < parseInt(this.task.getSolutionGpsValue("points")); i++){
            this.pointMarkers[i] = null;
        }
    }

    /*
    Place or move marker on map depending on index (button click)
     */
    setMarker(index: number){
        let testing = true; // TODO change this
        var location;
        if(testing){
            location = Helper.testLocation;
        }
        else{
            location = Helper.myLocation;
        }
        if(location != null){
            let locationLatLng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            if(!this.markerCanBeSet(locationLatLng)){
                return;
            }
            if(this.pointMarkers[index] == null){
                let label = String.fromCharCode("A".charCodeAt(0) + index);
                let newMarker = L.marker(locationLatLng, {icon: this.pointIcon});
                newMarker.addTo(this.map);
                this.pointMarkers[index] = newMarker;
            }
            else{
                this.pointMarkers[index].setLatLng(locationLatLng);
            }
            if(this.taskDetails.getSolutionGpsValue("task") == "linearFx"){
                this.insertLinearFxGraph();
            }
            console.log("Marker placed");
        }
    }

    markerCanBeSet(clickLatLng: L.LatLng): boolean{
        // Markers need to be placed within a certain radius from the task
        /*
        Note: (L as any).GeometryUtil.distance seems to return the distance in pixels? the bigger the zoom the higher the distance
        For realistic distance in meters use (L as any).GeometryUtil.length(latlng1, latlng2)
         */
        let distanceToTask = (L as any).GeometryUtil.length([new L.LatLng(this.taskDetails.lat, this.taskDetails.lon), clickLatLng]);
        if(distanceToTask > this.ALLOWED_DISTANCE_TO_TASK){
            // TODO: Display note / message why marker cannot be set
            console.log("Marker cannot be placed: Out of range.");
            return false;
        }
        else{
            if(this.taskDetails.getSolutionGpsValue("task") == "linearFx"){
                // Markers can only be placed inside drawn axis
                // Inside = the distance of the placed marker to all four "sides" of the axis must be smaller than AXIS_LENGTH
                let xy = (L as any).GeometryUtil.destination(this.axisPoints.x, (L as any).GeometryUtil.bearing(this.axisPoints.origin, this.axisPoints.y), this.AXIS_LENGTH);

                let closestOnX = (L as any).GeometryUtil.closestOnSegment(this.map, clickLatLng, this.axisPoints.origin, this.axisPoints.x);
                let closestOnY = (L as any).GeometryUtil.closestOnSegment(this.map, clickLatLng, this.axisPoints.origin, this.axisPoints.y);
                let closestOnXY = (L as any).GeometryUtil.closestOnSegment(this.map, clickLatLng, this.axisPoints.x, xy);
                let closestOnYX = (L as any).GeometryUtil.closestOnSegment(this.map, clickLatLng, this.axisPoints.y, xy);
                let distanceX = (L as any).GeometryUtil.length([closestOnX, clickLatLng]);
                let distanceY = (L as any).GeometryUtil.length([closestOnY, clickLatLng]);
                let distanceXY = (L as any).GeometryUtil.length([closestOnXY, clickLatLng]);
                let distanceYX = (L as any).GeometryUtil.length([closestOnYX, clickLatLng]);
                if(
                    distanceX <= this.AXIS_LENGTH && // Distance to Segment origin - x
                    distanceY <= this.AXIS_LENGTH && // Distance to Segment origin - y
                    distanceXY <= this.AXIS_LENGTH && // Distance to Segment x - xy
                    distanceYX <= this.AXIS_LENGTH // Distance to Segment y - xy
                ) return true;
                else{
                    // TODO: Display note / message why marker cannot be set
                    console.log("Marker cannot be placed: Not in axis");
                    return false;
                }
            }
            else{
                return true;
            }
        }
    }

    /*
    Checks if user has placed all necessary points (needed for validating)
     */
    areAllPointsSet(): boolean{
        let result = true;
        for(let i = 0; i < this.pointMarkers.length; i++){
            if(this.pointMarkers[i] == null){
                result = false;
                break;
            }
        }
        return result;
    }

    getPoints(): Array<L.LatLng>{
        if(this.areAllPointsSet()){
            let result = [];
            for(let i = 0; i < this.pointMarkers.length; i++){
                let marker = this.pointMarkers[i];
                result[i] = marker.getLatLng();
            }
            return result;
        }
        else{
            return null;
        }
    }

    /*
    Insert predefined points (by author) as related points for the task (centerTwo, centerThree)
     */
    insertPreDefinedPoints(points: Array<Array<number>>){
        for(let i = 0; i < points.length; i++){
            let preDefinedPoint = L.marker(new L.LatLng(points[i][0], points[i][1]), {icon: this.preDefinedPointIcon});
            preDefinedPoint.addTo(this.map);
        }
    }

    /*
    Draws an axis (x-Axis and y-Axis) starting at origin.
    The direction for the x-Axis is defined by origin and dPoing
    The length of the axis is default to 100m, every 10m there is a short line indicating the 10 meters
     */
    insertAxis(origin: Array<number>, dPoint: Array<number>){
        // Draw axis with arrows at the end
        let aCoor = new L.LatLng(origin[0], origin[1]);
        let bCoor = new L.LatLng(dPoint[0], dPoint[1]);
        let bearingAB = (L as any).GeometryUtil.bearing(aCoor, bCoor);
        let disAB = (L as any).GeometryUtil.distance(this.map, aCoor, bCoor);
        bCoor = (L as any).GeometryUtil.destination(aCoor, bearingAB, this.AXIS_LENGTH); // Override bCoor with a point that is 100 meter in right direction
        /*
        if (disAB < this.AXIS_LENGTH) {
            bCoor = (L as any).GeometryUtil.destination(aCoor, bearingAB, this.AXIS_LENGTH);
        }
        */
        let yCoor = (L as any).GeometryUtil.destination(aCoor, bearingAB - 90, this.AXIS_LENGTH);
        let xArrowUp = (L as any).GeometryUtil.destination(bCoor, bearingAB - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        let xArrowDown = (L as any).GeometryUtil.destination(bCoor, bearingAB + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        let yArrowUp = (L as any).GeometryUtil.destination(yCoor, bearingAB - 90 - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        let yArrowDown = (L as any).GeometryUtil.destination(yCoor, bearingAB - 90 + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        L.polyline([yArrowUp, yCoor, yArrowDown, yCoor, aCoor, bCoor, xArrowUp, bCoor, xArrowDown], {color: 'red', opacity: 0.7}).addTo(this.map);

        this.axisPoints.origin = aCoor;
        this.axisPoints.x = bCoor;
        this.axisPoints.y = yCoor;

        // Insert "X" and "Y" at end of axis

        (L as any).marker((L as any).GeometryUtil.destination(bCoor, bearingAB, this.MARK_LENGTH*3), {rotationAngle:(bearingAB - 90), icon: this.getLabeledIcon("X", "axis-label", "x")
        }).addTo(this.map);
        (L as any).marker((L as any).GeometryUtil.destination(yCoor, bearingAB - 90, this.MARK_LENGTH*3), {rotationAngle:(bearingAB - 90), icon: this.getLabeledIcon("Y", "axis-label", "y")
        }).addTo(this.map);

        // Draw markers every MARKER_DISTANCE meters to indicate the dimensions
        // origin marker
        L.polyline([(L as any).GeometryUtil.destination(aCoor, bearingAB + 135, this.MARK_LENGTH), (L as any).GeometryUtil.destination(aCoor, bearingAB - 45, this.MARK_LENGTH*1.5)], {color: 'red', weight: 2, opacity: 0.7}).addTo(this.map);
        // 0 m label at origin
        (L as any).marker((L as any).GeometryUtil.destination(aCoor, bearingAB + 135, this.MARK_LENGTH*2), {
            icon: this.getLabeledIcon('0 m', "axis-label", "y"),
            rotationAngle:(bearingAB - 90)
        }).addTo(this.map);
        // Add 50m and 100m to axis
        for(let i = 1; i < (this.AXIS_LENGTH) / this.MARK_DISTANCE; i++){
            var markerWidth = 2;
            if(i == 5 || i == 10){
                markerWidth = 4;
            }

            let coordOnXAxis = (L as any).GeometryUtil.destination(aCoor, bearingAB, this.MARK_DISTANCE * i);
            let coordOnYAxis = (L as any).GeometryUtil.destination(aCoor, bearingAB - 90, this.MARK_DISTANCE * i);
            let innerPointX = (L as any).GeometryUtil.destination(coordOnXAxis, bearingAB - 90, this.MARK_LENGTH);
            let outerPointX = (L as any).GeometryUtil.destination(coordOnXAxis, bearingAB - 90, -this.MARK_LENGTH);
            let innerPointY = (L as any).GeometryUtil.destination(coordOnYAxis, bearingAB, this.MARK_LENGTH);
            let outerPointY = (L as any).GeometryUtil.destination(coordOnYAxis, bearingAB, -this.MARK_LENGTH);
            L.polyline([outerPointX, innerPointX], {color: 'red', weight: markerWidth, opacity: 0.7}).addTo(this.map);
            L.polyline([outerPointY, innerPointY], {color: 'red', weight: markerWidth, opacity: 0.7}).addTo(this.map);

            if(i == 5 || i == 10){
                let xLabelCoord = (L as any).GeometryUtil.destination(coordOnXAxis, bearingAB + 90, this.MARK_LENGTH*3);
                let yLabelCoord = (L as any).GeometryUtil.destination(coordOnYAxis, -bearingAB, this.MARK_LENGTH*3);
                (L as any).marker(xLabelCoord, {
                    icon: this.getLabeledIcon(i * 10 + ' m', "axis-label", "x"),
                    rotationAngle:(bearingAB - 90)
                }).addTo(this.map);
                (L as any).marker(yLabelCoord, {
                    icon: this.getLabeledIcon(i * 10 + ' m', "axis-label", "y"),
                    rotationAngle:(bearingAB - 90)
                }).addTo(this.map);
            }
        }
    }

    getLabeledIcon(labelText: string, labelClass: string, axis: string):L.DivIcon{
        var iconSize, iconAnchor;
        if(axis == "x"){
            iconSize = [40,20];
            iconAnchor = [0, 10];
        }
        else{
            iconSize = [40,20];
            iconAnchor = [40, -30];
        }

        return L.divIcon({
            className: labelClass,
            html: labelText,
            iconSize: iconSize,
        });
    }

    insertLinearFxGraph(){
        if(this.areAllPointsSet()){
            let points = this.getPoints();
            if(this.linearFxGraph != null){
                this.map.removeLayer(this.linearFxGraph);
            }
            let bearing = (L as any).GeometryUtil.bearing(points[0], points[1]);
            let pointA = (L as any).GeometryUtil.destination(points[0], bearing, (-1) * this.LINEAR_FX_EXTEND);
            let pointB = (L as any).GeometryUtil.destination(points[1], bearing, this.LINEAR_FX_EXTEND);
            this.linearFxGraph = L.polyline([pointA, pointB], {color: 'blue'}).addTo(this.map);
        }
    }

    markerGroup: any = null;

    loadMap() {
        this.center = [this.taskDetails.lat, this.taskDetails.lon]; // Center at task's position
        let mapquestUrl = Helper.mapquestUrl;
        let subDomains = Helper.subDomains;

        if (this.map == null) {
            this.map = (L as any).map('gpsTaskMap', {
                center: this.center,
                zoom: 19,
                //zoomControl: false,
                tileSize: 256,
                maxBounds: this.routeDetails.getBoundingBoxLatLng()
            });

            /* For testing - sets users position to click event */
            this.map.on('click', function(e){
                if(Helper.testLocation == null){
                    Helper.testLocation = {coords:{latitude:null, longitude:null}};
                }
                Helper.testLocation.coords.latitude = e.latlng.lat;
                Helper.testLocation.coords.longitude = e.latlng.lng;
            });

            tilesDb.initialize().then(() => {
                console.log("Tiles DB Initialized");
                let offlineLayer = (L.tileLayer as any).offline(mapquestUrl, tilesDb, {
                    attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
                    subdomains: subDomains,
                    minZoom: 18,
                    maxZoom: 20,
                    tileSize: 256,
                    crossOrigin: true,
                    detectRetina: true
                });

                offlineLayer.addTo(this.map);
            });

            /* User's Location */
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
                                // this.map.panTo(lanlng);
                                this.userMarker.setLatLng(lanlng);

                                //Check if it needs to move the map (in case the user is outside the threshold bounds)
                                /*let freeBounds = L.bounds(L.point(this.map.getSize().x * 0.2, this.map.getSize().y * 0.2),
                                 L.point(this.map.getSize().x * 0.8, this.map.getSize().y * 0.8));
                                 let newPos = Helper.followUser(freeBounds, this.map.latLngToContainerPoint(lanlng), this.map.getZoom());
                                 if(newPos!= null) {
                                 //this.map.panTo(this.map.containerPointToLatLng(newPos));
                                 }*/


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
                })
        }
    }
}
