import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() articleData: any) {
    return this.articlesService.createArticle(articleData);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.articlesService.findOne(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(":id")
  update(@Param("id") id: string, @Body() articleData: any) {
    return this.articlesService.updateArticle(id, articleData);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.articlesService.deleteArticle(id);
  }
}
