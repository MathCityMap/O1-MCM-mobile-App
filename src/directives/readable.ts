import {Directive, HostListener, ElementRef, Input} from "@angular/core";
import Timeout = NodeJS.Timeout;
import {ReadAloudService} from "../services/read-aloud-service";

const TOUCH_HOLD_DURATION_IN_MS = 500;

@Directive({
    selector: "[readable]" // Attribute selector
})
export class ReadAloudDirective {

    private slideDetectionOffset: number = 100;
    @Input('language') language?: string;

    touchTimeout: Timeout;
    startPosition: {x: number, y: number};

    @HostListener("touchstart", ["$event"])
    onTouchStart(_event: TouchEvent): void {
        let viewportOffset = this.element.nativeElement.getBoundingClientRect();
        this.startPosition = {x: viewportOffset.left, y: viewportOffset.top};
        console.log('Translatable touchstart');
        this.touchTimeout = setTimeout(() => {
            let viewportOffset = this.element.nativeElement.getBoundingClientRect();
            if (this.isInsideSlideThreshhold(this.startPosition, {x: viewportOffset.left, y: viewportOffset.top})) {
                this.readAloudService.resetHighlighting();
                this.element.nativeElement.classList.add('active');
                this.readAloudService.readText(this.element.nativeElement.innerText, this.language);
            } else {
                console.debug('didScroll');
            }
            this.touchTimeout = null;
        }, TOUCH_HOLD_DURATION_IN_MS);
    }

    @HostListener("touchend", ["$event"])
    onTouchEnd(): void {
        console.log('Translatable touchend');
        if (this.touchTimeout) {
            clearTimeout(this.touchTimeout);
            this.touchTimeout = null;
        }
    }
    constructor(public element: ElementRef, private readAloudService: ReadAloudService) {
    }
    ngOnInit(): void {
    }

    isInsideSlideThreshhold(initialPosition: {x: number, y: number}, finalPosition: {x: number, y: number}) {
        let top, bottom, left, right;
        top = initialPosition.y - this.slideDetectionOffset;
        bottom = initialPosition.y + this.slideDetectionOffset;
        left = initialPosition.x - this.slideDetectionOffset;
        right = initialPosition.x + this.slideDetectionOffset;
        return finalPosition.y > top && finalPosition.y < bottom && finalPosition.x > left && finalPosition.x < right;
    }

}
