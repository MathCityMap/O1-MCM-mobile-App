import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TaskGroupDetail } from './task-group-detail';
import { ComponentsModule } from '../../components/components.module';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import { SafariViewController } from '@ionic-native/safari-view-controller';
import {DirectivesModule} from "../../directives/directives.module";



@NgModule({
  declarations: [
    TaskGroupDetail,
  ],
    imports: [
        IonicPageModule.forChild(TaskGroupDetail),
        TranslateModule,
        ComponentsModule,
        DirectivesModule,
    ],
  providers: [PhotoViewer, SafariViewController]
})
export class TaskDetailPageModule {}
