import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { MCMHeaderComponent } from './mcm-header.component';

import { TranslateModule } from '@ngx-translate/core';
import { DistancePipe } from '../../app/pipes/distance.pipe';

const headerComponents = [
  MCMHeaderComponent,
  DistancePipe
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