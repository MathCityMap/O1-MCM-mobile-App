import { ChangeDetectorRef, Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'mcm-download-progress-popup',
    templateUrl:'./mcm-download-progress-popup.component.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMDownloadProgressPopupComponent{
    data = null;
    constructor(private viewCtrl: ViewController, private changeDetectorRef: ChangeDetectorRef) {
        this.data = viewCtrl.data;
        this.data.updateView = () => {
            // make sure that angular detects changes
            changeDetectorRef.detectChanges();
        }
    }

    onCancelClick() {
        if (this.viewCtrl.data.cancelCallback) {
            this.viewCtrl.data.cancelCallback();
        }
    }
}