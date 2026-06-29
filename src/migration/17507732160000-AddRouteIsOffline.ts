import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRouteIsOffline17507732160000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN is_offline INTEGER DEFAULT 0");
        } catch (e) {
            console.log("column 'is_offline' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
