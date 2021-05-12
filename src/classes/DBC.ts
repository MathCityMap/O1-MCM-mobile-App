
import * as Collections from 'typescript-collections'
import { DBC_Plan } from './DBC_Plan'

export abstract class DBC {
    static readonly DATABASE_NAME: string = "mcm_app"
    static readonly DATABASE_VERSION: number = 32

    // // Table names (For table definitions look at the corresponding classes DBC_tablename)
    static readonly DATABASE_TABLE_STATE: string = "mcm_state"
    static readonly DATABASE_TABLE_TASK: string = "mcm_task"
    static readonly DATABASE_TABLE_TASKMETA: string = "mcm_task_meta"
    static readonly DATABASE_TABLE_ROUTE: string = "mcm_route"
    static readonly DATABASE_TABLE_ROUTEMETA: string = "mcm_route_meta"
    static readonly DATABASE_TABLE_REL_ROUTE_TASK: string = "mcm_rel_route_task"
    static readonly DATABASE_TABLE_USERS: string = "mcm_users"
    static readonly DATABASE_TABLE_SCORE: string = "mcm_score"


    // // Option Names for STATE DB
    static readonly ON_ROUTE_DATA: string = "route_id_data_dl"
    static readonly ON_ROUTE_DONE: string = "route_id_done"
    static readonly ON_ROUTE_PRIVATE_ACCESS: string = "route_id_private_access"
    static readonly ON_TASK_HINT1_TAKEN: string = "task_id_hint1_taken"
    static readonly ON_TASK_HINT2_TAKEN: string = "task_id_hint2_taken"
    static readonly ON_TASK_HINT3_TAKEN: string = "task_id_hint3_taken"
    static readonly ON_TASK_SOLVED: string = "task_id_solved"
    static readonly ON_TASK_SOLVED_LOW: string = "task_id_solved_low"
    static readonly ON_ACTIVE_USER: string = "active_user"
    static readonly ON_GAMIFICATION: string = "gamification"

    // /* TABLE DEFINITIONS */
    // // DB_STATE
    static readonly DB_STATE: DBC_Plan = new DBC_Plan(
        DBC.DATABASE_TABLE_STATE,
        [
            "_id",
            "option",
            "value",
            "timestamp"
        ],
        [
            "INTEGER",
            "VARCHAR",
            "VARCHAR",
            "TIMESTAMP"
        ],
        [
            "PRIMARY KEY AUTOINCREMENT",
            "(64) NOT NULL",
            "(256) NOT NULL",
            "NOT NULL DEFAULT CURRENT_TIMESTAMP"
        ]
    )

    // //DB_TASK
    static readonly DB_TASK: DBC_Plan = new DBC_Plan(
        DBC.DATABASE_TABLE_TASK,
        [
            "_id",
            "user_id",
            "public",
            "lat",
            "lon",
            "title",
            "description",
            "image",
            "solution_type",
            "solution",
            "hint1",
            "hint2",
            "hint3",
            "assistive_equipment",
            "author",
            "mail",
            "grade",
            "tags",
            "timestamp",
            "solutionsample",
            "attr",
            "create_date",
            "lang_code",
            "visible",
            "task_id",
            "position"
        ],
        [
            "INTEGER",
            "INTEGER",
            "VARCHAR",
            "VARCHAR",
            "VARCHAR",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "VARCHAR",
            "TEXT",
            "TIMESTAMP",
            "TEXT",
            "TEXT",
            "TIMESTAMP",
            "VARCHAR",
            "INTEGER",
            "INTEGER",
            "INTEGER"
        ],
        [
            "PRIMARY KEY AUTOINCREMENT",
            "NOT NULL",
            "(1) NOT NULL",
            "(64) NOT NULL",
            "(64) NOT NULL",
            "NOT NULL",
            "NOT NULL",
            "",
            "NOT NULL",
            "NOT NULL",
            "",
            "",
            "",
            "",
            "",
            "",
            "(2) NOT NULL DEFAULT '13'",
            "",
            "NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "NOT NULL",
            "",
            "NOT NULL",
            "(2)",
            "(1) NOT NULL DEFAULT 1",
            "",
            ""
        ]
    )

    // DB_ROUTE
    static readonly DB_ROUTE: DBC_Plan = new DBC_Plan(
        DBC.DATABASE_TABLE_ROUTE,
        [
            "_id",
            "user_id",
            "public",
            "title",
            "country_code",
            "city",
            "image",
            "code",
            "grade",
            "tags",
            "duration",
            "length",
            "bounding_box",
            "center",
            "timestamp",
            "description",
            "create_date",
            "attr",
            "lang_code",
            "map_version",
            "map_filename",
            "map_date",
            "path_geojson",
            "path_info"
        ],
        [
            "INTEGER",
            "INTEGER",
            "VARCHAR",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "VARCHAR",
            "TEXT",
            "VARCHAR",
            "VARCHAR",
            "VARCHAR",
            "TEXT",
            "TEXT",
            "TIMESTAMP",
            "TEXT",
            "TIMESTAMP",
            "TEXT",
            "VARCHAR",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT",
            "TEXT"
        ],
        [
            "PRIMARY KEY AUTOINCREMENT",
            "NOT NULL",
            "(1) NOT NULL",
            "NOT NULL",
            "NOT NULL",
            "NOT NULL",
            "",
            "(64)",
            "(64)",
            "",
            "(64)",
            "(64)",
            "",
            "",
            "NOT NULL DEFAULT CURRENT_TIMESTAMP",
            "",
            "NOT NULL",
            "",
            "(2)",
            "",
            "",
            "",
            "",
            ""
        ]
    )

    // // DB_RELROUTETASK
    static readonly DB_RELROUTETASK: DBC_Plan = new DBC_Plan(
        DBC.DATABASE_TABLE_REL_ROUTE_TASK,
        [
            "_id",
            "route_id",
            "task_id",
            "timestamp"
        ],
        [
            "INTEGER",
            "INTEGER",
            "INTEGER",
            "TIMESTAMP"
        ],
        [
            "PRIMARY KEY AUTOINCREMENT",
            "(64) NOT NULL",
            "(64) NOT NULL",
            "NOT NULL DEFAULT CURRENT_TIMESTAMP"
        ]
    )

    // // DB_USERS
    static readonly DB_USERS: DBC_Plan = new DBC_Plan(
        DBC.DATABASE_TABLE_USERS,
        [
            "_id",
            "name",
            "create_date"
        ],
        [
            "INTEGER",
            "VARCHAR",
            "TIMESTAMP"
        ],
        [
            "PRIMARY KEY AUTOINCREMENT",
            "(32) NOT NULL",
            "NOT NULL DEFAULT CURRENT_TIMESTAMP"
        ]
    )

    // // DB_SCORE
    static readonly DB_SCORE: DBC_Plan = new DBC_Plan(
        DBC.DATABASE_TABLE_SCORE,
        [
            "_id",
            "user_id",
            "route_id",
            "score",
            "tasks_solved",
            "tasks_solved_low",
            "task_details",
            "time",
            "distance"
        ],
        [
            "INTEGER",
            "INTEGER",
            "INTEGER",
            "INTEGER",
            "TEXT",
            "TEXT",
            "TEXT",
            "INTEGER",
            "INTEGER",
        ],
        [
            "PRIMARY KEY AUTOINCREMENT",
            "(64) NOT NULL",
            "(64) NOT NULL",
            "(64) NOT NULL",
            "",
            "",
            "",
            "(64)",
            "(64)"
        ]
    )

    /*
    DB MAP: Tablename -> DB Instance
     */
    static MAP_DB: Collections.Dictionary<string, DBC_Plan> = null

    static initialize() {
        if (DBC.MAP_DB === null) {
            DBC.MAP_DB = new Collections.Dictionary<string, DBC_Plan>()
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_REL_ROUTE_TASK, DBC.DB_RELROUTETASK)
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_ROUTE, DBC.DB_ROUTE)
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_STATE, DBC.DB_STATE)
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_TASK, DBC.DB_TASK)
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_USERS, DBC.DB_USERS)
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_SCORE, DBC.DB_SCORE)
        }
    }
}
DBC.initialize()
