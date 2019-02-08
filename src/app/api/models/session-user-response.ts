/* tslint:disable */
import { SessionEventResponse } from './session-event-response';


export class SessionUserResponse {
    last_active_at?: string;
    id?: string;
    team_name?: string;
    team_members_array?: Array<string>;
    token?: string;
    deleted?: boolean;
    wp_user_id?: string;
    lat?: string;
    lon?: string;
    score?: string;
    unread_messages?: string;
    assigned_task_id?: string;
    events?: Array<SessionEventResponse>;
}
