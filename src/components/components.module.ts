import { NgModule } from '@angular/core';
import { McmImageComponent } from './mcm-image/mcm-image';
import { IonicModule } from 'ionic-angular';

import { MCMHeaderComponent } from './mcm-header/mcm-header.component';

import { TranslateModule } from '@ngx-translate/core';
import { DistancePipe } from '.././app/pipes/distance.pipe';
import { SearchPipe} from ".././app/pipes/search.pipe";
import { MCMProgressBarComponent } from './mcm-progress-bar/mcm-progress-bar.component';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LazyLoadImagesDirective } from '../directives/ngx-lazy-load-images.directive';

const components = [
    MCMHeaderComponent,
    DistancePipe,
    SearchPipe,
    MCMProgressBarComponent,
	McmImageComponent,
    LazyLoadImagesDirective
]

@NgModule({
	declarations: components,
	imports: [IonicModule,
        TranslateModule],
	exports: [components, TranslateModule],
    providers: [PhotoViewer]
})
export class ComponentsModule {

}
