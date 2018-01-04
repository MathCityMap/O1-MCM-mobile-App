import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MCMProgressBarPopupComponent } from './mcm-progress-bar-popup.component';

@NgModule({
  declarations: [

      MCMProgressBarPopupComponent
  ],
  imports: [
/*     IonicModule.forRoot(MCMProgressBarComponent) */
  ],
  exports: [
    MCMProgressBarPopupComponent
  ]
})
export class MCMProgressBarPopupModule {}