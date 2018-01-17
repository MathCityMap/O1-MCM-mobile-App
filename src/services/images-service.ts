import { Injectable } from "@angular/core";
import { checkAvailability } from "@ionic-native/core";
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';


@Injectable()
export class ImagesService {

    private nativeBaseURL: string;
    private isInitialized = false;

    constructor(private diagnostic: Diagnostic, private fileManager: File, private platform: Platform) {
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
}
