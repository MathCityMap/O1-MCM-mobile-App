import { MigrationInterface, QueryRunner } from "typeorm";

export class AddZoom16225449820000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN min_zoom INTEGER ");
        } catch (e) {
            console.log("columns 'min_zoom' already exist");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
