import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import L from 'leaflet';
import { OfflineLayer } from './OfflineLayer';
import { OfflineProgressControl } from './OfflineProgressControl';
import { CacheBtnControl } from './CacheBtnControl';

// declare var OfflineLayer, OfflineProgressControl;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // @ViewChild('map') mapContainer: ElementRef;
  map: any;
  center: L.PointTuple;

  constructor(public navCtrl: NavController) { }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");

    this.center = [48.775556, 9.182778];
    

    this.loadMap();



    // var mapquestUrl = 'http://{s}tile.openstreetmap.org/{z}/{x}/{y}.png';
    // var subDomains = ['', 'a.', 'b.', 'c.'];
    // var mapquestAttrib = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.';
    // var onReady = function() {
    //   console.log("The OfflineLayer is ready to be used");
    //   console.log("offlineMap:", offlineMap);
    //   console.log("map:", this.map);
    //   offlineMap.addTo(this.map);
    // };
    // var onError = function(errorType, errorData1, errorData2) {
    //   console.log(errorType);
    //   console.log(errorData1);
    //   console.log(errorData2);
    // };
    // var options = { maxZoom: 18, attribution: mapquestAttrib, subdomains: subDomains, onReady: onReady, onError: onError, storeName:"myStoreName", dbOption:"WebSQL"}
    // var offlineMap = new OfflineLayer(mapquestUrl, options);
    // console.log(offlineMap);
  }

  loadMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    var mapquestUrl = 'http://{s}tile.openstreetmap.org/{z}/{x}/{y}.png';

    var subDomains = ['', 'a.', 'b.', 'c.'];

    var mapquestAttrib = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.';
    var offlineLayer;
    var map = this.map;
    var onReady = function () {
      var cacheBtn, progressControls;
      console.log("The OfflineLayer is ready to be used");
      offlineLayer.addTo(map);
      cacheBtn = new CacheBtnControl(offlineLayer);
      map.addControl(cacheBtn);
      progressControls = new OfflineProgressControl();
      progressControls.setOfflineLayer(offlineLayer);
      map.addControl(progressControls);
    };

    var onError = function (errorType, errorData1, errorData2) {
      console.log(errorType);
      console.log(errorData1);
      return console.log(errorData2);
    };


    var options = { maxZoom: 18, attribution: mapquestAttrib, subdomains: subDomains, onReady: onReady, onError: onError, storeName: "myStoreName", dbOption: "WebSQL" }
    offlineLayer = new OfflineLayer(mapquestUrl, options)

    // //Add OSM Layer
    // L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   attributions: "SOME TEXT TO OVERLAY",
    //   maxZoom: 18
    // }).addTo(this.map);
    // this.map.locate({
    //   setView: true,
    //   maxZoom: 16
    // }).on('locationfound', (e) => {
    //   console.log('found you');
    //   let markerGroup = L.featureGroup();
    //   let marker: any = L.marker([e.latitude, e.longitude]).on('click', () => {
    //     alert('Marker clicked');
    //   })
    //   markerGroup.addLayer(marker);
    //   this.map.addLayer(markerGroup);
    // }).on('locationerror', (error) => {
    //   alert(error.message);
    // })
  }
}
