import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Route} from "./Route";
import { Helper } from '../classes/Helper';

@Entity('mcm_task')
export class Task {
// CREATE TABLE IF NOT EXISTS mcm_task (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,public VARCHAR (1) NOT NULL,lat VARCHAR (64) NOT NULL,lon VARCHAR (64) NOT NULL,title TEXT NOT NULL,description TEXT NOT NULL,image TEXT ,
// solution_type TEXT NOT NULL,solution TEXT NOT NULL,hint1 TEXT ,hint2 TEXT ,hint3 TEXT ,assistive_equipment TEXT ,author TEXT ,mail TEXT ,grade VARCHAR (2) NOT NULL DEFAULT '13',tags TEXT ,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
// solutionsample TEXT NOT NULL,attr TEXT ,create_date TIMESTAMP NOT NULL,lang_code VARCHAR (2))

  @PrimaryGeneratedColumn({name: '_id'})
  id: number;

  @Column({name: 'user_id'})
  userId: number;

  @Column({length: 1})
  public: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({name: 'solution_type'})
  solutionType: string;

  @Column()
  solution: string;

  @Column()
  hint1: string;

  @Column()
  hint2: string;

  @Column()
  hint3: string;

  @Column({name: 'assistive_equipment'})
  assistiveEquipment: string;

  @Column()
  author: string;

  @Column()
  mail: string;

  @Column({length: 2})
  grade: string;

  @Column()
  tags: string;

  @Column({name: 'create_date'})
  createDate: string;

  @Column()
  timestamp: string;

  @Column()
  attr: string;

  @Column({name: 'solutionsample'})
  solutionSample: string

  @Column({name: 'lang_code'})
  langCode: string

  position: number;

  @ManyToMany(type => Route, route => route.tasks)
  routes: Route[]

  getImageURL(): string {
    return Helper.WEBSERVER_URL + this.image;
  }

  getHint1() {
    return JSON.parse(this.hint1);
  }
}
