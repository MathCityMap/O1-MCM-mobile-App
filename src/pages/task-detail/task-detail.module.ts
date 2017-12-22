import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MCMHeaderModule } from '../../components/mcm-header/mcm-header.module';
import { TaskDetail } from './task-detail';



@NgModule({
  declarations: [
    TaskDetail,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetail),
    TranslateModule,
    MCMHeaderModule,
  ],
})
export class TaskDetailPageModule {}
