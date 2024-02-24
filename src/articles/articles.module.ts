import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "./article/article.entity";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { UtilsService } from "../../shared/utils.service";

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService, UtilsService]
})
export class ArticlesModule {}
