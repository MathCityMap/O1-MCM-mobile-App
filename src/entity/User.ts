import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('mcm_users')
export class User {

    @PrimaryGeneratedColumn({name: '_id'})
    id: number;

    @Column({length: 32})
    name: string;


    @Column({name: 'create_date'})
    createDate: string;

}
