import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer'
import { AsyncTask } from './AsyncTask'
import { Helper } from './Helper'
import { DB_Handler } from './DB_Handler'
import async from 'async'

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

  private downloadQueue: any = null;

  async doInBackground(doNotCheck: boolean) {
    if (doNotCheck) {
      return
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    let dbHandler = DB_Handler.getInstance()
    let trailInfo = await dbHandler.getTrailsImageInfo()
    let dataDirectory = this.fileManager.dataDirectory
    let fileManager = this.fileManager
    let resizedataURL = this.resizedataURL
    let saveThumb = this.saveThumb
    this.downloadQueue = async.queue(function (task: any, callback: any) {
      console.log("downloading: " + JSON.stringify(task))
      fileTransfer.download(Helper.WEBSERVER_URL + encodeURI(task.imgFileName), dataDirectory + task.outputName + '.tmp')
        .then(() => {
          console.log("Moving file")
          fileManager.moveFile(dataDirectory, task.outputName + '.tmp', dataDirectory, task.outputName)
            .then(entry => {
              console.log("Moved file")
              // let filePath = entry.toInternalURL()
              fileManager.readAsDataURL(dataDirectory, task.outputName)
                .then(dataURI => {
                  resizedataURL(dataURI, 120, 120, 'thumb_' + task.outputName)
                    .then(resizedBase64 => {
                      saveThumb('thumb_' + task.outputName, resizedBase64, fileManager)
                    })
                    .catch(error => {
                      console.error("saveThumb error " + JSON.stringify(error))
                      callback()
                    })
                  callback()
                }, error => {
                  console.error("readAsDataURL error: " + JSON.stringify(error))
                  callback()
                })
                .catch(error => {
                  console.error("readAsDataURL error: " + JSON.stringify(error))
                  callback()
                })
            })
            .catch(err => {
              callback()
            })
        })
        .catch(error => {
          console.error(`Error downloading image ${task.imgFileName}`)
          callback()
        })
    }, 8)

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
      let resolvedDataDirectory = await this.fileManager.resolveDirectoryUrl(dataDirectory)
      let file = await this.fileManager.getFile(resolvedDataDirectory, outputName, { create: false })
        .then((res) => res, (err) => null)
      if (file !== null) {
        file.file(file => {
          if (file.size <= 0) {
            // Path not empty and file does not exist - download from url
            this.downloadQueue.push({
              fileTransfer: fileTransfer,
              imgFileName: imgFileName,
              outputName: outputName
            }, err => {
              console.log(`Finished downloading ${fileTransfer}`)
            })
          }
        })
      } else {
        // Path not empty and file does not exist - download from url
        this.downloadQueue.push({
          fileTransfer: fileTransfer,
          imgFileName: imgFileName,
          outputName: outputName
        }, err => {
          console.log(`Finished downloading ${fileTransfer}`)
        })
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

  private saveThumb(newFileName: string, base64: string, fileManager: File) {
    // var url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    fetch(base64)
      .then(res => {
        res.blob().then(blob => {
          fileManager.writeFile(fileManager.dataDirectory, newFileName, blob, {replace: true}).then(val => {
            console.warn("Written")
          }, error => console.error("Write error: " + JSON.stringify(error)))
            .catch(error => console.error("Write error: " + JSON.stringify(error)))
        }, error => console.error("Blob error: " + JSON.stringify(error)))
          .catch(error => console.error("Blob error: " + JSON.stringify(error)))
      })
      .then(blob => console.log(blob))
  }

  private resizedataURL(datas: any, wantedWidth: number, wantedHeight: number, newFileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let img = document.createElement('img')
      img.onload = () => {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        canvas.width = wantedWidth
        canvas.height = wantedHeight
        ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight)
        const dataURI = canvas.toDataURL()
        resolve(dataURI)
      };

      img.src = datas;
    })
  }

}