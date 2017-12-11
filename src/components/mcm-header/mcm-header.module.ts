import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { MCMHeaderComponent } from './mcm-header.component';

const headerComponents = [
  MCMHeaderComponent
]

@NgModule({
  declarations: [
    headerComponents
  ],
  imports: [
    IonicModule
  ],
  exports: [
    headerComponents
  ]
})
export class MCMHeaderModule {}