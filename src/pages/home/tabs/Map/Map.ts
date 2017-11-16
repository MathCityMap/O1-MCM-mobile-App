import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';

import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';

// import { DB_Handler } from '../../../../classes/DB_Handler';
// import { DB_Updater } from '../../../../classes/DB_Updater';
// import { DBC } from '../../../../classes/DBC';
import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

@Component({
  selector: 'page-map',
  templateUrl: 'Map.html'
})
export class MapPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  center: L.PointTuple;
  imageObject: any;
  offlineLayer: any;
  offlineControl: any;
  userMarker: any;
  routeDetails: any;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private geolocation: Geolocation/*,
    private updater: DB_Updater*/) { }

  ionViewDidEnter() {
    console.log("ionViewDidEnter:");
    this.platform.ready().then(() => {
      console.log('Platform is ready!');
      this.initializeMap();
    });

    this.loadMap();
  }

  markerGroup: any = null;

  fakeMarkers = [
    {
      center: [50.1160032, 8.6533159],
      title: 'Bockenheim Trail für Klasse 9/10',
      city: 'Frankfurt',
      country_code: 'DE'
    }
    ,
    {
      center: [50.10762995, 8.69866935],
      title: 'Maine Route',
      city: 'Frankfurt',
      country_code: 'DE'
    },
    {
      center: [50.1183028, 8.6529914],
      title: 'Platane',
      city: 'Frankfurt',
      country_code: 'DE'
    },
    {
      center: [50.11769565, 8.65083485],
      title: 'LFB MathCityMap',
      city: 'Frankfurt',
      country_code: 'DE'
    },
    {
      center: [50.1079568, 8.704066],
      title: 'Im Schatten der EZB',
      city: 'Frankfurt',
      country_code: 'DE'
    },
    {
      center: [50.1180431, 8.65184875],
      title: 'Bockenheim Trail für Klasse 5/6',
      city: 'Frankfurt',
      country_code: 'DE'
    },
    {
      center: [50.10763685, 8.53414805],
      title: 'ULB Trail',
      city: 'Frankfurt',
      country_code: 'DE',
      grade: '9'
    }
  ];

  initializeMap() {
    // let dbHandler = DB_Handler.getInstance();
    if (this.markerGroup != null) {
      console.warn('removing markerGroup');
      this.map.removeLayer(this.markerGroup);
      this.markerGroup = null;
    }

    let markerGroup = L.markerClusterGroup();
    for (var i = 0; i < this.fakeMarkers.length; i++) {
      let row: any = this.fakeMarkers[i];
      let center = row.center;
      let marker: any = L.marker([center[0], center[1]]).on('click', () => {
        this.routeDetails = row;
        this.routeDetails.imageData = "data:image/gif;base64,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";
      })
      markerGroup.addLayer(marker);
    }

    this.map.addLayer(markerGroup);
    this.markerGroup = markerGroup;
  }

  loadMap() {
    this.center = [50.1208566, 8.66158515]; // Frankfurt-am Main
    let mapquestUrl = `http://{s}.tiles.mapbox.com/v4/${Helper.mapCode}/{z}/{x}/{y}.png?access_token=${Helper.accessToken}`
    let subDomains = ['a', 'b', 'c', 'd'];

    if (this.map == null) {
      this.map = L.map('map', {
        center: this.center,
        zoom: 13,
        maxZoom: 19
      })
      this.map.on('click', e => {
        console.log('clicked!!!');
      });
      let map = this.map;
      tilesDb.initialize().then(() => {
        console.log("Tiles DB Initialized");
        let offlineLayer = L.tileLayer.offline(mapquestUrl, tilesDb, {
          attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
          subdomains: subDomains,
          minZoom: 10,
          maxZoom: 18,
          crossOrigin: true
        });
        let offlineControl = L.control.offline(offlineLayer, tilesDb, {
          saveButtonHtml: '<i class="fa fa-download" aria-hidden="true">Save</i>',
          removeButtonHtml: '<i class="fa fa-trash" aria-hidden="true">Remove</i>',
          confirmSavingCallback: function (nTilesToSave, continueSaveTiles) {
            if (nTilesToSave > 1000) {
              window.alert('Too much tiles to save: ' + nTilesToSave);
            } else if (window.confirm('Save ' + nTilesToSave + '?')) {
              continueSaveTiles();
            }
          },
          confirmRemovalCallback: function (continueRemoveTiles) {
            if (window.confirm('Remove all the tiles?')) {
              continueRemoveTiles();
            }
          },
          minZoom: 10,
          maxZoom: 16
        });

        offlineLayer.addTo(map);
        offlineControl.addTo(map);

        offlineLayer.on('offline:below-min-zoom-error', function () {
          alert('Can not save tiles below minimum zoom level.');
        });

        offlineLayer.on('offline:save-start', function (data) {
          console.log(data);
          console.log('Saving ' + data.nTilesToSave + ' tiles.');
        });

        offlineLayer.on('offline:save-end', function () {
          alert('All the tiles were saved.');
        });

        offlineLayer.on('offline:save-error', function (err) {
          console.error('Error when saving tiles: ' + err);
        });

        offlineLayer.on('offline:remove-start', function () {
          console.log('Removing tiles.');
        });

        offlineLayer.on('offline:remove-end', function () {
          alert('All the tiles were removed.');
        });

        offlineLayer.on('offline:remove-error', function (err) {
          console.error('Error when removing tiles: ' + err);
        });
      });

      this.geolocation.getCurrentPosition()
        .then(resp => {
          console.warn('found you');
          Helper.myLocation = resp;
          console.log(`Coordinates: ${JSON.stringify(resp)}`);
          // let markerGroup = L.featureGroup();
          this.userMarker = L.circleMarker([resp.coords.latitude, resp.coords.longitude]).on('click', () => {
            alert('Marker clicked');
          })
          // markerGroup.addLayer(marker);
          // this.map.addLayer(markerGroup);
          // this.userMarker.addTo(this.map);
          // this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude), 16);
        })
        .catch(error => {
          console.error(`Location error: ${JSON.stringify(error)}`);
        })

      // let watch = this.geolocation.watchPosition();
      // watch.subscribe(resp => {
      //   if (resp) {
      //     Helper.myLocation = resp;
      //     console.log(`Coordinates: ${JSON.stringify(resp)}`);
      //     const lanlng = new L.LatLng(resp.coords.latitude, resp.coords.longitude);
      //     this.map.panTo(lanlng);
      //     this.userMarker.setLatLng(lanlng);
      //   }
      // });
    }
  }
}
