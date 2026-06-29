import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompletedDateColumn15713974540000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN completedDate VARCHAR(50)");
        } catch (e) {
            console.log("column 'lang_code' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}