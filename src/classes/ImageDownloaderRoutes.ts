import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer'
import { AsyncTask } from './AsyncTask'
import { Helper } from './Helper'
import { DB_Handler } from './DB_Handler'

@Injectable()
export class ImageDownloaderRoutes extends AsyncTask<boolean> {
  // protected Context context;
  // protected RoutesOverviewActivity parent;
  // protected boolean doNotCheck;
  // protected ProgressDialog dialog;

  constructor(private transfer: FileTransfer, private fileManager: File) {
    super()
  }

  onPreExecute() {
    console.log("Ran onPreExecute")
    //     Runnable showProgressDialog = new Runnable() {
    //         @Override
    //         public void run() {
    //             try{
    //                 if(dialog == null){
    //                     dialog = new ProgressDialog(context);
    //                     dialog.setCancelable(false);
    //                     dialog.setMessage(context.getText(R.string.loading));
    //                     dialog.show();
    //                 }
    //             }catch (Exception e){e.printStackTrace();}
    //         }
    //     };
    //     new Handler(Looper.getMainLooper()).post(showProgressDialog);
  }

  private downloadImage(fileTransfer: FileTransferObject, imgFileName: string, outputName: string) {
    fileTransfer.download(Helper.WEBSERVER_URL + encodeURI(imgFileName), this.fileManager.dataDirectory + outputName)
    .then(entry => {
      // console.log(`Image download completed: ${entry.toURL()}`)
    }, error => {
      console.error(`Download error URL: [${imgFileName}]`)
    }).catch(error => {
      console.error(`Download error URL: [${imgFileName}]`)
    })
  }

  async doInBackground(doNotCheck: boolean) {
    if (doNotCheck) {
      return
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    let dbHandler = DB_Handler.getInstance()
    let trailInfo = await dbHandler.getTrailsImageInfo()

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

      let outputName = imgFileName.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "")
      // Check if file already exists - no need to download
      // let fileExists = await fileManager.checkFile(fileManager.dataDirectory, outputName)
      //   .then((res) => res, (err) => false)

      let resolvedDataDirectory = await this.fileManager.resolveDirectoryUrl(this.fileManager.dataDirectory)
      let file = await this.fileManager.getFile(resolvedDataDirectory, outputName, { create: false })
        .then((res) => res, (err) => null)
      if (file !== null) {
        file.file(file => {
          if (file.size <= 0) {
            // Path not empty and file does not exist - download from url
            this.downloadImage(fileTransfer, imgFileName, outputName)
          }
        })
      } else {
        // Path not empty and file does not exist - download from url
        this.downloadImage(fileTransfer, imgFileName, outputName)
      }
    }
  }

  onPostExecute() {
    console.log("Ran onPostExecute")
  }
  // @Override
  // protected void onPostExecute(Void empty) {
  //     // If all tables are updated - start image download of routes
  //     //System.out.println("Image update finished. Enable Buttons.");
  //     dialog.dismiss();
  //     parent.updateFinished();
  // }
}