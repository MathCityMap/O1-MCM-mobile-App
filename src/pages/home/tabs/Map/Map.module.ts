import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './Map';
import { TranslateModule } from '@ngx-translate/core';
import { MCMHeaderModule } from '../../../../components/mcm-header/mcm-header.module';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    TranslateModule.forChild(),
    MCMHeaderModule
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
