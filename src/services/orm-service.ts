import {Injectable} from "@angular/core";
import {checkAvailability} from "@ionic-native/core";
import {SQLite} from '@ionic-native/sqlite'
import {createConnection, Connection} from "typeorm";

import {InitialMigration1513274191111} from '../migration/1513274191111-InitialMigration';
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
    const entities = [
      User,
      Route,
      State,
      Task
    ];
    const migrations = [
      InitialMigration1513274191111
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
}
