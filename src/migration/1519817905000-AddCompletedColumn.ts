import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCompletedColumn1519817905000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query("ALTER TABLE mcm_route ADD COLUMN completed INTEGER(1)");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
