import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVisibleColumn1526306624000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_task ADD COLUMN `visible` INTEGER(1) NOT NULL DEFAULT 1");
        } catch (e) {
            console.log("column 'visible' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}