import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Route} from "./Route";
import { Helper } from '../classes/Helper';
import { error } from "util";

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
  private solution: string;

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
  private solutionSample: string

  @Column({name: 'lang_code'})
  langCode: string

  position: number;

  @ManyToMany(type => Route, route => route.tasks)
  routes: Route[]

  getImageURL(): string {
    return Helper.WEBSERVER_URL + this.image;
  }

  getSolutionOptionList() :Array<any>{
      return JSON.parse(this.solution);
  }

  getSolution() : string{
    let solution = JSON.parse(this.solution);
    if(this.solutionType != 'multiple_choice'){
      return solution[0];
    }else{
      console.error('use getMultipleCoiceSolutions() to get solution for multiple choice tasks');
      return "";
    }
  }

  getMultipleCoiceSolutions() : Array<string>{
    let solution = JSON.parse(this.solution);
    if(this.solutionType == 'multiple_choice'){
      let temp = JSON.parse(solution[1])
      return temp;
    }
  }

  getSolutionList() : Array<number>{
    let solution = JSON.parse(this.solution);
    let results: Array<number> = [];
    solution.forEach(element => {
      results.push(+element);
    });
    return results;
  }

  getSolutionSample() : string{
    if(this.solutionSample){

      let sample = JSON.parse(this.solutionSample);
      if(sample.length > 0){
        return sample[0];
      }
    }
    return this.getSolution();
  }

  getHint(index: number) {
    var hint: string;
    switch (index){
      case 1:
        if(JSON.parse(this.hint1).length >=2){
          hint = JSON.parse(this.hint1)[1];
        }
        break;
      case 2:
        if(JSON.parse(this.hint2).length >=2){
          hint = JSON.parse(this.hint2)[1];
        }
        break;
      case 3:
        if(JSON.parse(this.hint3).length >=2){
          hint = JSON.parse(this.hint3)[1];
        }
        break;
      default:
        return hint;
    }
    return hint;

  }
}
