/* tslint:disable */


export class SessionUpdateRequest {
    name?: string;
    starts_at?: string;
    ends_at?: string;
    welcome_message?: string;
    goodbye_message?: string;
    has_leaderboard?: boolean;
    assign_tasks?: boolean;
    assign_tasks_order?: string;
}
