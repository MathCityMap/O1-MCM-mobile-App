import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task } from './Task';
import { Route } from './Route';

@Entity('mcm_rel_route_task')
export class Task2Route {
// CREATE TABLE IF NOT EXISTS mcm_rel_route_task (_id INTEGER PRIMARY KEY AUTOINCREMENT,route_id INTEGER (64) NOT NULL,task_id INTEGER (64) NOT NULL,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
  @PrimaryGeneratedColumn({name: '_id'})
  id: number;

  @ManyToOne(type => Route, route => route.task2Routes)
  @JoinColumn({name: 'route_id', referencedColumnName: 'id'})
  route: Route;

  @ManyToOne(type => Task, task => task.task2Routes, {eager: true})
  @JoinColumn({name: 'task_id', referencedColumnName: 'id'})
  task: Task;
}
