import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteInfo } from './route-info';

@NgModule({
  declarations: [
    RouteInfo,
  ],
  imports: [
    IonicPageModule.forChild(RouteInfo),
  ],
})
export class RouteInfoPageModule {}
