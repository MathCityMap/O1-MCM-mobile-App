import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteInfoComponent } from './route-info.component';

@NgModule({
  declarations: [
    RouteInfoComponent,
  ],
  imports: [
    IonicPageModule.forChild(RouteInfoComponent),
  ],
  exports: [
    RouteInfoComponent
  ]
})
export class RouteInfoPageModule {}
