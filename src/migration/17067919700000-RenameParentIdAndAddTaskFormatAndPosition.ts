import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameParentIdAndAddTaskFormatAndPosition17067919700000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_task RENAME COLUMN task_id to parent_task_id");
            await queryRunner.query("ALTER TABLE mcm_task ADD COLUMN task_format VARCHAR ");
            await queryRunner.query("ALTER TABLE mcm_task ADD COLUMN position_in_parent INTEGER ");
        } catch (e) {
            console.log("columns 'parent_task_id', 'task_format' and 'position_in_parent' already exist");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
