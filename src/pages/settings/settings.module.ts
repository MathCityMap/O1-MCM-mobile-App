import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { MCMHeaderModule } from '../../components/mcm-header/mcm-header.module';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    MCMHeaderModule
  ],
})
export class SettingsPageModule {}
