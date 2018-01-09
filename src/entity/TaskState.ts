
export class TaskState{

    constructor(){

    }

    taskId: number;
    solved: boolean = false;
    solvedLow: boolean = false;
    hint1: boolean = false;
    hint2: boolean = false;
    hint3: boolean = false;
    tries: number = 0;
    answer: string = "";
    timeFirstOpen: number = 0;
    timeSolved: number = 0;
    score: number = 0;
    penalty: number = 0;

    public getTaskDetailAsJSON() : string{
        return JSON.stringify({
            taskId: +this.taskId, //use '+' to parse to number
            solved: this.solved,
            solvedLow: this.solvedLow,
            hint1: this.hint1,
            hint2: this.hint2,
            hint3: this.hint3,
            tries: +this.tries, //use '+' to parse to number
            answer: this.answer,
            timeFirstOpen: +this.timeFirstOpen, //use '+' to parse to number
            timeSolved: +this.timeSolved, //use '+' to parse to number
            score: +this.score, //use '+' to parse to number
            penalty: this.penalty
        });
    }

    public static getTaskStateAsJSONArray(taskDetails: Array<TaskState>) : string{
        let result: Array<any> = [];
        taskDetails.forEach(details => {
            result.push(details.getTaskDetailAsJSON());
        })
        return JSON.stringify(result);
    }

    public getAllTaskState(jsonArray: string) : Array<TaskState>{
        let flags = JSON.parse(jsonArray);
        let taskDetails: Array<TaskState> = [];
        for(let i = 0; i < flags.length; i++){
            taskDetails.push(this.getTaskStateByTask(flags[i]));
        }
        return taskDetails;
    }

    public findDetailsForTask(taskId: number, jsonArray: string) : TaskState{
        let flags = JSON.parse(jsonArray);

        for(let i = 0; i < flags.length; i++){
            let detail = this.getTaskStateByTask(flags[i]);
            if(detail.taskId == taskId){
                return detail;
            }
        }
        let detail = new TaskState();
        detail.taskId = taskId;
        return detail;
    }





    public getTaskStateByTask(jsonObject: string) : TaskState{
        let flags = JSON.parse(jsonObject);
        this.taskId = flags.taskId;
        this.solved = flags.solved;
        this.solvedLow = flags.solvedLow;
        this.hint1 = flags.hint1;
        this.hint2 = flags.hint2;
        this.hint3 = flags.hint3;
        this.tries = flags.tries;
        this.answer = flags.answer;
        this.timeFirstOpen = flags.timeFirstOpen;
        this.timeSolved = flags.timeSolved;
        this.score = flags.score;
        this.penalty = flags.penalty;
        return this;
    }
}