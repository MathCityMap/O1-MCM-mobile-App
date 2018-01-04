import { Injectable } from "@angular/core";
import { checkAvailability } from "@ionic-native/core";
import { SQLite } from '@ionic-native/sqlite';
import { createConnection, Connection, Repository } from "typeorm";

import { InitialMigration1513274191111 } from '../migration/1513274191111-InitialMigration';
import { User } from '../entity/User';
import { State } from '../entity/State';
import { Task } from '../entity/Task';
import { Route } from '../entity/Route';
import { AddImageUrlAndDownloadedFlagMigration1513679923000 } from '../migration/1513679923000-AddImageUrlAndDownloadedFlagMigration';
import { ImagesService } from './images-service';
import { CacheManagerMCM } from '../classes/CacheManagerMCM';
import { Helper } from '../classes/Helper';

@Injectable()
export class OrmService {
  connection: Connection;
  private min_zoom: number = 16;
  private max_zoom: number = 19;

  constructor(private imagesService: ImagesService) {
  }

  async getConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }
    const sqliteAvailable = checkAvailability(SQLite.getPluginRef(), null, SQLite.getPluginName()) === true;
    const entities = [
      User,
      Route,
      State,
      Task
    ];
    const migrations = [
      InitialMigration1513274191111,
      AddImageUrlAndDownloadedFlagMigration1513679923000
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

  async getRouteRepository(): Promise<Repository<Route>> {
    let connection = await this.getConnection();
    return connection.getRepository(Route);
  }

  private async postProcessRoute(route: Route): Promise<Route> {
    return route;
  }

    private async postProcessTask(task: Task): Promise<Task> {
    return task;
}

  public async findRouteById(id: number): Promise<Route> {
    let repo = await this.getRouteRepository();
    let route = await repo.findOneById(id, {relations: ["tasks"]});
    return await this.postProcessRoute(route);
  }

    public async findTaskById(id: number): Promise<Route> {
    let repo = await this.getTaskRepository();
    let task = await repo.findOneById(id);
    return await this.postProcessTask(task);
}

  async getPublicRoutes(): Promise<Route[]> {
    let repo = await this.getRouteRepository();
    let result = await repo.find({
      where: {
        public: '1'
      },
      relations: ["tasks"]
    });
    for (let route of result) {
      await this.postProcessRoute(route);
    }
    return result;
  }

  async downloadRoute(route: Route, statusCallback) {
    await CacheManagerMCM.downloadTiles(route.getBoundingBoxLatLng(), this.min_zoom, this.max_zoom, statusCallback);
    route.downloaded = true;
    const repo = await this.getRouteRepository();
    await repo.save(route);
  }

  async removeDownloadedRoute(route: Route) {
    CacheManagerMCM.removeDownloadedTiles(route.getBoundingBoxLatLng(), this.min_zoom, this.max_zoom);
    route.downloaded = false;
    const repo = await this.getRouteRepository();
    await repo.save(route);
  }
}
