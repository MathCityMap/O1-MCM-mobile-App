import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    declarations: [
        ChatPage,
    ],
    imports: [
        IonicPageModule.forChild(ChatPage),
        TranslateModule,
        ComponentsModule
    ],
    entryComponents: [
        ChatPage
    ]
})
export class ChatPageModule {
}
