import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { MCMHeaderComponent } from './mcm-header.component';

import { TranslateModule } from '@ngx-translate/core';
import { DistancePipe } from '../../app/pipes/distance.pipe';
import { MCMProgressBarComponent } from '../mcm-progress-bar/mcm-progress-bar.component';

const headerComponents = [
  MCMHeaderComponent,
  DistancePipe,
  MCMProgressBarComponent
]

@NgModule({
  declarations: [
    headerComponents
  ],
  imports: [
    IonicModule,
    TranslateModule,
  ],
  exports: [
    headerComponents
  ]
})
export class MCMHeaderModule {
}