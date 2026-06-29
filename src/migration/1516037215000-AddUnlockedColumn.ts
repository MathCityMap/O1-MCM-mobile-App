import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUnlockedColumn1516037215000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN unlocked INTEGER(1)");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
