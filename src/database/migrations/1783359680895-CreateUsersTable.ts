import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1783359680895 implements MigrationInterface {
  name = 'CreateUsersTable1783359680895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" bigint NOT NULL IDENTITY(1,1), "name" varchar(120) NOT NULL, "email" varchar(180) NOT NULL, "password_hash" varchar(255) NOT NULL, "role" varchar(30) NOT NULL CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'EMPLOYEE', "active" bit NOT NULL CONSTRAINT "DF_0890d8ebe90990c78fe4804231b" DEFAULT 1, "created_at" datetime2 NOT NULL CONSTRAINT "DF_c9b5b525a96ddc2c5647d7f7fa5" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_6d596d799f9cb9dac6f7bf7c23c" DEFAULT getdate(), "deleted_at" datetime2, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
