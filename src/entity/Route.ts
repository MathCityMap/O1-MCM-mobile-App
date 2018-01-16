import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany
} from "typeorm";
import { Task } from './Task';
import { Helper } from '../classes/Helper';
import { LatLng, LatLngBounds } from 'leaflet';
import { Score } from "./Score";
import { Task2Route } from './Task2Route';
import { User } from './User';
import { TranslateService } from '@ngx-translate/core';
import { ImagesService } from '../services/images-service';

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

  tasks: Task[];

  @OneToMany(type => Task2Route, task2Route => task2Route.route, {eager: true})
  task2Routes: Task2Route[];

  @Column({name: 'downloaded'})
  downloaded: boolean;

  @Column({name: 'unlocked'})
  unlocked: boolean;

    @OneToMany(type => Score, score => score.route, {eager: true})
  scores: Score[];


  getScoreForUser(user: User): Score {
    let userScore = this.scores.filter(value => value.userId == user.id);
    let score = userScore.length > 0 ? userScore[0] : new Score();
    score.userId = user.id;
    score.route = this;
    return score;
  }

  private cachedImageURL: string;
  getImageURL(): string {
    if (this.cachedImageURL) {
      return this.cachedImageURL;
    }
    if (Helper.NATIVE_BASE_URL) {
        return this.cachedImageURL = Helper.NATIVE_BASE_URL + 'thumb_' + this.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, '');
    } else {
        return this.cachedImageURL = Helper.WEBSERVER_URL + this.image;
    }
  }

  private boundingBoxLatLng: LatLngBounds = null;
  private viewBoundingBoxLatLng: LatLngBounds = null;
  private centerLatLng: LatLng = null;
  private distance: number = null;

  constructor(){

  }

  private calcBoundingBoxAndCenter() {
    const padding: number = 0.0015;
    const jsonBB = JSON.parse(this.boundingBox);
    const jsonCenter = JSON.parse(this.center);
    const northWest = jsonBB[0];
    const southEast = jsonBB[1];
    const south = southEast[0] - padding;
    const north = northWest[0] + padding;
    const west = northWest[1] - padding;
    const east = southEast[1] + padding;
    this.viewBoundingBoxLatLng = new LatLngBounds([northWest[0], southEast[1]], [southEast[0], northWest[1]]);
    this.boundingBoxLatLng = new LatLngBounds([[north, east], [south, west]]);
    this.centerLatLng = new LatLng(jsonCenter[0], jsonCenter[1]);
  }

  getAssistiveEquipment(translateService: TranslateService) : string{
    let equipment = "";
    if(this.tasks){
      for(let i = 0; i < this.tasks.length; i++){
        let equipmentArray =  this.tasks[i].getAssistiveEquipment();
        for(let j = 0; j < equipmentArray.length; j++){
            let translation = translateService.instant(equipmentArray[j]);
            if(equipment.indexOf(translation) == -1){
              if(equipment != ""){
                equipment = equipment + ", ";
              }
              equipment = equipment + translation;
            }
        }
      }
    }

    return equipment;
  }

  getBoundingBoxLatLng(): LatLngBounds {
    if (!this.boundingBoxLatLng) {
      this.calcBoundingBoxAndCenter();
    }
    return this.boundingBoxLatLng;
  }

  getViewBoundingBoxLatLng(): LatLngBounds {
    if (!this.viewBoundingBoxLatLng) {
      this.calcBoundingBoxAndCenter();
    }
    return this.viewBoundingBoxLatLng;
  }

  getCenterLatLng(): LatLng {
    if (!this.centerLatLng) {
      this.calcBoundingBoxAndCenter();
    }
    return this.centerLatLng;
  }

  getDistance(): number {
    if (Helper.myLocation != null && this.distance == null) {
      this.distance = Helper.getDistanceToCenterByLatLng(this.getCenterLatLng());
    }
    return this.distance;
  }
}
