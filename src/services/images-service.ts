import { Injectable } from "@angular/core";
import { checkAvailability } from "@ionic-native/core";
import { DirectoryEntry, File, FileEntry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import async from 'async'
import { Helper } from '../classes/Helper';

@Injectable()
export class ImagesService {
    public static INSTANCE: ImagesService;
    private nativeBaseURL: string;
    private isInitialized = false;
    private downloadQueue: any = null;
    private offlineImageUrlCache = {};
    private offlineThumbnailUrlCache = {};
    private lazyLoadedImagesCache = {};
    private filePluginAvailable: boolean;
    private dataDirectory: DirectoryEntry;

    constructor(private fileManager: File, private platform: Platform, private transfer: FileTransfer) {
        ImagesService.INSTANCE = this;
        this.init();
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

    isFilePluginAvailable() {
        return this.filePluginAvailable;
    }

    async init(): Promise<string> {
        if (this.isInitialized) {
            return this.nativeBaseURL;
        }
        await this.platform.ready();

        this.filePluginAvailable = checkAvailability(File.getPluginRef(), null, File.getPluginName()) === true
        if (this.filePluginAvailable) {
            this.dataDirectory = await this.fileManager.resolveDirectoryUrl(this.fileManager.dataDirectory);
            let isLoadedViaHttp = window.location.href.indexOf('http') === 0;
            if (!isLoadedViaHttp) {
                this.nativeBaseURL = this.dataDirectory.nativeURL;
            }
        }
        this.isInitialized = true;
        return this.nativeBaseURL;
    }

    async downloadURLs(urls: string[], createThumbs: boolean, progressCallback: DownloadProgressCallback = null,
                       skipCheckForExistingFiles: boolean = false): Promise<any> {
        if (!this.isFilePluginAvailable()) {
            return;
        }
        let promiseError = null;
        const fileTransfer: FileTransferObject = this.transfer.create();
        let dataDirectory = this.fileManager.dataDirectory;
        let fileManager = this.fileManager;
        let resizedataURL = this.resizedataURL;
        let saveThumb = this.saveThumb;
        let totalDownload = urls.length;
        let alreadyDownloaded = 0;
        let that = this;
        this.downloadQueue = async.queue(function (task: any, continueCallback: any) {
            function callback() {
                alreadyDownloaded++;
                console.log(`download progress: ${alreadyDownloaded}/${totalDownload} - ${task.imgFileName}`);
                if (task.callback) {
                    task.callback(alreadyDownloaded, totalDownload, task.imgFileName);
                }
                if (progressCallback) {
                    if (progressCallback(alreadyDownloaded, totalDownload, task.imgFileName)) {
                        // user aborted download process
                        that.downloadQueue.kill();
                        promiseError("user canceled download");
                        return;
                    }
                }
                continueCallback();
            }
            console.log('Starting download task for ' + task.outputName);
            let url = task.imgFileName.indexOf('http') === 0 ? task.imgFileName
                : Helper.WEBSERVER_URL + encodeURI(task.imgFileName);
            fileTransfer.download(url, dataDirectory + task.outputName)
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
        }, 8);

        let promise = new Promise<any>((success, error) => {
            promiseError = error;
            this.downloadQueue.drain = success;
        });

        for (var i = 0; i < urls.length; i++) {
            let imgFileName = urls[i];
            // No image in task
            if (imgFileName.trim() === "" || imgFileName.toLowerCase() === "null") {
                continue
            }


            let outputName = this.getLocalFileName(imgFileName);
            let file;
            if (!skipCheckForExistingFiles &&
                null !== (file = await this.fileManager.getFile(this.dataDirectory, outputName, { create: false })
                    .then((res) => res, (err) => null))) {
                file.file(file => {
                    if (file.size <= 0) {
                        // Path not empty and file does not exist - download from url
                        this.downloadQueue.push({
                            fileTransfer: fileTransfer,
                            imgFileName: imgFileName,
                            outputName: outputName,
                            callback: urls.length == 1 ? progressCallback : null
                        }, () => {
                            console.log(`Finished downloading ${outputName}`)
                        });
                    } else {
                        alreadyDownloaded++;
                        if (progressCallback) {
                            console.log(`Already downloaded: ${outputName}`)
                            progressCallback(alreadyDownloaded, totalDownload, imgFileName);
                        }
                    }
                }, error => {
                    // file could not be read
                    this.downloadQueue.push({
                        fileTransfer: fileTransfer,
                        imgFileName: imgFileName,
                        outputName: outputName,
                        callback: urls.length == 1 ? progressCallback : null
                    }, () => {
                        console.log(`Finished downloading ${outputName}`)
                    });
                })
            } else {
                // Path not empty and file does not exist - download from url
                console.log(`Adding to download queue: ${outputName}`);
                this.downloadQueue.push({
                    fileTransfer: fileTransfer,
                    imgFileName: imgFileName,
                    outputName: outputName,
                    callback: urls.length == 1 ? progressCallback : null
                }, () => {
                    console.log(`Finished downloading ${outputName}`)
                })
            }
        }
        if (this.downloadQueue.length() === 0) {
            return;
        }
        return promise;
    }

    getLocalFileName(imgPath: string) : string {
        if (imgPath.indexOf('http') === 0) {
            // strip hostname
            imgPath = imgPath.substring(imgPath.indexOf('/', 9) + 1);
            let queryIndex = imgPath.indexOf('?');
            if (queryIndex > 0) {
                // strip query
                imgPath = imgPath.substring(0, queryIndex);
            }
        }
        return imgPath.replace(/\/| |@/g, '_');
    }

    getLocalThumbFileName(imgPath: string) : string {
        return 'thumb_' + this.getLocalFileName(imgPath);
    }

    getOfflineURL(imgPath: string, asThumbNail: boolean = false) : string {
        if (asThumbNail) {
            return this.offlineThumbnailUrlCache[imgPath] ? this.offlineThumbnailUrlCache[imgPath]
                : this.offlineThumbnailUrlCache[imgPath] =
                    (this.nativeBaseURL ? this.nativeBaseURL + this.getLocalThumbFileName(imgPath)
                        : this.getOnlineURL(imgPath));
        }
        return this.offlineImageUrlCache[imgPath] ? this.offlineImageUrlCache[imgPath]
            : this.offlineImageUrlCache[imgPath] =
                (this.nativeBaseURL ? this.nativeBaseURL + this.getLocalFileName(imgPath)
                    : this.getOnlineURL(imgPath));
    }

    getOnlineURL(imgPath: string) {
        return imgPath.indexOf('http') !== 0 ? Helper.WEBSERVER_URL + imgPath : imgPath;
    }

    async removeDownloadedURLs(urls: string[], removeThumbs = true): Promise<any> {
        if (!this.dataDirectory) {
            return;
        }
        for (var i = 0; i < urls.length; i++) {
            let imgFileName = urls[i]
            // No image in task
            if (imgFileName.trim() === "" || imgFileName.toLowerCase() === "null") {
                continue
            }


            let outputName = this.getLocalFileName(imgFileName);
            let file;
            this.fileManager.getFile(this.dataDirectory, outputName, {create: false}).then(file => {
                file.remove(() => console.log("deleted file " + outputName),
                    () => console.log("could not delete file " + outputName))
            }, () => console.log("could not delete file " + outputName));
            if (removeThumbs) {
                outputName = this.getLocalThumbFileName(imgFileName);
                this.fileManager.getFile(this.dataDirectory, outputName, {create: false}).then(file => {
                    file.remove(() => console.log("deleted file " + outputName),
                        () => console.log("could not delete file " + outputName))
                }, () => console.log("could not delete file " + outputName));
            }
        }
    }

    /**
     *
     * @param {string} imgPath
     * @param {string} imageSize 's', 'thumb', 'xl' or 'xxl'
     * @returns {Promise<string>}
     */
    async getAsyncImageURL(imgPath: string, imageSize: string): Promise<string> {
        if (imageSize) {
            let lastSlashIndex = imgPath.lastIndexOf('/');
            imgPath = imgPath.substring(0, lastSlashIndex) + '/' + imageSize + imgPath.substring(lastSlashIndex);
        }
        if (this.lazyLoadedImagesCache[imgPath]) {
            return this.lazyLoadedImagesCache[imgPath];
        }
        if (this.dataDirectory) {
            // we need to check for downloaded files
            await new Promise(success => {
                this.downloadURLs([imgPath], false, (alreadyDownloaded, totalDownload, url) => {
                    if (url == imgPath) {
                        success();
                    }
                    return false;
                }, false);
            });
        }
        return this.lazyLoadedImagesCache[imgPath] = this.getOfflineURL(imgPath);
    }
}


export interface DownloadProgressCallback {
    (alreadyDownloaded: number, totalDownload: number, url: string): boolean
}
