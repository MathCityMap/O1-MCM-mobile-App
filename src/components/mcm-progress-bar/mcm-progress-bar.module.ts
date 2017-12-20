import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MCMProgressBarComponent } from './mcm-progress-bar.component';

@NgModule({
  declarations: [
      MCMProgressBarComponent
  ],
  imports: [
/*     IonicModule.forRoot(MCMProgressBarComponent) */
  ],
  exports: [
    MCMProgressBarComponent
  ]
})
export class MCMProgressBarModule {}
