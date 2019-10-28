import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CameraPreviewOptions } from "@ionic-native/camera-preview";
import {CameraPreview} from "@ionic-native/camera-preview";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private cameraPreview: CameraPreview) {

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
    }


    this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });
  }

  switchMode(){
    this.scene++;
    this.scene = this.scene%3;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AumentedRealityPage');
  }

}
