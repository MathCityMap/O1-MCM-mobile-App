/* tslint:disable */


import {SessionUserResponse} from "./session-user-response";

export class SessionUser {
    created_at?: string;
    id?: any;
    team_name?: string;
    team_members_array?: Array<string>;
    token?: string;
    deleted?: boolean;
    last_active_at?: string;
    wp_user_id?: number;
    updated_at?: string;
    score?: number;
    assigned_task_id?: number;
    lat?: number;
    lon?: number;
    unread_messages?: number;

    static fromResponse(response: SessionUserResponse) {
        let user = new SessionUser();
        user = Object.assign(user, response);
        user.score = +response.score
        user.wp_user_id = +response.wp_user_id;
        user.assigned_task_id = +response.assigned_task_id;
        user.lat = +response.lat;
        user.lon = +response.lon;
        user.unread_messages = +response.unread_messages;
        return user;
    }
}
