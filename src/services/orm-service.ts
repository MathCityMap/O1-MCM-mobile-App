import {Injectable} from "@angular/core";
import {checkAvailability} from "@ionic-native/core";
import {SQLite} from '@ionic-native/sqlite'
import {createConnection, Connection } from "typeorm";
import {CordovaConnectionOptions} from 'typeorm/browser/driver/cordova/CordovaConnectionOptions';

import {InitialMigration1513274191111} from '../migration/1513274191111-InitialMigration';
import {WebSqlConnectionOptions} from 'typeorm/browser/driver/websql/WebSqlConnectionOptions';
import {BaseConnectionOptions} from 'typeorm/browser/connection/BaseConnectionOptions';
import {User} from '../entity/User';
import {State} from '../entity/State';
import {Task} from '../entity/Task';
import {Route} from '../entity/Route';

@Injectable()
export class OrmService {
  connection: Connection;

  constructor() {
  }

  async getConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }
    const sqliteAvailable = checkAvailability(SQLite.getPluginRef(), null, SQLite.getPluginName()) === true;
    const sqliteOptions: CordovaConnectionOptions = {
      type: 'cordova',
      location: 'default',
      database: 'mcm_db.sqlite3'
    };
    const websqlOptions: WebSqlConnectionOptions = {
      type: 'websql',
      version: '1.0',
      description: 'MCM DB',
      size: 2 * 1024 * 1024,
      database: 'mcm'
    };
    const options: BaseConnectionOptions = sqliteAvailable ? sqliteOptions : websqlOptions;
    options.logging = ['error', 'query', 'schema'];
    options.logger = 'simple-console';
    options.synchronize = false;
    options.entities = [
      User,
      Route,
      State,
      Task
    ];
    options.migrations = true;
    options.migrations = [
      InitialMigration1513274191111
    ];
    return this.connection = await createConnection(options);
  }
}
