import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1708872812277 implements MigrationInterface {
  name = "CreateCategoryTable1708872812277";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE `category`");
  }
}
