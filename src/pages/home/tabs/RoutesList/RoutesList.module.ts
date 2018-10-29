import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutesListPage } from './RoutesList';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../../components/components.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    RoutesListPage,
  ],
  imports: [
    IonicPageModule.forChild(RoutesListPage),
    TranslateModule.forChild(),
    ComponentsModule,
    LazyLoadImageModule
  ],
})
export class RoutesListPageModule {}
