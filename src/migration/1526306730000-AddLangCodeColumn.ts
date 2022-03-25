import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLangCodeColumn1526306730000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN lang_code VARCHAR(2)");
        } catch (e) {
            console.log("column 'lang_code' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}