import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubtasks16010330860000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_task ADD COLUMN task_id INTEGER");
        } catch (e) {
            console.log("column 'task_id' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
