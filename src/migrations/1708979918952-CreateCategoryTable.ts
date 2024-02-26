import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1708979918952 implements MigrationInterface {
  name = "CreateCategoryTable1708979918952";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD \`categoryId\` int NULL`
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`categoryId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_12824e4598ee46a0992d99ba553\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_4dd13cf5536c5ec906dba37cbef\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_4dd13cf5536c5ec906dba37cbef\``
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_12824e4598ee46a0992d99ba553\``
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`categoryId\``);
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP COLUMN \`categoryId\``
    );
  }
}
