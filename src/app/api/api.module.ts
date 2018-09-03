import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { SessionService } from './services/session.service';
import { ChatService } from './services/chat.service';
import { SessionUserService } from './services/session-user.service';

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
   SessionService,
   ChatService,
   SessionUserService
  ],
})
export class ApiModule { }
