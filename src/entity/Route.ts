import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Task} from './Task';

@Entity('mcm_route')
export class Route {
// CREATE TABLE IF NOT EXISTS mcm_route (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,public VARCHAR (1) NOT NULL,title TEXT NOT NULL,country_code TEXT NOT NULL,city TEXT NOT NULL,image TEXT ,code VARCHAR (64),
// grade TEXT (64),tags VARCHAR ,duration VARCHAR (64),length VARCHAR (64),bounding_box TEXT ,center TEXT ,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,description TEXT ,create_date TIMESTAMP NOT NULL,attr TEXT TEXT)");

  @PrimaryGeneratedColumn({name: '_id'})
  id: number;

  @Column({name: 'user_id'})
  userId: number;

  @Column({length: 1})
  public: string;

  @Column()
  title: string;

  @Column({name: 'country_code'})
  countryCode: string;

  @Column()
  city: string;

  @Column()
  image: string;

  @Column({length: 64})
  code: string;

  @Column({length: 64})
  grade: string;

  @Column()
  tags: string;

  @Column({length: 64})
  duration: string;

  @Column({name: 'bounding_box'})
  boundingBox: string;

  @Column()
  center: string;

  @Column()
  description: string;

  @Column({name: 'create_date'})
  createDate: string;

  @Column()
  timestamp: string;

  @Column()
  attr: string;

  @ManyToMany(type => Task, task => task.routes)
  @JoinTable({name: 'mcm_rel_route_task', joinColumn: {name: 'route_id'}, inverseJoinColumn: {name: 'task_id'}})
  tasks: Task[];

  @Column({name: 'image_url'})
  imageURL: string;

  @Column({name: 'downloaded'})
  downloaded: boolean;
}
