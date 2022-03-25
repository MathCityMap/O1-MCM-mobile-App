import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('mcm_state')
export class State {
//     await queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_state (_id INTEGER PRIMARY KEY AUTOINCREMENT,option VARCHAR (64) NOT NULL,value VARCHAR (256) NOT NULL,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)");
  @PrimaryGeneratedColumn({name: '_id'})
  id: number;

  @Column({length: 64})
  option: string;

  @Column({length: 256})
  value: string;

  @Column()
  timestamp: string;
}
