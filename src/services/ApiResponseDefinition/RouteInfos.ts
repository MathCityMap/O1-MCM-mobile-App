import { Task } from "../../entity/Task"
import {Score} from "../../entity/Score";

export interface RouteInfos {
    tasks: Array<Task>;
    score: Score;
}
