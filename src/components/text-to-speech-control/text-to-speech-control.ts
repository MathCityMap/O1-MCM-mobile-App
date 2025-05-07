import {Component, HostBinding} from '@angular/core';
import {ReadAloudService} from "../../services/read-aloud-service";

@Component({
  selector: 'text-to-speech-control',
  templateUrl: 'text-to-speech-control.html'
})
export class TextToSpeechControlComponent {
    @HostBinding('class.active')
    isActive = false;

  constructor(private readAloudService: ReadAloudService) {
  }

  ngOnInit() {
      this.readAloudService.interfaceTriggerEvent.subscribe(() => {
          this.isActive = true;
      });
      this.readAloudService.hideInterfaceEvent.subscribe(() => {
          this.isActive = false;
      });
  }

  hide() {
      this.readAloudService.resetHighlighting();
      this.readAloudService.stopReading();
      this.readAloudService.hideInterfaceEvent.emit();
  }

  repeat() {
      this.readAloudService.repeatLastText();
  }

}
