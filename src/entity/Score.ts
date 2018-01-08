import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Route } from "./Route";
import { TaskDetails } from "./TaskDetails";

@Entity ('mcm_score')
export class Score {
    @PrimaryGeneratedColumn({name: '_id'})
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column({name: 'route_id'})
    routeId: number;

    @Column()
    score: number;

    @Column({name: 'tasks_solved'})
    tasksSolved: string;

    @Column({name: 'tasks_solved_low'})
    tasksSolvedLow: string;

    @Column({name: 'task_details'})
    private taskDetails: string = '[]';

    @Column()
    time: number;

    @Column()
    distance: number;

    getTaskDetails(): Array<TaskDetails> {
        let taskDetails : TaskDetails = new TaskDetails();
        return taskDetails.getAllTaskDetails(this.taskDetails);
    }

    getTaskDetailsForTask(taskId: number): TaskDetails {
        let taskDetails : TaskDetails = new TaskDetails();
        return taskDetails.findDetailsForTask(taskId, this.taskDetails);
    }

    addTaskDetailsForTask(allTaskDetails: Array<TaskDetails>, detailsToSave: TaskDetails) : Array<TaskDetails>{
        for(let i = 0; i < allTaskDetails.length; i++){
            let details = allTaskDetails[i];
            if(detailsToSave.taskId == details.taskId){
                //already in array -> replace
                allTaskDetails[i] = detailsToSave;
                this.setTaskDetails(allTaskDetails);
                return allTaskDetails;
            }
        }
        allTaskDetails.push(detailsToSave);
        this.setTaskDetails(allTaskDetails);
        return allTaskDetails;
    }

    setTaskDetails(taskDetails: Array<TaskDetails>){
        this.taskDetails = TaskDetails.getTaskDetailsAsJSONArray(taskDetails);
    }

}