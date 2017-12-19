import { Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { OnInit } from "@angular/core";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';
import { checkAvailability } from "@ionic-native/core";

import { DB_Handler } from '../../../../classes/DB_Handler';
import { DB_Updater } from '../../../../classes/DB_Updater';
import { DBC } from '../../../../classes/DBC';
import { Helper } from '../../../../classes/Helper';
import { tilesDb } from '../../../../classes/tilesDb';

import { HomePage } from '../../home';
import { MathRoute } from '../../../../classes/MathRoute';
import { SpinnerDialog} from "@ionic-native/spinner-dialog";

import { OrmService } from '../../../../services/orm-service';
import {User} from '../../../../entity/User';
import {Route} from '../../../../entity/Route';
import {State} from '../../../../entity/State';
import {Task} from '../../../../entity/Task';
import { RouteInfo } from '../../../../modals/RouteInfo/RouteInfo';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'Map.html'
})
export class MapPage implements OnInit {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  center: L.PointTuple;
  imageObject: any;
  routeDetails: MathRoute;
  routeImage: string;
  offlineLayer: any;
  offlineControl: any;
  userMarker: any;
  isFilePluginAvailable: boolean;
  doneDownload: number;
  totalDownload: number;
  isDownloading: boolean = false;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private geolocation: Geolocation,
    private updater: DB_Updater,
    private spinner: SpinnerDialog,
    private modalCtrl: ModalController,
    private ormService: OrmService) { }

  async ionViewDidEnter() {
    console.log("ionViewDidEnter:");

    // TODO test of type orm
    const connection = await this.ormService.getConnection();
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.name = "asdf";
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);

    console.log("Loaded users: ", users);

    const routes = await connection.manager.find(Route, {relations: ["tasks"]});
    console.log("number of routes: " + routes.length);
    const states = await connection.manager.find(State);
    console.log("number of states: " + states.length);
    const tasks = await connection.manager.find(Task);
    console.log("number of tasks: " + tasks.length);
  }

  ngOnInit() {
    this.isFilePluginAvailable = checkAvailability(File.getPluginRef(), null, File.getPluginName()) === true;
    this.platform.ready().then(() => {
      console.log('Platform is ready!');
      this.initializeMap();
    });

    this.loadMap();
  }

  markerGroup: any = null;

  async initializeMap() {
    let dbHandler = DB_Handler.getInstance();
    const map = this.map
    if (this.markerGroup != null) {
      console.warn('removing markerGroup');
      this.map.removeLayer(this.markerGroup);
      this.markerGroup = null;
    }

    dbHandler.ready().then(() => {
      console.warn('db handler initialized');
      this.updater.execute(["getVersions", DBC.DATABASE_TABLE_STATE, "checkForUpdates"]).then(() => {
        console.log("updater finished!")
        // let table = DBC.DB_ROUTE;
        // let sqlQry = `SELECT * FROM ${table.getTableName()} WHERE ${table.fields[2]}=1;`;
        // console.log(`SQL QUERY: ${sqlQry}`)
        // let dbh = DB_Handler.getInstance();
        // let db = dbh.getWritableDatabase();
        let fileManager = new File();
        // db.executeSql(sqlQry, []).then(result => {
        this.spinner.show(null, "Lade Routen", true);
          dbHandler.getReadyRoutes(1).then(result => {
          let markerGroup = L.markerClusterGroup();
          // for (var i = 0; i < result.rows.length; i++) {
            result.forEach(row => {
            // let row = result.rows.item(i);
            // let center = JSON.parse(row.center);
            let marker: any = L.marker([row.Center.lat, row.Center.lng]).on('click', () => {
              // let imageFileName = row.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "");
              if (this.isFilePluginAvailable) {
                let imageFileName = row.getInfo("image").replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "");
                fileManager.readAsDataURL(fileManager.dataDirectory, imageFileName)
                  .then(imageData => this.routeImage = imageData, imageError => {
                    console.error("Error making image DataURL:", imageError);
                    // TODO: default empty image holder
                  })
                  .catch(error => {
                    console.error("Error making image DataURL:", JSON.stringify(error));
                    // TODO: default empty image holder
                  })
              } else {
                this.routeImage = Helper.WEBSERVER_URL + row.getInfo("image");
              }
              this.routeDetails = row;
            })
            markerGroup.addLayer(marker);
          }) //for

          map.addLayer(markerGroup);
          this.markerGroup = markerGroup;
          this.spinner.hide();
        });
      })
    }).catch(error => {
      console.error(`DB_Handler initialization error: ${JSON.stringify(error)}`);
      this.spinner.hide();
    })
  }

  loadMap() {
    this.center = [50.1208566, 8.66158515]; // Frankfurt-am Main
    let mapquestUrl = Helper.mapquestUrl
    let subDomains = Helper.subDomains

    //[[38.4298915,27.1227443],[38.4129794,27.1416646]]
    const corner1 = L.latLng(52.3905689,13.0644729)
    const corner2 = L.latLng(52.3513863,13.1632323)
    const bounds: L.latLngBounds = L.latLngBounds(corner1, corner2)


    if (this.map == null) {
      this.map = L.map('map', {
        center: this.center,
        zoom: 16,
        tileSize: 256
      });
      // this.map.fitBounds(bounds);
      this.map.setZoom(16);
      this.map.on('click', e => {
        //check if details open and reset content. for now just reset content
        this.routeDetails = null;
        this.routeImage = null;
        console.log('cleared route details');
      })
      let map = this.map;
      tilesDb.initialize().then(() => {
        console.log("Tiles DB Initialized");
        let offlineLayer = L.tileLayer.offline(mapquestUrl, tilesDb, {
          attribution: '&copy; <a href="https://www.mapbox.com" target="_blank">mapbox.com</a>',
          subdomains: subDomains,
          minZoom: 7,
          maxZoom: 20,
          tileSize: 256,
          crossOrigin: true,
          detectRetina: true
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
          maxZoom: 20
        });

        offlineLayer.addTo(map);
        // offlineControl.addTo(map);

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
          if (resp && resp.coords) {
            console.warn('found you');
            Helper.myLocation = resp;
            console.log(`Coordinates: ${JSON.stringify(resp)}`);
            // let markerGroup = L.featureGroup();
            this.userMarker = L.circleMarker([resp.coords.latitude, resp.coords.longitude]).on('click', () => {
              alert('Marker clicked');
            });
            this.userMarker.addTo(this.map);
            this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude), 8);

            let watch = this.geolocation.watchPosition();
            watch.subscribe(resp => {
              if (resp && resp.coords) {
                Helper.myLocation = resp;
                console.log(`Coordinates: ${JSON.stringify(resp)}`);
                const lanlng = new L.LatLng(resp.coords.latitude, resp.coords.longitude);
                // this.map.panTo(lanlng);
                this.userMarker.setLatLng(lanlng);
              }
            });
          }
        })
        .catch(error => {
          console.error(`Location error: ${JSON.stringify(error)}`);
        })
    }
  }

  doDownload(route: MathRoute): void {
    console.log(`Route details ${JSON.stringify(route.Id)}`);
    console.log("clicked");

    // uncommend this line to switch displaying route (online only mode)
    //HomePage.nav.push(TasksMap, { route: route });
    this.isDownloading = true;
    this.totalDownload = 0;
    this.doneDownload = 0;
    const self = this;
    route.downloadMap(function(doneDownload, totalDownload) {
        self.doneDownload = doneDownload;
        self.totalDownload = totalDownload;
    }).then(() => {
      this.isDownloading = false;
      // HomePage.nav.push(TasksMap, { route: route })
    });
  }

  showRoute(route: MathRoute): void {
    HomePage.nav.push('TasksMap', { routeId: route.Id })
  }

  removeRoute(route: MathRoute): void {
    route.removeDownloadedMap();
  }


  presentRouteInfoModal(route: MathRoute): void {
    let routeInfoModal = this.modalCtrl.create(RouteInfo, {route: route});
    routeInfoModal.present();
  }

}
