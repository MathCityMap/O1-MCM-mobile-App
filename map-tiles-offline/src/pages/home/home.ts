import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  center: leaflet.PointTuple;

  constructor(public navCtrl: NavController) { }

  ionViewDidEnter() {
    this.center = [48.775556, 9.182778];
    this.loadMap();
  }

  loadMap() {
    this.map = leaflet.map('map', {
      center: this.center,
      zoom: 13
    });

    //Add OSM Layer
    leaflet.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attributions: "SOME TEXT TO OVERLAY",
      maxZoom: 18
    }).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 16
    }).on('locationfound', (e) => {
      console.log('found you');
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
    }).on('locationerror', (error) => {
      alert(error.message);
    })
  }
}
