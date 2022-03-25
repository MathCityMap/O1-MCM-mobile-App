import {MigrationInterface, QueryRunner} from "typeorm";

export class FailedTaskMigration1515428187000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE mcm_score ADD tasks_failed TEXT");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
  }

}
