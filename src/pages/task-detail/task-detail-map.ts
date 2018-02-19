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
    pointMarkers: Array<Marker> = [];

    prevPos: any;

    userPositionIcon;

    constructor(
        private geolocation: Geolocation,
        private task: Task,
        private route: Route
    ) {
        this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [38, 41], className:'marker'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
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
        if(Helper.myLocation != null){
            let locationLatLng = new L.LatLng(Helper.myLocation.coords.latitude, Helper.myLocation.coords.longitude);
            if(this.pointMarkers[index] == null){
                let label = String.fromCharCode("A".charCodeAt(0) + index);
                let newMarker = L.marker(locationLatLng, {icon: this.userPositionIcon, label: label});
                newMarker.addTo(this.map);
                this.pointMarkers[index] = newMarker;
            }
            else{
                this.pointMarkers[index].setLatLng(locationLatLng);
            }
            this.map.invalidate();
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

