import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RouteInfoComponent } from './route-info.component';
import { MCMHeaderModule } from '../../components/mcm-header/mcm-header.module';
@NgModule({
  declarations: [
    RouteInfoComponent,
  ],
  imports: [
    IonicPageModule.forChild(RouteInfoComponent),
    MCMHeaderModule,
  ],
  exports: [
    RouteInfoComponent
  ]
})
export class RouteInfoPageModule {}
