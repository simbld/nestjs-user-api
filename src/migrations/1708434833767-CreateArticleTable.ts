import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateArticleTable1708434833767 implements MigrationInterface {
  name = "CreateArticleTable1708434833767";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`publishedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`status\` enum ('draft', 'published') NOT NULL DEFAULT 'draft', \`authorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`status\` enum ('offline', 'online', 'busy', 'away') NOT NULL DEFAULT 'offline'`
    );
    await queryRunner.query(
      `ALTER TABLE \`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`status\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`DROP TABLE \`article\``);
  }
}
