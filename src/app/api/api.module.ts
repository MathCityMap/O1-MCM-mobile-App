import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { SessionChatService } from './services/session-chat.service';
import { SessionService } from './services/session.service';
import { SessionUserService } from './services/session-user.service';
import { TrailService } from './services/trail.service';

/**
 * Module that provides instances for all API services
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
   SessionChatService,
   SessionService,
   SessionUserService,
   TrailService
  ],
})
export class ApiModule { }
