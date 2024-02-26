import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category/category.entity";
import { UtilsService } from "../../shared/utils.service";
import { CategoriesController } from "./categories.controller";
import { ArticlesController } from "../articles/articles.controller";
import { ArticlesService } from "../articles/articles.service";
import { Article } from "../articles/article/article.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Article])],
  controllers: [CategoriesController, ArticlesController],
  providers: [CategoriesService, ArticlesService, UtilsService]
})
export class CategoriesModule {}
