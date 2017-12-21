import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { TranslateModule } from '@ngx-translate/core';
import { MCMHeaderModule } from '../../components/mcm-header/mcm-header.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    MCMHeaderModule,
    TranslateModule
  ],
})
export class HomePageModule {}
