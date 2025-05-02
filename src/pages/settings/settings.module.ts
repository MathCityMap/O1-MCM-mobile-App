import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { ComponentsModule } from '../../components/components.module';
import {DirectivesModule} from "../../directives/directives.module";

@NgModule({
  declarations: [
    SettingsPage,
  ],
    imports: [
        IonicPageModule.forChild(SettingsPage),
        ComponentsModule,
        DirectivesModule
    ],
})
export class SettingsPageModule {}
