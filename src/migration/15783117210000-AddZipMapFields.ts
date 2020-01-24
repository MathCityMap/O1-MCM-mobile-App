import { MigrationInterface, QueryRunner } from "typeorm";

export class AddZipMapFields15783117210000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN map_version VARCHAR(50)");
        } catch (e) {
            console.log("column 'map_version' already exists");
        }

        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN map_filename VARCHAR(50)");
        } catch (e) {
            console.log("column 'map_filename' already exists");
        }

        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN map_date VARCHAR(50)");
        } catch (e) {
            console.log("column 'map_date' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}