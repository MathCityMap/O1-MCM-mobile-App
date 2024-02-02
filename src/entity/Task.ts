import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Route } from "./Route";
import { Helper } from '../classes/Helper';
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
    private solutionSample: string;

    @Column({name: 'lang_code'})
    langCode: string;

    /*
    @Column()
    visible: number;
    */

    @Column({name: 'position'})
    position: number;

    @Column({name: 'ar_link'})
    arLink: string;

    @Column()
    code: string;

    @ManyToMany(type => Route, route => route.tasks)
    routes: Route[]

    @OneToMany(type => Task2Route, task2Route => task2Route.task)
    task2Routes: Task2Route[];

    @ManyToOne(type => Task, task => task.subtasks)
    @JoinColumn({name: 'task_id'})
    task_id: Task;

    /**
     * Use "getLegitSubtasks" function to fetch subtasks in Order to fetch Subtasks from outside to avoid running into corrupted Data
     */
    @OneToMany(type => Task, task => task.task_id)
    private subtasks: Task[];

    getImageURL(asRawString: boolean = false): string {
        return ImagesService.INSTANCE.getOfflineURL(this.image, undefined, undefined, asRawString);
    }

    getSingleQuotedImageURL(): string {
        return `'${this.getImageURL()}'`;
    }

    getImagesForDownload(): string[] {
        let result = [];
        // Add title image
        if (this.image) {
            result.push(this.image);
        }
        // Add sample solution image if available
        let sampleSolutionImg = this.getSolutionSampleImgSrc();
        if(sampleSolutionImg != ""){
            result.push(sampleSolutionImg);
        }
        if (this.getLegitSubtasks()) {
            for (let subtask of this.getLegitSubtasks()) {
                result = result.concat(subtask.getImagesForDownload());
            }
        }
        // Add hint images
        return result.concat(this.getHints().filter(hint =>
            hint.type == 'image' && hint.value && hint.value.trim()
        ).map(hint => hint.value.trim()));
    }

    getSolutionOptionList(): Array<any> {
        if (this.solutionType == 'multiple_choice') {
            let multipleChoiceSolutionList = [];
            let temp = Helper.safeJsonDecode(this.solution);

            temp[0].forEach(element => {
                multipleChoiceSolutionList.push({userChecked: false, rightAnswer: false, value: element});
            });
            temp[1].forEach(element => {
                multipleChoiceSolutionList[element].rightAnswer = true;
            });
            console.log(multipleChoiceSolutionList);
            return multipleChoiceSolutionList;
        } else {
            return Helper.safeJsonDecode(this.solution);
        }
    }

    getSolution(): string {
        let solution = Helper.safeJsonDecode(this.solution);
        if (this.solutionType === "vector_values" || this.solutionType === "vector_intervals" || this.solutionType === 'set' || this.solutionType === 'blanks' || this.solutionType === 'fraction') {
            return solution;
        }
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
        let solution = Helper.safeJsonDecode(this.solution);
        let results: Array<number> = [];
        solution.forEach(element => {
            results.push(+element);
        });
        return results;
    }

    /*
    Returns details of gps task.
    Keys:
    task - type of gps task (e.g. centerTwo, centerThree, linearFx, square, lineNoDirection, lineDirection, triangle)
    points - the number of points the user has to place to solve the task (also number of buttons to display on map)
    setPoints - the number of points the author had to define in the web portal. The system needs to validate the solution
    against these points.
    point1 (point2, point3 ... etc.) - depending on the number of 'setPoints' there are [lat, lon] arrays saved behind the keys
     */
    getSolutionGpsValue(key: string): any {
        if(this.solutionType == "gps"){
            let solution = Helper.safeJsonDecode(this.solution);
            return solution[key];
        }
        else{
            return null;
        }
    }

    getSolutionSample(): string {
        if (this.solutionSample) {
            let sample = Helper.safeJsonDecode(this.solutionSample);
            if (sample.length > 0) {
                return sample[0];
            }
        }
        return "";
    }

    /*
    Returns the src of sample solution image if provided, empty string if not
     */
    getSolutionSampleImgSrc(): string {
        if(this.solutionSample){
            let sample = Helper.safeJsonDecode(this.solutionSample);
            if(sample.length > 0){
                return (sample[1] != null) ? sample[1] : "";
            }
        }
        else{
            return "";
        }
    }

    getAssistiveEquipment(): Array<string> {
        if (this.assistiveEquipment) {
            let json = Helper.safeJsonDecode(this.assistiveEquipment);
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
            return hint;
        }
        return null;
    }

    hasHintMessage(index: number){
        let hint = this.getHint(index);
        if( !hint ) return;
        else{
            if( hint.value ) return true;
            else return false;
        }
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

    isAttrObject(): boolean{
        if(this.attr == null){
            return false;
        }
        try {
            JSON.parse(this.attr);
        } catch (e) {
            return false;
        }
        return true;
    }

    hasSideFacts(): boolean{
        // make sure the attr field is available (old tasks dont have one)
        if(!this.isAttrObject()){
            return false;
        }
        let attr = Helper.safeJsonDecode(this.attr);
        if(attr.hasOwnProperty('side_facts')){
            let side_facts = attr.side_facts;
            if(side_facts.hasOwnProperty('text')){
               return side_facts.text != "";
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    getSideFactsText(): String{
        if(this.hasSideFacts()){
            let attr = Helper.safeJsonDecode(this.attr);
            return attr.side_facts.text;
        }
        else{
            return "";
        }
    }

    /**
     * Method to filter out legacy saved Supporttasks with unsupported ID
     */
    getLegitSubtasks(): Array<Task> {
        const origin = this;
        if (this.subtasks) {
            return this.subtasks.filter((task) => {
                return !task.id.toString().includes(origin.id.toString());
            })
        }
        return null;
    }

    getSubtasksInOrder(): Array<Task> {
        return this.getLegitSubtasks().sort((a, b) => {
            if (a.position > b.position) return 1;
            if (a.position < b.position) return -1;
            return 0;
        })
    }
}

export interface Hint {
    type: string,
    value: string
}
