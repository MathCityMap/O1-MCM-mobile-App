import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroupsFinished17071440460000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_score ADD COLUMN groups_finished VARCHAR(50)");
        } catch (e) {
            console.log("column 'groups_finished' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
