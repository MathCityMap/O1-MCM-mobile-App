import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskCode17026521590000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_task ADD COLUMN code VARCHAR ");
        } catch (e) {
            console.log("column 'code' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
