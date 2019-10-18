import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesMapPage } from './RoutesMap';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    RoutesMapPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesMapPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
  exports: [
    RoutesMapPage
  ]
})
export class RoutesMapPageModule {}
