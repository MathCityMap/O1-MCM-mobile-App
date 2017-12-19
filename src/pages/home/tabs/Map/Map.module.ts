import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './Map';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    TranslateModule.forChild()
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule {}
