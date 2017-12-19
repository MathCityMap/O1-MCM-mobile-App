import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteInfo } from './RouteInfo';
import { MCMHeaderModule } from '../../components/mcm-header/mcm-header.module';
@NgModule({
  declarations: [
    RouteInfo,
  ],
  imports: [
    IonicPageModule.forChild(RouteInfo),
    MCMHeaderModule,
  ],
  exports: [
    RouteInfo
  ]
})
export class RouteInfoModule {}
