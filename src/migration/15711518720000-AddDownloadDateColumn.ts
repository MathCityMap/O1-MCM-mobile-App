import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDownloadDateColumn15711518720000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN downloadedDate VARCHAR(50)");
        } catch (e) {
            console.log("column 'lang_code' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}