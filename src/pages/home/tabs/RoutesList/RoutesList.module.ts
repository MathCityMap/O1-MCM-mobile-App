import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesListPage } from './RoutesList';
import { TranslateModule } from '@ngx-translate/core';
import { MCMHeaderModule } from '../../../../components/mcm-header/mcm-header.module';
import { RouteInfoModule } from '../../../RouteInfo/RouteInfo.module';


@NgModule({
  declarations: [
    RoutesListPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesListPage),
    TranslateModule.forChild(),
    MCMHeaderModule,
    RouteInfoModule
  ],
})
export class RoutesListPageModule {}
