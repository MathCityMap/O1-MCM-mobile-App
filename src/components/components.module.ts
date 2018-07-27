import { NgModule } from '@angular/core';
import { McmImageComponent } from './mcm-image/mcm-image';
import { IonicModule } from 'ionic-angular';

import { MCMHeaderComponent } from './mcm-header/mcm-header.component';

import { TranslateModule } from '@ngx-translate/core';
import { DistancePipe } from '.././app/pipes/distance.pipe';
import { MCMProgressBarComponent } from './mcm-progress-bar/mcm-progress-bar.component';

const components = [
    MCMHeaderComponent,
    DistancePipe,
    MCMProgressBarComponent,
	McmImageComponent
]

@NgModule({
	declarations: components,
	imports: [IonicModule,
        TranslateModule],
	exports: [components, TranslateModule]
})
export class ComponentsModule {

}
