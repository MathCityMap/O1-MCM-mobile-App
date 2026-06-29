import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForceSubtaskAndArLink16552845000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_rel_route_task ADD COLUMN force_support_tasks INTEGER(1) ");
            await queryRunner.query("ALTER TABLE mcm_task ADD COLUMN ar_link VARCHAR ");
        } catch (e) {
            console.log("columns 'force_support_tasks' and 'ar_link' already exist");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
