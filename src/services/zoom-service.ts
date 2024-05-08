import { Injectable } from "@angular/core";

declare var Hammer;

@Injectable()
export class ZoomService {
    appFrameElement: HTMLElement;
    lastScale = 1;
    newScale = 1;
    hammerManager: any;

    constructor() {
    }

    init() {
        this.appFrameElement = document.getElementById("app-frame");
        this.hammerManager = new Hammer.Manager(this.appFrameElement, {
            recognizers: [
                [Hammer.Pinch]
            ]
        });
        let minZoom = 1
        let maxZoom = 2;
        this.hammerManager.on("pinch", (event) => {
            this.newScale = event.scale * this.lastScale;
            if (this.newScale < minZoom) {
                this.newScale = minZoom;
            }
            if (this.newScale > maxZoom) {
                this.newScale = maxZoom;
            }
            let transform = `scale(${this.newScale})`;
            this.appFrameElement.style.transform = transform;
            this.appFrameElement.style.webkitTransform = transform;
            this.fixIosDisplayAfterZoom();
        });

        this.hammerManager.on("pinchend pinchcancel", (event) => {
            this.lastScale = this.newScale;
        })
    }

    resetZoom() {
        let transform = `scale(1)`;
        this.appFrameElement.style.transform = transform;
        this.appFrameElement.style.webkitTransform = transform;
        this.fixIosDisplayAfterZoom();
        this.lastScale = 1;
    }

    disableZooming() {
        this.resetZoom();
        this.hammerManager.get("pinch").set({enable: false});
    }

    enableZooming() {
        this.hammerManager.get("pinch").set({enable: true});
    }

    fixIosDisplayAfterZoom() {
        // We reset the overflow of the container surrounding the zoomed frame so that iOS webview understands that he needs to calculate the scroll area again
        this.appFrameElement.parentElement.style.overflow = "hidden";
        setTimeout(() => {this.appFrameElement.parentElement.style.overflow = "scroll"});
    }
}
