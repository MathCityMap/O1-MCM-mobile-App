import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { Task } from './Task';
import { Helper } from '../classes/Helper';
import { LatLng, LatLngBounds } from 'leaflet';
import { Score } from "./Score";

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

  @OneToOne(type => Score, score => score.route)
  score: Score;

  getImageURL(): string {
    return this.imageURL ? this.imageURL : Helper.WEBSERVER_URL + this.image;
  }

  private boundingBoxLatLng: LatLngBounds = null;
  private viewBoundingBoxLatLng: LatLngBounds = null;
  private centerLatLng: LatLng = null;
  private distance: number = null;

  constructor(){
    if(!this.score){
      this.score = new Score();
    }
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
