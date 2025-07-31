import {s3MediaResponse} from "./s3MediaResponse";
import {TaskFormat} from "./TaskFormat";

export interface TaskApiResponse {
    _id: number;
    code: string;
    user_id: number;
    task_format: TaskFormat;
    public: string;
    lat: string;
    lon: string;
    title: string;
    description: string;
    image: string;
    solution_type: string;
    solution: string;
    hint1: string;
    hint2: string;
    hint3: string;
    assistive_equipment: string;
    author: string;
    mail: string;
    grade: string;
    tags: string;
    timestamp: string;
    solutionsample: string;
    attr: string;
    allow_copy: number;
    create_Date: string;
    lang_code: string;
    isDraft: number;
    wizard_id: number;
    copy_of_id: number;
    visible: number;
    ar_link: string;
    potential_problem: number;
    inactive: number;
    s3_media: s3MediaResponse;
    force_support_tasks: number;
}

export interface ChildTaskApiResponse extends TaskApiResponse {
    parent_task_id: number;
    position_in_parent: number;
}
