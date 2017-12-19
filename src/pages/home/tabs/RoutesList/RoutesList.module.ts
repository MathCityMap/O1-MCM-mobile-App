import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesListPage } from './RoutesList';
import { TranslateModule } from '@ngx-translate/core';
import { MCMHeaderModule } from '../../../../components/mcm-header/mcm-header.module';


@NgModule({
  declarations: [
    RoutesListPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesListPage),
    TranslateModule.forChild(),
    MCMHeaderModule
  ],
})
export class RoutesListPageModule {}
