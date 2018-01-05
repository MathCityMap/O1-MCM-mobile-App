import { Component,Input, Inject} from '@angular/core';
import { BroadcastService } from '../../services/broadcast-service';

@Component({
    selector: 'mcm-download-progress-popup',
    templateUrl:'./mcm-download-progress-popup.component.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMDownloadProgressPopupComponent{
    total = 0;
    currentProgress = 0;
    constructor(private broadcastService: BroadcastService) {

        broadcastService.downloadProgress$.subscribe(progressObject => {
            this.currentProgress = progressObject.done;
            this.total = progressObject.total;

        });
    }
}