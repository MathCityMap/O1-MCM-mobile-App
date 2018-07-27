import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesListPage } from './RoutesList';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../components/components.module';


@NgModule({
  declarations: [
    RoutesListPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesListPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class RoutesListPageModule {}
