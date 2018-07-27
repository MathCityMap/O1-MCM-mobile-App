import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TaskDetail } from './task-detail';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [
    TaskDetail,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetail),
    TranslateModule,
    ComponentsModule,
  ],
})
export class TaskDetailPageModule {}
