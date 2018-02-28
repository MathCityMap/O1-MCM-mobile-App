import { Injectable } from "@angular/core";
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { checkAvailability } from "@ionic-native/core";


import { AlertController } from 'ionic-angular';

@Injectable()
export class gpsService {

     constructor(
         private diagnostic : Diagnostic,
         private alertCtrl : AlertController,
         public platform : Platform,
         private locationAcc : LocationAccuracy) { }

      public async isLocationOn(){
         await this.platform.ready();
        console.log("platform: " + this.platform.platforms());

          //if the platform is not browser
          if(this.platform.is("android") &&
              checkAvailability(LocationAccuracy.getPluginRef(), null, LocationAccuracy.getPluginName()) === true)
            this.diagnostic.isLocationEnabled().then((enabled) => {
              //if the location is off
              if(!enabled) this.turnLocationOn();
              })        
      }


    async locationAlert(){
        let confirm = this.alertCtrl.create({
      title: 'Location Off',
      message: 'Do you want to turn on your device location?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.turnLocationOn();
          }
        }
      ]
    });
    confirm.present();
  }



async turnLocationOn(){
    this.locationAcc.canRequest().then((can) => {
        if(can) this.locationAcc.request(this.locationAcc.REQUEST_PRIORITY_HIGH_ACCURACY).then(function(suc){
            console.log("Device Location is now turned ON");
    }, function(rip){ console.log("Device Location is still OFF ");})
    
   })

}

}


    