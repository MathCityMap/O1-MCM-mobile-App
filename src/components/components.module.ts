import { NgModule } from '@angular/core';
import { McmImageComponent } from './mcm-image/mcm-image';
import { IonicModule } from 'ionic-angular';

import { MCMHeaderComponent } from './mcm-header/mcm-header.component';

import { TranslateModule } from '@ngx-translate/core';
import { DistancePipe } from '.././app/pipes/distance.pipe';
import { SearchPipe} from ".././app/pipes/search.pipe";
import { MCMProgressBarComponent } from './mcm-progress-bar/mcm-progress-bar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LazyLoadImagesDirective } from '../directives/ngx-lazy-load-images.directive';

import { RouteTeaserComponent } from "./route-teaser/route-teaser";
import {LocalizedDatePipe} from "../app/pipes/localDate.pipe";

const components = [
    MCMHeaderComponent,
    DistancePipe,
    SearchPipe,
    LocalizedDatePipe,
    MCMProgressBarComponent,
	McmImageComponent,
    LazyLoadImagesDirective
]

@NgModule({
	declarations: [components, RouteTeaserComponent],
	imports: [IonicModule,
        TranslateModule],
	exports: [components, TranslateModule, RouteTeaserComponent],
    providers: [PhotoViewer]
})
export class ComponentsModule {

}
