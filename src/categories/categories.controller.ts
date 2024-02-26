import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() categoryData: any) {
    return this.categoriesService.createCategory(categoryData);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(":id")
  update(@Param("id") id: string, @Body() categoryData: any) {
    return this.categoriesService.updateCategory(id, categoryData);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":name/articles")
  getArticlesByCategoryName(@Param("name") name: string) {
    return this.categoriesService.getArticlesByCategoryName(name);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":id/articles")
  createArticle(@Param("id") id: string, @Body() articleData: any) {
    return this.categoriesService.createArticle(id, articleData);
  }
}
