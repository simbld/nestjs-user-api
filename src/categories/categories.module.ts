import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { Category } from "./category/category.entity";
import { Article } from "../articles/article/article.entity";
import { UtilsService } from "../../shared/utils.service";

@Module({
  imports: [TypeOrmModule.forFeature([Category, Article])],
  providers: [CategoriesService, UtilsService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
