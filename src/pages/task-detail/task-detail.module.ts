import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TaskDetail } from './task-detail';
import { ComponentsModule } from '../../components/components.module';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import { SafariViewController } from '@ionic-native/safari-view-controller';



@NgModule({
  declarations: [
    TaskDetail,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetail),
    TranslateModule,
    ComponentsModule,
  ],
  providers: [PhotoViewer, SafariViewController]
})
export class TaskDetailPageModule {}
