import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AchievementsPage } from './achievements';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AchievementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AchievementsPage),
    ComponentsModule,
  ],
})
export class InfoPageModule {}
