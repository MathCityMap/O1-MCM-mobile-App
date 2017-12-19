import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MCMHeaderModule } from '../../../../components/mcm-header/mcm-header.module';
import { TasksMap } from './TasksMap';

@NgModule({
  declarations: [
    TasksMap,
  ],
  imports: [
    IonicPageModule.forChild(TasksMap),
    TranslateModule.forChild(),
    MCMHeaderModule
  ],
})
export class TasksMapPageModule {}
