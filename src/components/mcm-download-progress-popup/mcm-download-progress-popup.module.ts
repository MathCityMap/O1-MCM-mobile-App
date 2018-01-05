import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MCMDownloadProgressPopupComponent } from './mcm-download-progress-popup.component';

@NgModule({
  declarations: [

      MCMDownloadProgressPopupComponent
  ],
  imports: [
/*     IonicModule.forRoot(MCMProgressBarComponent) */
  ],
  exports: [
    MCMDownloadProgressPopupComponent
  ]
})
export class MCMDownloadProgressPopupModule {}