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
    await this.articleRepository.update(id, articleData);
    return this.articleRepository.findOneBy({ id: +id });
  }

  async deleteArticle(id: string) {
    const deleteResponse = await this.articleRepository.delete(id);
    if (deleteResponse.affected === 0) {
      throw new Error("Article not found 🤷");
    }
    return { message: "Article deleted successfully !" };
  }
}
