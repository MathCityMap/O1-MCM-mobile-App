/* tslint:disable */


export class SessionCreateRequest {
    name?: string;
    author_user_id?: string;
    starts_at?: string;
    ends_at?: string;
    trail_id?: string;
    welcome_message?: string;
    goodbye_message?: string;
    has_leaderboard?: boolean;
    assign_tasks?: boolean;
    assign_tasks_order?: string;
}
