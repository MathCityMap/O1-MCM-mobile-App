import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1513274191111 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_state (_id INTEGER PRIMARY KEY AUTOINCREMENT,option VARCHAR (64) NOT NULL,value VARCHAR (256) NOT NULL,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
    await queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_task (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,public VARCHAR (1) NOT NULL,lat VARCHAR (64) NOT NULL,lon VARCHAR (64) NOT NULL,title TEXT NOT NULL,description TEXT NOT NULL,image TEXT ,solution_type TEXT NOT NULL,solution TEXT NOT NULL,hint1 TEXT ,hint2 TEXT ,hint3 TEXT ,assistive_equipment TEXT ,author TEXT ,mail TEXT ,grade VARCHAR (2) NOT NULL DEFAULT '13',tags TEXT ,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,solutionsample TEXT NOT NULL,attr TEXT ,create_date TIMESTAMP NOT NULL,lang_code VARCHAR (2))");
    await queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_route (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,public VARCHAR (1) NOT NULL,title TEXT NOT NULL,country_code TEXT NOT NULL,city TEXT NOT NULL,image TEXT ,code VARCHAR (64),grade TEXT (64),tags VARCHAR ,duration VARCHAR (64),length VARCHAR (64),bounding_box TEXT ,center TEXT ,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,description TEXT ,create_date TIMESTAMP NOT NULL,attr TEXT TEXT)");
    await queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_rel_route_task (_id INTEGER PRIMARY KEY AUTOINCREMENT,route_id INTEGER (64) NOT NULL,task_id INTEGER (64) NOT NULL,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
    await queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_users (_id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR (32) NOT NULL,create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
    await queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_score (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER (64) NOT NULL,route_id INTEGER (64) NOT NULL,score INTEGER (64) NOT NULL,tasks_solved TEXT ,tasks_solved_low TEXT ,task_details TEXT ,time INTEGER (64),distance INTEGER (64))");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
