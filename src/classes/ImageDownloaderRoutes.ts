import { Injectable } from '@angular/core'
import { checkAvailability } from "@ionic-native/core";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer'
import { DB_Handler } from './DB_Handler'
import { ImagesService } from '../services/images-service';

@Injectable()
export class ImageDownloaderRoutes {
  // protected Context context;
  // protected RoutesOverviewActivity parent;
  // protected boolean doNotCheck;
  // protected ProgressDialog dialog;

  constructor(private imagesService: ImagesService) {
  }

  async doInBackground(doNotCheck: boolean) {
    if (checkAvailability(FileTransfer.getPluginRef(), null, FileTransfer.getPluginName()) !== true) {
      return true;
    }
    let dbHandler = DB_Handler.getInstance()
    let trailInfo = await dbHandler.getTrailsImageInfo()

    let images = [];
    for (var i = 0; i < trailInfo.length; i++) {
      let info = trailInfo[i];
      if (info[0] === "0") {
        continue
      }

      let imgFileName = info[1]
      // No image in task
      if (imgFileName.trim() === "" || imgFileName.toLowerCase() === "null") {
        continue
      }
        images.push(imgFileName);
    }
    await this.imagesService.downloadURLs(images, true);
  }
}