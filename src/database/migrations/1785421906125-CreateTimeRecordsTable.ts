import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTimeRecordsTable1785421906125 implements MigrationInterface {
  name = 'CreateTimeRecordsTable1785421906125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "time_records" ("id" bigint NOT NULL IDENTITY(1,1), "user_id" bigint NOT NULL, "type" varchar(30) NOT NULL, "recorded_at" datetime2 NOT NULL, "source" varchar(20) NOT NULL CONSTRAINT "DF_dbc47be553aea40b943b13cb284" DEFAULT 'WEB', "notes" varchar(500), "created_at" datetime2 NOT NULL CONSTRAINT "DF_de96be567c07d8acd9daf4eeba7" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_80da37342d4d8a132f0d9909aef" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "PK_0d2985ead4ba3604143eee43f90" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE INDEX "IX_time_records_user_id_recorded_at" ON "time_records" ("user_id", "recorded_at")`,
    );

    await queryRunner.query(
      `ALTER TABLE "time_records" ADD CONSTRAINT "FK_0149b95adf0ce34734ed1e11e93" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "time_records" DROP CONSTRAINT "FK_0149b95adf0ce34734ed1e11e93"`,
    );

    await queryRunner.query(
      `DROP INDEX "IX_time_records_user_id_recorded_at" ON "time_records"`,
    );

    await queryRunner.query(`DROP TABLE "time_records"`);
  }
}
