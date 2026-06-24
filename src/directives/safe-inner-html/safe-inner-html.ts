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
      const temp = document.createElement('div');
      temp.innerHTML = this.test;
      const unsafeTags = temp.querySelectorAll('script, iframe, object, embed, [onclick], [onload], [onerror], [onmouseover], [onfocus], [onchange], [onsubmit], [onkeydown], [onkeyup], [onkeypress]');
      for (let i = 0; i < unsafeTags.length; i++) {
          unsafeTags[i].remove();
      }
      this.el.nativeElement.innerHTML = temp.innerHTML;
      const childLinks = this.el.nativeElement.querySelectorAll('a');
      for (let i = 0; i < childLinks.length; i++) {
          childLinks[i].addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              const href = e.currentTarget.getAttribute('href');
              if (href && href.match(/^https?:\/\//i)) {
                  this.iab.create(href, '_system');
              }
          });
      }
    }

}
