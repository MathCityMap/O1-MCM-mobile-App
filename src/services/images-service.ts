import { Injectable } from "@angular/core";
import { checkAvailability } from "@ionic-native/core";
import { File, FileEntry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import async from 'async'
import { Helper } from '../classes/Helper';

@Injectable()
export class ImagesService {

    private nativeBaseURL: string;
    private isInitialized = false;
    private downloadQueue: any = null;

    constructor(private fileManager: File, private platform: Platform, private transfer: FileTransfer) {
    }

    private saveThumb(newFileName: string, base64: string, fileManager: File) {
        console.log("saving thumbnail to " + newFileName);
        // var url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        fetch(base64)
            .then(res => {
                res.blob().then(blob => {
                    fileManager.writeFile(fileManager.dataDirectory, newFileName, blob, {replace: true}).then(val => {
                    }, error => console.error("Write error: " + JSON.stringify(error)))
                        .catch(error => console.error("Write error: " + JSON.stringify(error)))
                }, error => console.error("Blob error: " + JSON.stringify(error)))
                    .catch(error => console.error("Blob error: " + JSON.stringify(error)))
            })
            .then(blob => console.log(blob))
    }

    private resizedataURL(datas: any, wantedWidth: number, wantedHeight: number): Promise<string> {
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

    async getNativeBaseURL(): Promise<string> {
        if (this.isInitialized) {
            return this.nativeBaseURL;
        }
        await this.platform.ready();

        let filePluginIsAvailable = checkAvailability(File.getPluginRef(), null, File.getPluginName()) === true;
        let isLoadedViaHttp = window.location.href.indexOf('http') === 0;
        if (filePluginIsAvailable && !isLoadedViaHttp) {
            // if loaded via http (for live reload during development), local URLs cannot be accessed
            let directory = await this.fileManager.resolveDirectoryUrl(this.fileManager.dataDirectory);
            this.nativeBaseURL = directory.nativeURL;
        }
        this.isInitialized = true;
        return this.nativeBaseURL;
    }

    async downloadURLs(urls: string[], createThumbs: boolean, progressCallback: DownloadProgressCallback = null): Promise<any> {
        let promiseError;
        const fileTransfer: FileTransferObject = this.transfer.create();
        let dataDirectory = this.fileManager.dataDirectory;
        let fileManager = this.fileManager;
        let resizedataURL = this.resizedataURL;
        let saveThumb = this.saveThumb;
        let totalDownload = urls.length;
        let alreadyDownloaded = 0;
        let that = this;
        if (progressCallback) {
            progressCallback(alreadyDownloaded, totalDownload);
        }
        this.downloadQueue = async.queue(function (task: any, continueCallback: any) {
            console.log("downloading: " + JSON.stringify(task));
            function callback() {
                alreadyDownloaded++;
                console.log("download progress: " + alreadyDownloaded + "/" + totalDownload);
                if (progressCallback) {
                    if (progressCallback(alreadyDownloaded, totalDownload)) {
                        // user aborted download process
                        that.downloadQueue.kill();
                        promiseError("user canceled download");
                    }
                }
                continueCallback();

            }
            fileTransfer.download(Helper.WEBSERVER_URL + encodeURI(task.imgFileName), dataDirectory + task.outputName)
                .then(() => {
                    if (!createThumbs) {
                        callback();
                        return;
                    }
                    fileManager.readAsDataURL(dataDirectory, task.outputName)
                        .then(dataURI => {
                            resizedataURL(dataURI, 120, 120)
                                .then(resizedBase64 => {
                                    saveThumb(that.getLocalThumbFileName(task.imgFileName), resizedBase64, fileManager)
                                    callback()
                                })
                                .catch(error => {
                                    console.error("saveThumb error " + JSON.stringify(error))
                                    callback()
                                });
                        }, error => {
                            console.error("readAsDataURL error: " + JSON.stringify(error))
                            callback();
                        })
                        .catch(error => {
                            console.error("readAsDataURL error: " + JSON.stringify(error))
                            callback();
                        })
                })
                .catch(error => {
                    console.error(`Error downloading image ${task.imgFileName}`)
                    callback();
                })
        }, 1);

        let resolvedDataDirectory = await this.fileManager.resolveDirectoryUrl(dataDirectory)
        for (var i = 0; i < urls.length; i++) {
            let imgFileName = urls[i]
            // No image in task
            if (imgFileName.trim() === "" || imgFileName.toLowerCase() === "null") {
                continue
            }


            let outputName = this.getLocalFileName(imgFileName);
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
                        });
                    } else {
                        alreadyDownloaded++;
                        if (progressCallback) {
                            progressCallback(alreadyDownloaded, totalDownload);
                        }
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
        if (this.downloadQueue.length() === 0) {
            return;
        }
        return new Promise<any>((success, error) => {
            promiseError = error;
            this.downloadQueue.drain = success;
        });
    }

    getLocalFileName(imgPath: string) : string {
        return imgPath.replace(/\/| /g, '_');
    }

    getLocalThumbFileName(imgPath: string) : string {
        return 'thumb_' + this.getLocalFileName(imgPath);
    }

    async removeDownloadedURLs(urls: string[], removeThumbs = true): Promise<any> {
        let resolvedDataDirectory = await this.fileManager.resolveDirectoryUrl(this.fileManager.dataDirectory)
        for (var i = 0; i < urls.length; i++) {
            let imgFileName = urls[i]
            // No image in task
            if (imgFileName.trim() === "" || imgFileName.toLowerCase() === "null") {
                continue
            }


            let outputName = this.getLocalFileName(imgFileName);
            let file;
            try {
                file = await this.fileManager.getFile(resolvedDataDirectory, outputName, {create: false});
                if (file !== null) {
                    await this.deleteFile(file);
                }
                console.log("deleted file " + outputName);
            } catch (e) {
                console.log("Could not delete file " + outputName + ": " + e);
            }
            if (removeThumbs) {
                outputName = this.getLocalThumbFileName(imgFileName);
                try {
                    file = await this.fileManager.getFile(resolvedDataDirectory, outputName, {create: false});
                    if (file !== null) {
                        await this.deleteFile(file);
                    }
                    console.log("deleted file " + outputName);
                } catch (e) {
                    console.log("Could not delete file " + outputName + ": " + e);
                }
            }
        }
    }

    deleteFile(fileEntry: FileEntry): Promise<void> {
        return new Promise<void>((success, error) => {
            fileEntry.remove(success, error);
        });
    }
}


export interface DownloadProgressCallback {
    (alreadyDownloaded: number, totalDownload: number): boolean
}
