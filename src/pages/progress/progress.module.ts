import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressPage } from './progress';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProgressPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressPage),
    ComponentsModule,
  ],
})
export class InfoPageModule {}
