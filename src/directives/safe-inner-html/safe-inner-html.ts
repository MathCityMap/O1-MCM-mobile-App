import {Directive, ElementRef, Input} from '@angular/core';
import {InAppBrowser} from "@ionic-native/in-app-browser";

/**
 * Generated class for the SafeInnerHtmlDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[linkedInnerHtml]' // Attribute selector
})
export class SafeInnerHtmlDirective {

    @Input('linkedInnerHtml') test : string;

  constructor(private el: ElementRef, private iab: InAppBrowser) {
  }

    ngOnInit() {
      this.el.nativeElement.innerHTML = this.test;
      let childLinks = this.el.nativeElement.querySelector('a')
      if (childLinks) {
          childLinks.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              let link = e.srcElement.href;

              this.iab.create(link, '_system');
              console.log('EventListenerClick', e.srcElement);
          })
      }
    }

}
