import {ChildTaskApiResponse, TaskApiResponse} from "./TaskApiResponse";

export interface RouteDetailApiResponse {
    tasks: Array<TaskApiResponse>;
    supportTasks: Array<ChildTaskApiResponse>; // Contains children of tasks
    subTasks: Array<ChildTaskApiResponse>; // contains children of task groups
}
