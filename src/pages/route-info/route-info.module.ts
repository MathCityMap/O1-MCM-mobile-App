import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteInfoPage } from './route-info';

@NgModule({
  declarations: [
    RouteInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RouteInfoPage),
  ],
})
export class RouteInfoPageModule {}
