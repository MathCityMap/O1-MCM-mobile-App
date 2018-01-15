import { Injectable } from "@angular/core";
import { checkAvailability } from "@ionic-native/core";
import { SQLite } from '@ionic-native/sqlite';
import { createConnection, Connection, Repository } from "typeorm";

import { InitialMigration1513274191111 } from '../migration/1513274191111-InitialMigration';
import { FailedTaskMigration1515428187000 } from '../migration/1515428187000-failedTaskMigration';

import { User } from '../entity/User';
import { State } from '../entity/State';
import { Task } from '../entity/Task';
import { Route } from '../entity/Route';
import { AddImageUrlAndDownloadedFlagMigration1513679923000 } from '../migration/1513679923000-AddImageUrlAndDownloadedFlagMigration';
import { ImagesService } from './images-service';
import { CacheManagerMCM } from '../classes/CacheManagerMCM';
import { Score } from "../entity/Score";
import { TaskState } from "../entity/TaskState";
import { Task2Route } from '../entity/Task2Route';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { AddUnlockedColumn1516037215000 } from '../migration/1516037215000-AddUnlockedColumn';

@Injectable()
export class OrmService {
  connection: Connection;
  private min_zoom: number = 16;
  private max_zoom: number = 19;

  constructor(private imagesService: ImagesService, private spinner: SpinnerDialog,
              private translateService: TranslateService, private platform: Platform) {
  }

  async getConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }
    await this.platform.ready();
    const sqliteAvailable = checkAvailability(SQLite.getPluginRef(), null, SQLite.getPluginName()) === true;
    const entities = [
      User,
      Route,
      State,
      Task,
      Score,
      Task2Route
    ];
    const migrations = [
      InitialMigration1513274191111,
      AddImageUrlAndDownloadedFlagMigration1513679923000,
      FailedTaskMigration1515428187000,
      AddUnlockedColumn1516037215000
    ];
    if (sqliteAvailable) {
      return this.connection = await createConnection({
        type: 'cordova',
        location: 'default',
        database: 'mcm_db.sqlite3',
        logging: ['error', 'query', 'schema'],
        logger: 'simple-console',
        synchronize: false,
        entities: entities,
        migrationsRun: true,
        migrations: migrations
      });
    } else {
      return this.connection = await createConnection({
        type: 'websql',
        version: '1.0',
        description: 'MCM DB',
        size: 2 * 1024 * 1024,
        database: 'mcm',
        logging: ['error', 'query', 'schema'],
        logger: 'simple-console',
        synchronize: false,
        entities: entities,
        migrationsRun: true,
        migrations: migrations
      });
    }
  }

  async getTaskRepository(): Promise<Repository<Task>> {
    let connection = await this.getConnection();
    return connection.getRepository(Task);
  }

  async getStateRepository(): Promise<Repository<State>> {
    let connection = await this.getConnection();
    return connection.getRepository(State);
  }

  async getScoreRepository(): Promise<Repository<Score>> {
    let connection = await this.getConnection();
    return connection.getRepository(Score);
  }

  async getRouteRepository(): Promise<Repository<Route>> {
    let connection = await this.getConnection();
    return connection.getRepository(Route);
  }

  async getUserRepository(): Promise<Repository<User>> {
    let connection = await this.getConnection();
    return connection.getRepository(User);
  }

  private async postProcessRoute(route: Route): Promise<Route> {
    if (route && route.task2Routes) {
      route.task2Routes.sort((a, b) => a.id - b.id);
      route.tasks = route.task2Routes.map((value, index)=> {
        value.task.position = index + 1;
        return value.task;
      });
    }

    return route;
  }

  private async postProcessTask(task: Task): Promise<Task> {
    return task;
  }

  private async postProcessUser(user: User): Promise<User> {
    return user;
  }

  private async postProcessScore(score: Score): Promise<Score> {
    return score;
  }

  public async findRouteById(id: number): Promise<Route> {
    let repo = await this.getRouteRepository();
    let route = await repo.findOneById(id);
    return await this.postProcessRoute(route);
  }

    public async findRouteByCode(code: string): Promise<Route> {
        let repo = await this.getRouteRepository();
        let route = await repo.findOne({where: {code: code}});
        return await this.postProcessRoute(route);
    }

    public async findScoreByRoute(id: number): Promise<Score> {
    let repo = await this.getScoreRepository();
    let score = await repo.findOne({where: {routeId: id}});
    return await this.postProcessScore(score);
  }

  public async getAllTasks(){
    let repo = await this.getTaskRepository();
    let tasks = await repo.find({relations: ["routes"]});
    var solutionTypes :Array<string> = [];
    tasks.forEach(task =>{
      if(solutionTypes.indexOf(task.solutionType) == -1){
          solutionTypes.push(task.solutionType);
      }
      if(task.solutionType == "gps" && task.public == "1"){

        task.routes.forEach(route =>{
          if(route.public == "1"){
            console.log(route);
            console.log(task);
          }
        });
      }

    })

  }
  public async findTaskById(id: number): Promise<Task> {
    let repo = await this.getTaskRepository();
    let task = await repo.findOneById(id);
    return await this.postProcessTask(task);
  }



  async insertOrUpdateTaskState(score: Score, detailsToSave: TaskState) {
    let repo = await this.getScoreRepository();
    score.addTaskStateForTask(score.getTaskState(), detailsToSave);
    let user = await this.getActiveUser();
    score.userId = user.id;

    await repo.save(score);


  }

  async setNewActiveUser(userName: string) : Promise<User>{
    let repo = await this.getUserRepository();
    let user = new User();
    user.name = userName;

    await this.setActiveUser(userName);
    await repo.save(user);
    return user;
  }

  async setActiveUser(userName: string) {
    let repo = await this.getStateRepository();
    let state: State = await repo.findOne({where: {option: 'active_user'}})
    if(!state){
      state = new State();
      state.option = "active_user";
    }
    state.value = userName;
    await repo.save(state);
  }

  async getActiveUser() : Promise<User>{
    let repo = await this.getStateRepository();
    let state = await repo.findOne({where: {option: 'active_user'}});
    let user = null;
    if(state && state.value){
      user = await this.getUserByName(state.value);
    }
    return user;
  }

  async checkUsername(userName: string): Promise<boolean>{
      let user = await this.getUserByName(userName);
      if(user){
        return true;
      }
      return false;
  }

  private async getUserByName(userName: string) : Promise<User>{
    let repo = await this.getUserRepository();
    let user = await repo.findOne({where:{name: userName}});
    return this.postProcessUser(user);
  }

  async getVisibleRoutes(): Promise<Route[]> {
    this.spinner.show(null, this.translateService.instant('toast_routes_loading'), true);
    let repo = await this.getRouteRepository();
    let result = await repo.find({
      where: {
        public: '1'
      }
    });
    result = result.concat(await repo.find({
        where: {
            unlocked: '1'
        }
    }));
    for (let route of result) {
      await this.postProcessRoute(route);
    }
    this.spinner.hide();
    return result;
  }

  async downloadRoute(route: Route, statusCallback) {
    try {
      await CacheManagerMCM.downloadTiles(route.getBoundingBoxLatLng(), this.min_zoom, this.max_zoom, statusCallback);
      route.downloaded = true;
      const repo = await this.getRouteRepository();
      await repo.save(route);
    } catch (e) {
      console.log("download failed or was aborted");
      console.log(e);
    }
  }

  async removeDownloadedRoute(route: Route) {
    CacheManagerMCM.removeDownloadedTiles(route.getBoundingBoxLatLng(), this.min_zoom, this.max_zoom);
    route.downloaded = false;
    const repo = await this.getRouteRepository();
    await repo.save(route);
  }
}
