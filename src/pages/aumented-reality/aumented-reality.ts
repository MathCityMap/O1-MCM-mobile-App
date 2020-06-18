import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from "@ionic-native/camera-preview";
import { GpsService } from "../../services/gps-service";
import { timeout } from 'promise-timeout';
import { File } from '@ionic-native/file';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Geoposition } from "@ionic-native/geolocation";

/**
 * Generated class for the AumentedRealityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'page-aumented-reality',
  templateUrl: 'aumented-reality.html',
})

export class AumentedRealityPage {

  scene: number = 0;
  @ViewChild('testAR') testAr: HTMLIFrameElement;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private gpsService: GpsService,
               private modalCtrl: ViewController,
               private cameraPreview: CameraPreview,
               private inAppBrowser: InAppBrowser,
               private file: File,
  ) {

    let cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: true,
      toBack: true,
      alpha: 1
    };

    // this.cameraPreview.startCamera(cameraPreviewOpts).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   });
  }

  switchMode () {
    this.scene++;
    this.scene = this.scene % 3;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AumentedRealityPage');

    this.getCurrentPosition()
      .then(position => {
        // TODO: open https://mcm.autentek.de/example.php?lon=xxx&lat=yyy
        if (position == null) {
          alert('cannot determine your poasition');
        } else {
          window.open(`https://mcm.autentek.de/example.php?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`, '_system', 'location=yes');
        }
      })
      .catch();
  }

  async getCurrentPosition () {
    let position: Geoposition = {
      coords: null,
      timestamp: null,
    };
    if (!this.gpsService.getLastPosition()) {
      // try to get position
      try {
        position = await this.gpsService.getCurrentPosition({timeout: 2000, maximumAge: 0});
        // await timeout(this.gpsService.getCurrentPosition().catch(err => {
        //   console.error("getCurrentPosition: Error loading GPS data", err);
        // }), 2000);
      } catch (e) {
        console.log("getCurrentPosition: could not obtain position: " + e.message);
        // make position check async
        try {
          position = await this.gpsService.getCurrentPosition();
          if (position && position.coords) {
            console.log('getCurrentPosition: ', position);
          }
        } catch (err) {
          console.error("getCurrentPosition: Error loading GPS data", err);
        }
      }
    } else {
      console.log("getCurrentPosition: last position", this.gpsService.getLastPosition());
      position = this.gpsService.getLastPosition();
    }

    return position;
  }

  close () {
    this.modalCtrl.dismiss();
  }

}
