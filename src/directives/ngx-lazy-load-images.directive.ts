import {
    Directive, ElementRef, Renderer2, Input, NgZone, Inject, PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ImagesService } from '../services/images-service';

/**
 * Angular Lazy Loading Images Directive
 *
 * The library allows to lazy load images from your web application
 * using the MutationObserver and the IntersectionObserver. Images will be loaded as
 * soon as they enter the viewport in a non-blocking way.
 */
@Directive({
    selector: '[lazy-load-images]'
})
export class LazyLoadImagesDirective {

    @Input('lazy-load-images') intersectionObserverConfig: Object;
    @Input('image-size') imageSize: string;

    intersectionObserver: IntersectionObserver;
    rootElement: HTMLElement;

    constructor(
        element: ElementRef,
        public renderer: Renderer2,
        public ngZone: NgZone,
        @Inject(PLATFORM_ID) private platformId: any,
        private imagesService: ImagesService) {
        this.rootElement = element.nativeElement;
    }

    init() {
        this.registerIntersectionObserver();

        this.observeDOMChanges(this.rootElement, () => {
            const imagesFoundInDOM = this.getAllImagesToLazyLoad(this.rootElement);
            imagesFoundInDOM.forEach((image: HTMLElement) => this.intersectionObserver.observe(image));
        });
    }

    ngOnInit() {
        if (!this.isBrowser()) {
            return;
        }

        this.ngZone.runOutsideAngular(() => this.init());
    }

    ngOnDestroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }

    isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    registerIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver(
            images => images.forEach(image => this.onIntersectionChange(image)),
            this.intersectionObserverConfig instanceof Object ? this.intersectionObserverConfig : undefined
        );

        return this.intersectionObserver;
    }

    observeDOMChanges(rootElement: HTMLElement, onChange: Function) {
        // Create a Mutation Observer instance
        const observer = new MutationObserver(mutations => onChange(mutations));

        // Observer Configuration
        const observerConfig = {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true
        };

        // Observe Directive DOM Node
        observer.observe(rootElement, observerConfig);

        // Fire onChange callback to check current DOM nodes
        onChange();

        return observer;
    }

    getAllImagesToLazyLoad(pageNode: HTMLElement) {
        return Array.from(pageNode.querySelectorAll('img[data-src], [data-srcset], [data-background-src], img[data-async-src], [data-async-background-src]'));
    }

    onIntersectionChange(image: any) {
        if (!image.isIntersecting) {
            return;
        }

        this.onImageAppearsInViewport(image.target);
    }

    onImageAppearsInViewport(image: any) {
        if (image.dataset.asyncSrc) {
            this.imagesService.getAsyncImageURL(image.dataset.asyncSrc, this.imageSize).then((asyncSrc) => {
                this.renderer.setAttribute(image, 'src', asyncSrc);
            });
            this.renderer.removeAttribute(image, 'data-async-src');
        }
        if (image.dataset.src) {
            this.renderer.setAttribute(image, 'src', image.dataset.src);
            this.renderer.removeAttribute(image, 'data-src');
        }

        if (image.dataset.srcset) {
            this.renderer.setAttribute(image, 'srcset', image.dataset.srcset);
            this.renderer.removeAttribute(image, 'data-srcset');
        }

        if (image.dataset.asyncBackgroundSrc) {
            this.imagesService.getAsyncImageURL(image.dataset.asyncBackgroundSrc, this.imageSize).then((asyncSrc) => {
                this.renderer.setStyle(image, 'background-image', `url(${asyncSrc})`);
            });
            this.renderer.removeAttribute(image, 'data-async-background-src');
        }
        if (image.dataset.backgroundSrc) {
            this.renderer.setStyle(image, 'background-image', `url(${image.dataset.backgroundSrc})`);
            this.renderer.removeAttribute(image, 'data-background-src');
        }

        // Stop observing the current target
        if (this.intersectionObserver) {
            this.intersectionObserver.unobserve(image);
        }
    }
}
