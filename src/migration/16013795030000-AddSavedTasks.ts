import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSavedTasks16013795030000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_score ADD COLUMN tasks_saved VARCHAR(50)");
        } catch (e) {
            console.log("column 'tasks_saved' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
