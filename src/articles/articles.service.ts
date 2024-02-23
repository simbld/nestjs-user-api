import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "./article.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async findOne(id: string): Promise<Article> {
    return this.articleRepository.findOneBy({ id: +id });
  }

  async createArticle(articleData: any) {
    const newArticle = this.articleRepository.create(articleData);
    await this.articleRepository.save(newArticle);
    return newArticle;
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
    if (deleteResponse.affected !== 0) {
      throw new Error("Article not found 🤷");
    } else {
      message: "Article deleted successfully !";
    }
  }
}
