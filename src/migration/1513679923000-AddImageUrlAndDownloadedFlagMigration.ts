import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageUrlAndDownloadedFlagMigration1513679923000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN image_url TEXT");
    await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN downloaded INTEGER(1)");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
