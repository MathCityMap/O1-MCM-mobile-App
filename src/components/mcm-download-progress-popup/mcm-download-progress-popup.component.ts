import { Component,Input, Inject} from '@angular/core';
import { BroadcastService } from '../../services/broadcast-service';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'mcm-download-progress-popup',
    templateUrl:'./mcm-download-progress-popup.component.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMDownloadProgressPopupComponent{
    data = null;
    constructor(private viewCtrl: ViewController) {
        this.data = viewCtrl.data;
    }

    onCancelClick() {
        if (this.viewCtrl.data.cancelCallback) {
            this.viewCtrl.data.cancelCallback();
        }
    }
}