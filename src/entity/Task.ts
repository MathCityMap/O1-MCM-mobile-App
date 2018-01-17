import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Route } from "./Route";
import { Helper } from '../classes/Helper';
import { error } from "util";
import { Task2Route } from './Task2Route';
import { ImagesService } from '../services/images-service';

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
    private assistiveEquipment: string;

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

    @OneToMany(type => Task2Route, task2Route => task2Route.task)
    task2Routes: Task2Route[];

    imagesService: ImagesService

    private cachedImageURL: string;

    getImageURL(): string {
        if (this.cachedImageURL) {
            return this.cachedImageURL;
        }
        if (Helper.NATIVE_BASE_URL) {
            return this.cachedImageURL = Helper.NATIVE_BASE_URL + this.imagesService.getLocalFileName(this.image);
        } else {
            return this.cachedImageURL = Helper.WEBSERVER_URL + this.image;
        }
    }

    getImagesForDownload(): string[] {
        let result = [];
        result.push(this.image);
        return result.concat(this.getHints().filter(hint => hint.type == 'image').map(hint => hint.value));
    }

    getSolutionOptionList(): Array<any> {
        if (this.solutionType == 'multiple_choice') {
            let multipleChoiceSolutionList = [];
            let temp = JSON.parse(this.solution);

            temp[0].forEach(element => {
                multipleChoiceSolutionList.push({userChecked: false, rightAnswer: false, value: element});
            });
            temp[1].forEach(element => {
                multipleChoiceSolutionList[element].rightAnswer = true;
            });
            console.log(multipleChoiceSolutionList);
            return multipleChoiceSolutionList;
        } else {
            return JSON.parse(this.solution);
        }
    }

    getSolution(): string {
        let solution = JSON.parse(this.solution);
        if (this.solutionType != 'multiple_choice') {
            return solution[0];
        } else {
            let solutionArray = this.getSolutionOptionList();
            let solutionText = "";
            for (let i = 0; i < solutionArray.length; i++) {
                if (solutionArray[i].rightAnswer) {
                    if (solutionText != "") {
                        solutionText = solutionText + ", ";
                    }
                    solutionText = solutionText + solutionArray[i].value;
                }
            }
            return solutionText;
        }
    }


    getSolutionList(): Array<number> {
        let solution = JSON.parse(this.solution);
        let results: Array<number> = [];
        solution.forEach(element => {
            results.push(+element);
        });
        return results;
    }

    getSolutionSample(): string {
        if (this.solutionSample) {

            let sample = JSON.parse(this.solutionSample);
            if (sample.length > 0) {
                return sample[0];
            }
        }
        return this.getSolution();
    }

    getAssistiveEquipment(): Array<string> {
        if (this.assistiveEquipment) {
            let json = JSON.parse(this.assistiveEquipment);
            if (json == null) {
                return new Array<string>();
            }
            return json;
        } else {
            return new Array<string>();
        }
    }

    getHint(index: number) {
        let hint = this.getHintObject(index);
        if (hint) {
            return hint.value;
        }
        return null;
    }

    getHintObject(index: number): Hint {
        let hint: string;
        switch (index) {
            case 1:
                hint = this.hint1;
                break;
            case 2:
                hint = this.hint2;
                break;
            case 3:
                hint = this.hint3;
                break;
        }
        if (hint && hint.length > 0) {
            let array = Helper.safeJsonDecode(hint);
            if (array.length >= 2) {
                return {
                    type: array[0],
                    value: array[1]
                }
            }
        }
        return null;
    }

    getHints(): Hint[] {
        let result = [];
        for (let i = 1; i <= 3; i++) {
            let hint = this.getHintObject(i);
            if (hint) {
                result.push(hint);
            }
        }
        return result;
    }
}

export interface Hint {
    type: string,
    value: string
}