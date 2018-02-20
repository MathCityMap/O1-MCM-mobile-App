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
import 'leaflet-geometryutil'

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
    pointMarkers: Array<Marker> = [];
    userPositionIcon;
    pointIcon;
    preDefinedPointIcon;
    linearFxGraph:L.polyline = null;

    // Axis setting
    AXIS_LENGTH: number = 110;
    ARROW_LENGTH: number = 6;
    ARROW_DEGREE: number = 25;
    MARK_DISTANCE: number = 10;
    MARK_LENGTH: number = 3;
    LINEAR_FX_EXTEND: number = 100;
    axisPoints = {
        origin: null,
        x: null,
        y: null
    };

    constructor(
        private geolocation: Geolocation,
        private task: Task,
        private route: Route
    ) {
        this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [38, 41], className:'marker'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
        this.pointIcon = L.icon({iconUrl:"./assets/icons/icon_taskmarker-open.png" , iconSize: [35, 48], className:'marker'});
        this.preDefinedPointIcon = L.icon({iconUrl:"./assets/icons/icon_taskmarker-failed.png" , iconSize: [35, 48], className:'marker'});
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
        //TODO: Check if new location is within the task radius
        console.log("Click Button " + index);
        if(Helper.myLocation != null){
            let locationLatLng = new L.LatLng(Helper.myLocation.coords.latitude, Helper.myLocation.coords.longitude);
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
                this.drawlinearFxGraph();
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
        let bearingAB = L.GeometryUtil.bearing(aCoor, bCoor);
        let disAB = L.GeometryUtil.distance(this.map, aCoor, bCoor);
        bCoor = L.GeometryUtil.destination(aCoor, bearingAB, this.AXIS_LENGTH); // Override bCoor with a point that is 100 meter in right direction
        /*
        if (disAB < this.AXIS_LENGTH) {
            bCoor = L.GeometryUtil.destination(aCoor, bearingAB, this.AXIS_LENGTH);
        }
        */
        let yCoor = L.GeometryUtil.destination(aCoor, bearingAB - 90, this.AXIS_LENGTH);
        let xArrowUp = L.GeometryUtil.destination(bCoor, bearingAB - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        let xArrowDown = L.GeometryUtil.destination(bCoor, bearingAB + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        let yArrowUp = L.GeometryUtil.destination(yCoor, bearingAB - 90 - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        let yArrowDown = L.GeometryUtil.destination(yCoor, bearingAB - 90 + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        L.polyline([yArrowUp, yCoor, yArrowDown, yCoor, aCoor, bCoor, xArrowUp, bCoor, xArrowDown], {color: 'red'}).addTo(this.map);

        this.axisPoints.origin = aCoor;
        this.axisPoints.x = bCoor;
        this.axisPoints.y = yCoor;

        // Insert "X" and "Y" at end of axis
        new L.marker(bCoor, {opacity: 0
        }).bindTooltip("X", {
            permanent: true,
            direction: 'center',
            className: 'axis-label'
        }).addTo(this.map);
        new L.marker(yCoor, {opacity: 0
        }).bindTooltip("Y", {
            permanent: true,
            direction: 'center',
            className: 'axis-label'
        }).addTo(this.map);

        // Draw markers every MARKER_DISTANCE meters to indicate the dimensions
        // Add 50m and 100m to axis
        for(let i = 1; i < (this.AXIS_LENGTH) / this.MARK_DISTANCE; i++){
            let coordOnXAxis = L.GeometryUtil.destination(aCoor, bearingAB, this.MARK_DISTANCE * i);
            let coordOnYAxis = L.GeometryUtil.destination(aCoor, bearingAB - 90, this.MARK_DISTANCE * i);
            let innerPointX = L.GeometryUtil.destination(coordOnXAxis, bearingAB - 90, this.MARK_LENGTH);
            let innerPointY = L.GeometryUtil.destination(coordOnYAxis, bearingAB, this.MARK_LENGTH);
            L.polyline([coordOnXAxis, innerPointX], {color: 'red'}).addTo(this.map);
            L.polyline([coordOnYAxis, innerPointY], {color: 'red'}).addTo(this.map);

            if(i == 5 || i == 10){
                let xLabelCoord = L.GeometryUtil.destination(coordOnXAxis, bearingAB + 90, this.MARK_DISTANCE);
                let yLabelCoord = L.GeometryUtil.destination(coordOnYAxis, -bearingAB, this.MARK_DISTANCE);
                new L.marker(xLabelCoord, {opacity: 0
                }).bindTooltip(i * 10 + ' m', {
                    permanent: true,
                    direction: 'center',
                    className: 'axis-label'
                }).addTo(this.map);

                new L.marker(yLabelCoord, {opacity: 0
                }).bindTooltip(i * 10 + ' m', {
                    permanent: true,
                    direction: 'center',
                    className: 'axis-label'
                }).addTo(this.map);
            }
        }
    }

    drawlinearFxGraph(){
        if(this.areAllPointsSet()){
            let points = this.getPoints();
            if(this.linearFxGraph != null){
                this.map.removeLayer(this.linearFxGraph);
            }
            let bearing = L.GeometryUtil.bearing(points[0], points[1]);
            let pointA = L.GeometryUtil.destination(points[0], bearing, (-1) * this.LINEAR_FX_EXTEND);
            let pointB = L.GeometryUtil.destination(points[1], bearing, this.LINEAR_FX_EXTEND);
            this.linearFxGraph = L.polyline([pointA, pointB], {color: 'blue'}).addTo(this.map);
        }
    }

    markerGroup: any = null;

    redrawMarker() {
        /*
        const map = this.map;
        if (this.markerGroup != null) {
            console.warn('removing markerGroup');
            this.map.removeLayer(this.markerGroup);
            this.markerGroup = null;
        }
        let markerGroup = (L as any).markerClusterGroup({
            maxClusterRadius: 30
        });
        for (let route of this.routes) {
            let latLng = route.getCenterLatLng()
            let icon;
            if(route.public == "1"){
                icon = this.publicRouteIconOpen;
            }else{
                icon = this.privateRouteIconOpen;
            }
            markerGroup.addLayer(L.marker(latLng, {icon: icon}).on('click', () => {
                if (this.routeDetails == route) {
                    this.modalsService.showRoute(route, this.navCtrl);
                } else {
                    this.routeDetails = route;
                    this.map.panTo( latLng );
                }
            }));
        }
        map.addLayer(markerGroup);
        this.markerGroup = markerGroup;
        */
    }

    loadMap() {
        this.center = [this.taskDetails.lat, this.taskDetails.lon]; // Center at task's position
        let mapquestUrl = Helper.mapquestUrl;
        let subDomains = Helper.subDomains;

        if (this.map == null) {
            this.map = (L as any).map('gpsTaskMap', {
                center: this.center,
                zoom: 19,
                zoomControl: false,
                tileSize: 256,
                maxBounds: this.routeDetails.getBoundingBoxLatLng()
            });

            /* For testing - sets users position to click event */
            this.map.on('click', function(e){
                if(Helper.myLocation == null){
                    Helper.myLocation = {coords:{latitude:null, longitude:null}};
                }
                Helper.myLocation.coords.latitude = e.latlng.lat;
                Helper.myLocation.coords.longitude = e.latlng.lng;
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

