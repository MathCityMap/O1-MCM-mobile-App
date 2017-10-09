import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import mapboxgl from 'mapbox-gl';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Coordinates: any;
  watch: any;
  map: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  ionViewDidEnter() {

    /*Initializing geolocation*/
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    let watch = this.geolocation.watchPosition(options);
    watch.subscribe((position: Geoposition) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      console.log(position);
      this.Coordinates = position.coords;
      this.executemap();
    });
  }

  // for future use one time get position asynchroniously
  getUserPosition() {
    let options = {
      enableHighAccuracy: true
    };

    this.geolocation.getCurrentPosition(options).then((pos: Geoposition) => {
      this.Coordinates = pos.coords;
      console.log(pos);
    }, (err: PositionError) => {
      console.log("error : " + err.message);
    });
  }

  executemap() {
    /*Initializing Map*/
    mapboxgl.accessToken = 'pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww';
    if (!this.map) {
      console.log('initial location', this.Coordinates);
      this.map = new mapboxgl.Map({
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [this.Coordinates.longitude, this.Coordinates.latitude], //[-74.0066, 40.7135],
        zoom: 16,
        pitch: 80,
        minZoom: 7.5, //restrict map zoom - buildings not visible beyond 13
        maxZoom: 17,
        container: 'map'
      });
    } else {
      console.log('updated location', this.Coordinates);
      this.map.flyTo({center: [this.Coordinates.longitude, this.Coordinates.latitude]});
    }
  }
}
