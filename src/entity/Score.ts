import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Route } from "./Route";
import { TaskState } from "./TaskState";

@Entity ('mcm_score')
export class Score {
    @PrimaryGeneratedColumn({name: '_id'})
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @ManyToOne(type => Route, route => route.scores)
    @JoinColumn({name: 'route_id', referencedColumnName: 'id'})
    route: Route;

    @Column()
    score: number;

    @Column({name: 'tasks_solved'})
    private tasksSolved: string = '[]';

    @Column({name: 'tasks_solved_low'})
    private tasksSolvedLow: string = '[]';

    @Column({name: 'tasks_failed'})
    private tasksFailed: string = '[]';

    @Column({name: 'tasks_saved'})
    private tasksSaved: string = '[]';

    @Column({name: 'task_details'})
    private taskDetails: string = '[]';

    @Column()
    time: number;

    @Column()
    distance: number;




    setTasksSolved(taskIds: Array<number>){
        this.tasksSolved = JSON.stringify(taskIds);
    }

    addSolvedTask(taskId: number){
        let idList = this.getTasksSolved();
        if(idList.indexOf(taskId) == -1){
            idList.push(taskId);
        }
        this.setTasksSolved(idList);
    }

    getTasksSolved() : Array<number>{
        let ids: Array<number> = [];
        let jsonIds = JSON.parse(this.tasksSolved);
        jsonIds.forEach(id => {
            ids.push(+id);
        });
        return ids;
    }

    setTasksFailed(taskIds: Array<number>){
        this.tasksFailed = JSON.stringify(taskIds);
    }

    addFailedTask(taskId: number){
        let idList = this.getTasksFailed();
        if(idList.indexOf(taskId) == -1){
            idList.push(taskId);
        }
        this.setTasksFailed(idList);
    }

    getTasksFailed() : Array<number>{
        let ids: Array<number> = [];
        let jsonIds = JSON.parse(this.tasksFailed);
        jsonIds.forEach(id => {
            ids.push(+id);
        });
        return ids;
    }

    setTasksSolvedLow(taskIds: Array<number>){
        this.tasksSolvedLow = JSON.stringify(taskIds);
    }

    addSolvedTaskLow(taskId: number){
        let idList = this.getTasksSolvedLow();
        if(idList.indexOf(taskId) == -1){
            idList.push(taskId);
        }
        this.setTasksSolvedLow(idList);
    }

    getTasksSolvedLow() : Array<number>{
        let ids: Array<number> = [];
        let jsonIds = JSON.parse(this.tasksSolvedLow);
        jsonIds.forEach(id => {
            ids.push(+id);
        });
        return ids;
    }

    setTasksSaved(taskIds: Array<number>){
        this.tasksSaved = JSON.stringify(taskIds);
    }

    addSavedTask(taskId: number){
        let idList = this.getTasksSaved();
        if(idList.indexOf(taskId) == -1){
            idList.push(taskId);
        }
        this.setTasksSaved(idList);
    }

    getTasksSaved() : Array<number>{
        let ids: Array<number> = [];
        let jsonIds = JSON.parse(this.tasksSaved);
        jsonIds.forEach(id => {
            ids.push(+id);
        });
        return ids;
    }

    getTaskState(): Array<TaskState> {
        let taskDetails : TaskState = new TaskState();
        return taskDetails.getAllTaskState(this.taskDetails);
    }

    getTaskStateForTask(taskId: number): TaskState {
        let taskDetails : TaskState = new TaskState();
        return taskDetails.findDetailsForTask(taskId, this.taskDetails);
    }

    addTaskStateForTask(allTaskStates: Array<TaskState>, detailsToSave: TaskState) : Array<TaskState>{
        for(let i = 0; i < allTaskStates.length; i++){
            let details = allTaskStates[i];
            if(detailsToSave.taskId == details.taskId){
                //already in array -> replace
                allTaskStates[i] = detailsToSave;
                this.setTaskState(allTaskStates);
                return allTaskStates;
            }
        }
        allTaskStates.push(detailsToSave);
        this.setTaskState(allTaskStates);
        return allTaskStates;
    }

    setTaskState(taskDetails: Array<TaskState>){
        this.taskDetails = TaskState.getTaskStateAsJSONArray(taskDetails);
    }

}
