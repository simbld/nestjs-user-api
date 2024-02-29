import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "./article/article.entity";
import { Repository } from "typeorm";
import { UtilsService } from "../../shared/utils.service";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private utilsService: UtilsService
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async findOne(id: string): Promise<Article> {
    return this.articleRepository.findOneBy({ id: +id });
  }

  async createArticle(articleData: any): Promise<Article> {
    const newArticle = this.articleRepository.create(articleData);
    await this.articleRepository.save(newArticle);
    return newArticle as any as Article;
  }

  async updateArticle(id: string, articleData: any): Promise<Article> {
    let article = await this.articleRepository.findOneBy({ id: +id });
    if (!article) {
      throw new Error("Article not found 🤷");
    }
    article = this.articleRepository.merge(article, articleData);
    return this.articleRepository.save(article);
  }

  async deleteArticle(id: string): Promise<void> {
    const deleteResponse = await this.articleRepository.delete(id);
    if (deleteResponse.affected === 0) {
      throw new Error("Article not found 🤷");
    }
  }
}
