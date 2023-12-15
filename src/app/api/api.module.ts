import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ApiConfiguration} from './api-configuration';

import {SessionChatService} from './services/session-chat.service';
import {SessionService} from './services/session.service';
import {SessionEventService} from './services/session-event.service';
import {SessionUserService} from './services/session-user.service';
import {SessionUserLeaderboardService} from './services/session-user-leaderboard.service';
import {TrailService} from './services/trail.service';
import {ProblemReportService} from "./services/problem-report.service";

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
        SessionEventService,
        SessionUserService,
        SessionUserLeaderboardService,
        TrailService,
        ProblemReportService
    ],
})
export class ApiModule {
}
