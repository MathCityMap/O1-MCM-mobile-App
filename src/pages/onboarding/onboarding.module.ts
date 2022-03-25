import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnboardingPage } from './onboarding';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    declarations: [
        OnboardingPage,
    ],
    imports: [
        IonicPageModule.forChild(OnboardingPage),
        ComponentsModule
    ],
})
export class OnboardingPageModule {
}
