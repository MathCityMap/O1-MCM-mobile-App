import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from "@ionic-native/camera-preview";
import {GpsService} from "../../services/gps-service";
import {timeout} from 'promise-timeout';

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
  @ViewChild('testAR') testAr;

  constructor (public navCtrl: NavController,
               public navParams: NavParams,
               private gpsService: GpsService,
               private modalCtrl: ViewController,
               private cameraPreview: CameraPreview,
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

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      });
  }

  switchMode () {
    this.scene++;
    this.scene = this.scene % 3;
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad AumentedRealityPage');

    // this.getCurrentPosition().catch();
    console.log('testAR', this.testAr.nativeElement);

  }

  async getCurrentPosition() {
    if (!this.gpsService.getLastPosition()) {
      // try to get position
      try {
        await timeout(this.gpsService.getCurrentPosition().catch(err => {
          console.error("getCurrentPosition: Error loading GPS data", err)
        }), 2000);
      } catch (e) {
        console.log("getCurrentPosition: could not obtain position: " + e.message);
        // make position check async
        this.gpsService.getCurrentPosition().then((position) => {
          if (position && position.coords) {
            console.log('getCurrentPosition: ', position);
          }
        }, err => {
          console.error("getCurrentPosition: Error loading GPS data", err)
        });
      }
    } else {
      console.log("getCurrentPosition: last position", this.gpsService.getLastPosition());
    }
  }

  close () {
    this.modalCtrl.dismiss();
  }

}
