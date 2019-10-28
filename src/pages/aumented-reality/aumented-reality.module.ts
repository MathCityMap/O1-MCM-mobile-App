import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AumentedRealityPage } from './aumented-reality';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AumentedRealityPage,
  ],
  imports: [
    IonicPageModule.forChild(AumentedRealityPage),
  ],
})
export class AumentedRealityPageModule {}


