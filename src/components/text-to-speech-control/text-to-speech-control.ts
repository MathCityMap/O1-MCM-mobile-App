import {Component, EventEmitter, HostBinding, Input} from '@angular/core';
import {ReadAloudService} from "../../services/read-aloud-service";

@Component({
  selector: 'text-to-speech-control',
  templateUrl: 'text-to-speech-control.html'
})
export class TextToSpeechControlComponent {
    @Input() activator: EventEmitter<void>

    @HostBinding('class.active')
    isActive = false;

  constructor(private readAloudService: ReadAloudService) {
  }

  ngOnInit() {
      this.activator.subscribe(() => {
          this.isActive = true;
      })
  }

  hide() {
      this.readAloudService.stopReading();
      this.isActive = false;
  }

  repeat() {
      this.readAloudService.repeatLastText();
  }

}
