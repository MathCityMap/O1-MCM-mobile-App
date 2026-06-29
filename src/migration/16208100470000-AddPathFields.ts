import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPathFields16208100470000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN path_geojson TEXT");
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN path_info TEXT");
        } catch (e) {
            console.log("columns 'path_geojson' and 'path_info' already exist");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
