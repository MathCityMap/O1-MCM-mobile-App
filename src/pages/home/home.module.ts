import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { MCMHeaderModule } from '../../components/mcm-header/mcm-header.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MCMHeaderModule
  ],
})
export class HomePageModule {}
