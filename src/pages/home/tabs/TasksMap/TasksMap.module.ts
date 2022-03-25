import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TasksMap } from './TasksMap';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    TasksMap,
  ],
  imports: [
    IonicPageModule.forChild(TasksMap),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class TasksMapPageModule {}
