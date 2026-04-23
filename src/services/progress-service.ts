import {Injectable} from "@angular/core";
import {Storage} from "@ionic/storage";

const PROGRESS_KEY = "MCM_PROGRESS"
export const PROGRESS_MILESTONES: ProgressMilestones = {
    distance: [
        {icon: "./assets/icons/achievement-distance.svg", threshold: 3},
        {icon: "./assets/icons/achievement-distance.svg", threshold: 15},
        {icon: "./assets/icons/achievement-distance.svg", threshold: 40}
    ],
    points: [
        {icon: "./assets/icons/achievement-points.svg", threshold: 2000},
        {icon: "./assets/icons/achievement-points.svg", threshold: 10000},
        {icon: "./assets/icons/achievement-points.svg", threshold: 25000}
    ],
    tasks: [
        {icon: "./assets/icons/achievement-tasks.svg", threshold: 20},
        {icon: "./assets/icons/achievement-tasks.svg", threshold: 100},
        {icon: "./assets/icons/achievement-tasks.svg", threshold: 250}
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

    getCurrentProgressForCounter(counter: ProgressCounter) {
        return this.progress[counter];
    }

    getActiveMilestoneIndexForCounter(counter: ProgressCounter) {
        let milestones = PROGRESS_MILESTONES[counter];
        let currentMilestone = milestones.findIndex(milestone => {
            return milestone.threshold > this.getCurrentProgressForCounter(counter);
        });
        return currentMilestone > -1 ? currentMilestone : milestones.length -1
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
