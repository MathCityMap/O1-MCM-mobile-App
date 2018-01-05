import { Component,Input, Inject} from '@angular/core';
import { BroadcastService } from '../../services/broadcast-service';

@Component({
    selector: 'mcm-progress-bar-popup',
    templateUrl:'./mcm-progress-bar-popup.component.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMProgressBarPopupComponent{
    totalDownload = 0;
    doneDownload = 0;
    constructor(private broadcastService: BroadcastService) {

        broadcastService.downloadProgress$.subscribe(progressObject => {
            this.doneDownload = progressObject.done;
            this.totalDownload = progressObject.total;

        });
    }

}