import {Component, HostBinding, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ReadAloudService} from "../../services/read-aloud-service";

@Component({
  selector: 'text-to-speech-control',
  templateUrl: 'text-to-speech-control.html'
})
export class TextToSpeechControlComponent implements OnDestroy {
    @HostBinding('class.active')
    isActive = false;
    private interfaceTriggerSubscription: Subscription;
    private hideInterfaceSubscription: Subscription;

  constructor(private readAloudService: ReadAloudService) {
  }

  ngOnInit() {
      this.interfaceTriggerSubscription = this.readAloudService.interfaceTriggerEvent.subscribe(() => {
          this.isActive = true;
      });
      this.hideInterfaceSubscription = this.readAloudService.hideInterfaceEvent.subscribe(() => {
          this.isActive = false;
      });
  }

  ngOnDestroy() {
      if (this.interfaceTriggerSubscription) {
          this.interfaceTriggerSubscription.unsubscribe();
          this.interfaceTriggerSubscription = null;
      }
      if (this.hideInterfaceSubscription) {
          this.hideInterfaceSubscription.unsubscribe();
          this.hideInterfaceSubscription = null;
      }
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
