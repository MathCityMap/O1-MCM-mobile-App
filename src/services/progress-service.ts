import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";

const PROGRESS_KEY = "MCM_PROGRESS"
const PROGRESS_MILESTONES: ProgressMilestones = {
    distance: [
        {icon: "", threshold: 10},
        {icon: "", threshold: 25},
        {icon: "", threshold: 50}
    ],
    points: [
        {icon: "", threshold: 10000},
        {icon: "", threshold: 25000},
        {icon: "", threshold: 50000}
    ],
    tasks: [
        {icon: "", threshold: 100},
        {icon: "", threshold: 250},
        {icon: "", threshold: 500}
    ]}

@Injectable()
export class ProgressService {
    private progress: Progress;
    constructor(
        private storage: Storage
    ) {
        this.init();
    }

    async init() {
        let storedProgress: Progress = await this.storage.get(PROGRESS_KEY);
        if (!storedProgress) {
            storedProgress = {distance: 0, points: 0, tasks: 0};
            await this.storage.set(PROGRESS_KEY, storedProgress);
        }
        this.progress = storedProgress;
    }

    async increaseProgressCounter(counter: ProgressCounter, amount: number) {
        this.progress[counter] += amount;
        await this.storage.set(PROGRESS_KEY, this.progress);
    }

}

type ProgressMilestones = {
    [key in ProgressCounter]: Array<ProgressMilestone>
}

export type ProgressMilestone = {
    icon: string,
    threshold: number
}

export type Progress = {
    [key in ProgressCounter]: number;
}

export enum ProgressCounter {
    DISTANCE = "distance",
    POINTS = "points",
    TASKS = "tasks"
}
