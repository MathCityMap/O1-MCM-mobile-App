import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ImagesService } from '../../services/images-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Helper } from '../../classes/Helper';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

/**
 * Generated class for the McmImageComponent component.
 *
 * This component shall encapsulate all functionality regarding images, e.g. downloading, resizing
 * or viewing in fullscreen.
 */
@Component({
    selector: 'mcm-image',
    templateUrl: 'mcm-image.html'
})
export class McmImageComponent implements OnChanges {

    @Input()
    src: string;

    @Input()
    offline: boolean = true;

    @Input()
    fullWidth: boolean = false;

    @Input()
    photoViewer: boolean = false;

    @Output()
    click: EventEmitter<any> = new EventEmitter();

    private imageUrl: string;

    constructor(private imagesService: ImagesService, private photoViewerPlugin: PhotoViewer,
                private spinnerDialog: SpinnerDialog) {
    }

    ngOnChanges() {
        this.imageUrl = this.offline ? this.imagesService.getOfflineURL(this.src)
            : this.imagesService.getOnlineURL(this.src);
    }

    onClick($event) {
        this.click.next($event);
        if (this.photoViewer && Helper.isPluginAvailable(PhotoViewer)) {
            this.spinnerDialog.show();
            setTimeout(() => {
                // use short timeout to let spinner dialog appear
                this.photoViewerPlugin.show(this.imageUrl);
                setTimeout(() => {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    this.spinnerDialog.hide();
                }, 1000);
            }, 100)
        }
    }
}
