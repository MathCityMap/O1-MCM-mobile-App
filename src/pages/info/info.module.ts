import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPage } from './info';
import { MCMHeaderModule } from '../../components/mcm-header/mcm-header.module';

@NgModule({
  declarations: [
    InfoPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPage),
    MCMHeaderModule,
  ],
})
export class InfoPageModule {}
