
export class TaskDetails{

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
            taskId: this.taskId,
            solved: this.solved,
            solvedLow: this.solvedLow,
            hint1: this.hint1,
            hint2: this.hint2,
            hint3: this.hint3,
            tries: this.tries,
            answer: this.answer,
            timeFirstOpen: this.timeFirstOpen,
            timeSolved: this.timeSolved,
            score: this.score,
            penalty: this.penalty
        });
    }

    public static getTaskDetailsAsJSONArray(taskDetails: Array<TaskDetails>) : string{
        let result: Array<any> = [];
        taskDetails.forEach(details => {
            result.push(details.getTaskDetailAsJSON());
        })
        return JSON.stringify(result);
    }

    public getAllTaskDetails(jsonArray: string) : Array<TaskDetails>{
        let flags = JSON.parse(jsonArray);
        let taskDetails: Array<TaskDetails> = [];
        for(let i = 0; i < flags.length; i++){
            taskDetails.push(this.getTaskDetailsByTask[i])
        }
        return taskDetails;
    }

    public findDetailsForTask(taskId: number, jsonArray: string) : TaskDetails{
        let flags = JSON.parse(jsonArray);

        for(let i = 0; i < flags.length; i++){
            if(flags[i].taskId == taskId){
                return this.getTaskDetailsByTask(flags[i]);
            }
        }
        let detail = new TaskDetails();
        detail.taskId = taskId;
        return detail;
    }





    public getTaskDetailsByTask(jsonObject: string) : TaskDetails{
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