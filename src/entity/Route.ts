import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Task} from './Task';
import {Helper} from '../classes/Helper';
import {LatLng, LatLngBounds} from 'leaflet';
import {Score} from "./Score";
import {Task2Route} from './Task2Route';
import {User} from './User';
import {TranslateService} from '@ngx-translate/core';
import {OrmService} from '../services/orm-service';
import {GpsService} from '../services/gps-service';
import {MAPBOX_ACCESS_TOKEN} from "../env/env";
import {RouteApiResponse} from "../services/ApiResponseDefinition/RouteApiResponse";
import {TaskFormat} from "../services/ApiResponseDefinition/TaskFormat";

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

    @Column()
    length: string;

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

    @Column({name: 'map_version'})
    mapVersion: string;

    @Column({name: 'map_filename'})
    mapFileName: string;

    @Column({name: 'map_date'})
    mapDate: string;

    @Column({name: 'path_geojson'})
    pathGeojson: string;

    @Column({name: 'path_info'})
    pathInfo: string;

    @Column({name: 'is_offline'})
    isOffline: boolean;

    // TODO: change table's schema
    /*@Column("simple-json")
    narrativeStrings: { welcome: string, welcomeMessage: string, ending: string, aboutObject: string,
        wellDone: string, notPerfect: string, firstGo: string, wrongAnswer: string, tryAgain: string, takeHint: string,
        skipTask: string, congratulations: string, goodLuck: string };*/


    @Column({name: 'lang_code'})
    langCode: string;

    tasks: Task[];

    narrativeStrings = [];
    matchingStrings = {
        "a_alert_welcome": "welcome",
        "a_alert_welcome_msg" : "welcomeMessage",
        "a_alert_congrats_msg" : "ending",
        "a_did_you_know" : "aboutObject",
        "a_alert_right_answer_title" : "wellDone",
        "a_alert_right_answer_title_low" : "notPerfect",
        "a_alert_right_answer_1" : "firstGo",
        "a_alert_false_answer_title" : "wrongAnswer",
        "a_alert_false_answer_1" : "tryAgain",
        "a_alert_false_answer_2" : "takeHint",
        "a_skipTask_confirm" : "skipTask",
        "a_alert_congrats" : "congratulations",
        "good_luck_next_time" : "goodLuck"
    };

    async getTasks(): Promise<Task[]> {
        if (this.tasks) {
            return this.tasks;
        }
        if (this.task2Routes) {
            this.task2Routes.sort((a, b) => a.id - b.id);
            this.tasks = await Promise.all(this.task2Routes.map(async (value, index) => {
                    let task = await value.getTaskWithSubtasks();
                    if (!task) {
                        return Promise.resolve(undefined);
                    }
                    task.position = index + 1;
                    return Promise.resolve(task);
                })
            );
            this.tasks = this.tasks.filter(task => {
                return !!task
            });
        } else {
            // relation was not loaded yet -> reload route to get tasks
            this.tasks = await (await OrmService.INSTANCE.findRouteById(this.id)).getTasks();
        }
        return this.tasks;
    }

    @OneToMany(type => Task2Route, task2Route => task2Route.route, {eager: true})
    task2Routes: Task2Route[];

    @Column({name: 'downloaded'})
    downloaded: boolean;

    @Column({name: 'downloadedDate'})
    downloadedDate: string;

    @Column({name: 'completedDate'})
    completedDate: string;

    @Column({name: 'unlocked'})
    unlocked: boolean;

    @Column({name: 'completed'})
    completed: boolean;

    @OneToMany(type => Score, score => score.route, {eager: true})
    scores: Score[];

    @Column({name: 'min_zoom'})
    min_zoom: number;

    static fromRouteResponse(routeResponse: RouteApiResponse): Route {
        let route = new Route();
        route.id = routeResponse._id;
        route.userId = routeResponse.user_id;
        route.public = routeResponse.public;
        route.title = routeResponse.title;
        route.countryCode = routeResponse.country_code;
        route.city = routeResponse.city;
        route.image = routeResponse.image;
        route.code = routeResponse.code;
        route.grade = routeResponse.grade;
        route.tags = routeResponse.tags;
        route.duration = routeResponse.duration;
        route.length = routeResponse.length;
        route.boundingBox = routeResponse.bounding_box;
        route.center = routeResponse.center;
        route.timestamp = routeResponse.timestamp;
        route.description = routeResponse.description;
        route.createDate = routeResponse.create_date;
        route.attr = routeResponse.attr;
        route.mapVersion = String(routeResponse.map_version);
        route.mapFileName = routeResponse.map_filename;
        route.mapDate = String(routeResponse.map_date);
        route.isOffline = !!routeResponse.is_offline;
        route.distance = routeResponse.distance * 1000 // App expects distances in metres, here we get a distance in kilometres
        return route;
    }

    static convertGenericsToRouteArray(data: Array<any>) {
        return data.map(rD => this.fromGenericRoute(rD));
    }

    static fromGenericRoute(data: any): Route {
        let route = new Route();
        Object.assign(route, data);
        return route;
    }

    static async getTrueTaskCount(taskList: Array<Task>) {
        let tasks = taskList.filter(task => {return task.taskFormat !== TaskFormat.GROUP});
        let groups = taskList.filter(task => {return task.taskFormat === TaskFormat.GROUP});
        let count = tasks.length;
        for (let group of groups) {
            count += group.getLegitSubtasks().length;
        }
        return count;
    }

    async getTaskCount(): Promise<number> {
        let allTasks: Task[];
        if(this.tasks) {
            allTasks = this.tasks;
        }
        if (this.task2Routes) {
            allTasks = this.task2Routes.map(t2R => {
                return t2R.task;
            }).filter(task => {return !!task});
        }
        if (allTasks) {
            let tasks = allTasks.filter(task => {return task.taskFormat !== TaskFormat.GROUP});
            let groups = allTasks.filter(task => {return task.taskFormat === TaskFormat.GROUP});
            let count = tasks.length;
            for (let group of groups) {
                if (!group.getLegitSubtasks()) {
                    // relation was not loaded yet -> reload group to get tasks
                    count += (await OrmService.INSTANCE.findTaskById(group.id)).getLegitSubtasks().length;
                } else {
                    count += group.getLegitSubtasks().length;
                }
            }
            return count;
        } else {
            // relation was not loaded yet -> reload route to get tasks
            await (await OrmService.INSTANCE.findRouteById(this.id)).getTaskCount();
        }
    }

    getScoreForUser(user: User): Score {
        let userScore = this.scores.filter(value => value.userId == user.id);
        let score = userScore.length > 0 ? userScore[0] : new Score();
        score.userId = user.id;
        score.route = this;
        return score;
    }

    getImageURL(): string {
        return this.image;
    }

    private boundingBoxLatLng: LatLngBounds = null;
    private boundingBoxLatLngForMapBox: Array<Array<number>> = null;
    private viewBoundingBoxLatLng: LatLngBounds = null;
    private viewBoundingBoxLatLngForMapBox: Array<Array<number>> = null;
    private centerLatLng: LatLng = null;
    private distance: number = null;

    private calcBoundingBoxAndCenter() {
        const padding: number = 0.0015;
        if (!this.boundingBox) {
            return;
        }
        const jsonBB = JSON.parse(this.boundingBox);
        const jsonCenter = JSON.parse(this.center);
        if (!jsonBB) {
            return;
        }
        const northWest = jsonBB[0];
        const southEast = jsonBB[1];
        const south = southEast[0] - padding;
        const north = northWest[0] + padding;
        const west = northWest[1] - padding;
        const east = southEast[1] + padding;
        const mapBoxExtraPadding = 0.05;
        this.viewBoundingBoxLatLng = new LatLngBounds([northWest[0], southEast[1]], [southEast[0], northWest[1]]);
        this.viewBoundingBoxLatLngForMapBox = [[northWest[1], southEast[0]], [southEast[1], northWest[0]]]
        this.boundingBoxLatLng = new LatLngBounds([[north, east], [south, west]]);
        this.boundingBoxLatLngForMapBox = [[west-mapBoxExtraPadding, south-mapBoxExtraPadding], [east+mapBoxExtraPadding, north+mapBoxExtraPadding]]
        this.centerLatLng = new LatLng(jsonCenter[0], jsonCenter[1]);
    }

    getAssistiveEquipment(translateService: TranslateService): string {
        let equipment = "";
        if (this.tasks) {
            for (let i = 0; i < this.tasks.length; i++) {
                let equipmentArray = this.tasks[i].getAssistiveEquipment();
                for (let j = 0; j < equipmentArray.length; j++) {
                    let translation = translateService.instant(equipmentArray[j]);
                    if (equipment.indexOf(translation) == -1) {
                        if (equipment != "") {
                            equipment = equipment + ", ";
                        }
                        equipment = equipment + translation;
                    }
                }
            }
        }

        return equipment;
    }

    static getAssistiveEquipment(tasks: Task[], translateService: TranslateService): string {
        let equipment = "";
        if (tasks) {
            for (let i = 0; i < tasks.length; i++) {
                let equipmentArray = tasks[i].getAssistiveEquipment();
                for (let j = 0; j < equipmentArray.length; j++) {
                    let translation = translateService.instant(equipmentArray[j]);
                    if (equipment.indexOf(translation) == -1) {
                        if (equipment != "") {
                            equipment = equipment + ", ";
                        }
                        equipment = equipment + translation;
                    }
                }
            }
        }

        return equipment;
    }

    getSettingValue(key: string): boolean{
        if(this.isSettingAvailable(key)){
            let attr = this.getAttributes();
            return attr[key] === "true" || attr[key] === "1";
        }
        else return null;
    }

    getSettingStringValue(key: string, translateService: TranslateService): string{
        let value = this.getSettingValue(key);
        if(value !== null){
            return value ? translateService.instant('a_settings_active') : translateService.instant('a_settings_inactive');
        }
        else{
            return "";
        }
    }

    /*
    Checks if setting with given key is available
    @param key string
    @return boolean
     */
    isSettingAvailable(key: string): boolean{
        let attr = this.getAttributes();
        // fix missing values
        if (!attr.sampleSolution) {
            attr.sampleSolution = "true";
        }
        if (!attr.hints) {
            attr.hints = "true";
        }
        if (!attr.answerValidation) {
            attr.answerValidation = "true";
        }
        if (!attr.answerFeedback) {
            attr.answerFeedback = "true";
        }
        this.attr = JSON.stringify(attr);
        return attr.hasOwnProperty(key);
    }

    getBoundingBoxLatLng(): LatLngBounds {
        if (!this.boundingBoxLatLng) {
            this.calcBoundingBoxAndCenter();
        }
        if (!this.boundingBoxLatLng.getSouthWest) {
            // sometimes bounds loses it's methods and turns into just a generic object so we rebuild it into a new LatLngBounds
            this.boundingBoxLatLng = new LatLngBounds([this.boundingBoxLatLng._northEast.lat, this.boundingBoxLatLng._northEast.lng], [this.boundingBoxLatLng._southWest.lat, this.boundingBoxLatLng._southWest.lng]);
        }
        return this.boundingBoxLatLng;
    }

    getBoundingBoxLatLngForMapBox(): Array<Array<number>> {
        if (!this.boundingBoxLatLngForMapBox) {
            this.calcBoundingBoxAndCenter();
        }
        return this.boundingBoxLatLngForMapBox;
    }

    getViewBoundingBoxLatLng(): LatLngBounds {
        if (!this.viewBoundingBoxLatLng) {
            this.calcBoundingBoxAndCenter();
        }
        if (!this.viewBoundingBoxLatLng.getSouthWest) {
            // sometimes bounds loses it's methods and turns into just a generic object so we rebuild it into a new LatLngBounds
            this.viewBoundingBoxLatLng = new LatLngBounds([this.viewBoundingBoxLatLng._northEast.lat, this.viewBoundingBoxLatLng._northEast.lng], [this.viewBoundingBoxLatLng._southWest.lat, this.viewBoundingBoxLatLng._southWest.lng]);
        }
        return this.viewBoundingBoxLatLng;
    }

    getViewBoundingBoxLatLngForMapBox(): Array<Array<number>> {
        if (!this.viewBoundingBoxLatLngForMapBox) {
            this.calcBoundingBoxAndCenter();
        }
        return this.viewBoundingBoxLatLngForMapBox;
    }

    getCenterLatLng(): LatLng {
        if (!this.centerLatLng) {
            this.calcBoundingBoxAndCenter();
        }
        return this.centerLatLng;
    }

    getDistance(): number {
        if (GpsService.INSTANCE.getLastPosition() && this.distance == null) {
            this.distance = Helper.INSTANCE.getDistanceToCenterByLatLng(this.getCenterLatLng());
        }
        return this.distance;
    }

    getAttributes(): any {
        if (!this.attr) {
            return {};
        }
        return Helper.safeJsonDecode(this.attr);
    }

    getNarrativeName(): string {
        //return string for testing with a specific narrative on all routes (works best together with isNarrativeEnabled true);
        //return 'pirates';
        let name = this.getAttributes().narrativeName;
        if (name) {
            return name.toLowerCase();
        } else {
            return "";
        }
    }

    getTilesMap(narrative) {
        if (this.getAttributes().tilesUrl) {
            return this.getAttributes().tilesUrl;
        } else {
            switch (narrative) {
                case 'pirates':
                    // return 'mapbox://styles/igurjanow/ck0ezs4vd02ou1co75ep12pyz';
                    return 'https://api.mapbox.com/styles/v1/igurjanow/ck0ezs4vd02ou1co75ep12pyz/tiles/256/{z}/{x}/{y}@2x?access_token='+MAPBOX_ACCESS_TOKEN
                default:
                    // return 'mapbox://styles/mapbox/outdoors-v11';
                    return Helper.mapquestUrl

            }
        }
    }

    getTilesServerSubdomains(narrative) {
        if (this.getAttributes().tilesSubdomains) {
            return this.getAttributes().tilesSubdomains;
        } else {
            switch (narrative) {
                case 'pirates':
                    return ['a', 'b'];
                default:
                    return Helper.subDomains;
            }
        }
    }

    isGamificationDisabled() {
        if (this.getAttributes().gamification) {
            return this.getAttributes().gamification === "false";
        } else {
            return false;
        }
    }

    isSampleSolutionEnabled() {
        if (this.getAttributes().sampleSolution) {
            return this.getAttributes().sampleSolution === "true";
        } else {
            return true;
        }
    }

    isHintsEnabled() {
        if (this.getAttributes().hints) {
            return this.getAttributes().hints === "true";
        } else {
            return true;
        }
    }

    isAnswerValidationEnabled() {
        if (this.getAttributes().answerValidation) {
            return this.getAttributes().answerValidation === "true";
        } else {
            return true;
        }
    }

    isAnswerFeedbackEnabled() {
        if (this.getAttributes().answerFeedback) {
            return this.getAttributes().answerFeedback === "true";
        } else {
            return true;
        }
    }

    isNarrativeEnabled() {
        // return true for testing with narrative enabled for all routes
        //return true
        return !!(this.getAttributes().narrativeName);
    }

    setNarrativeStrings() {
        let strings = this.getAttributes().narrativeStrings;
        if (strings != null) {
            this.narrativeStrings = JSON.parse(strings);
        }
    }

    hasNarrativeString($mcmKey) {
        if(this.narrativeStrings == null || this.narrativeStrings.length == 0) {
            this.setNarrativeStrings();
        }
        let key = this.matchingStrings[$mcmKey];
        let newString = this.narrativeStrings[key];

        return newString? true : false;
    }

    getNarrativeString($mcmKey) {
        if(this.narrativeStrings == null || this.narrativeStrings.length == 0) {
            this.setNarrativeStrings();
        }
        let key = this.matchingStrings[$mcmKey];
        let newString = this.narrativeStrings[key];
        if(newString && $mcmKey === 'a_alert_welcome_msg'){
            newString = newString.replace('###TITLE###', this.title);
        }
        return newString? newString : $mcmKey;
    }

    isSubtaskRequired(taskId) {
        if (!this.task2Routes) return false;
        const task2Route =  this.task2Routes.find(task2Route => {
            return task2Route.task.id == taskId;
        });
        return task2Route ? task2Route.forceSupportTask : false;
    }

    getPathGeoJson() {
        if (this.pathGeojson && this.pathInfo !== 'undefined') {
            return JSON.parse(this.pathGeojson);
        }
        return null;
    }

    getPathInfo() {
        if (this.pathInfo && this.pathInfo !== 'undefined') {
            return JSON.parse(this.pathInfo);
        }
        return null;
    }

    isMapAvailableOffline() {
        return this.isOffline;
    }

}
