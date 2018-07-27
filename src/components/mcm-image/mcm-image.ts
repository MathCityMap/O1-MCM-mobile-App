import { Component } from '@angular/core';

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
export class McmImageComponent {

  text: string;

  constructor() {
    console.log('Hello McmImageComponent Component');
    this.text = 'Hello World';
  }

}
