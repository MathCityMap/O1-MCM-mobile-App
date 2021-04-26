import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPositionField16194302450000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        try {
            await queryRunner.query("ALTER TABLE mcm_task ADD COLUMN position INTEGER");
        } catch (e) {
            console.log("column 'position' already exists");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
