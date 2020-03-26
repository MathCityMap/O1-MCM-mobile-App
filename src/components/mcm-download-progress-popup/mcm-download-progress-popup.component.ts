import { ChangeDetectorRef, Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'mcm-download-progress-popup',
    templateUrl:'./mcm-download-progress-popup.component.html',
})
export class MCMDownloadProgressPopupComponent{
    data = null;
    private progress = 0;
    constructor(private viewCtrl: ViewController, private changeDetectorRef: ChangeDetectorRef) {
        this.data = viewCtrl.data;
        this.data.updateView = () => {
            // make sure that angular detects changes
            changeDetectorRef.detectChanges();
            this.progress = this.data.currentProgress == 0 ? 0 :
                Math.round((100/this.data.total) * this.data.currentProgress);
        }
    }

    onCancelClick() {
        if (this.viewCtrl.data.cancelCallback) {
            this.viewCtrl.data.cancelCallback();
        }
    }
}

