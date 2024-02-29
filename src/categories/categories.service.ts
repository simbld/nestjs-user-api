import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category/category.entity";
import { UtilsService } from "../../shared/utils.service";
import { Article } from "../articles/article/article.entity";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private utilsService: UtilsService
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ id: +id });
  }

  async createCategory(categoryData: any): Promise<Category> {
    const newCategory = this.categoryRepository.create(categoryData);
    await this.categoryRepository.save(newCategory);
    return newCategory as any as Category;
  }

  async updateCategory(id: string, categoryData: any): Promise<Category> {
    let category = await this.categoryRepository.findOneBy({ id: +id });
    if (!category) {
      throw new Error("Category not found 🤷");
    }
    category = this.categoryRepository.merge(category, categoryData);
    return this.categoryRepository.save(category);
  }

  async getArticlesByCategoryName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { name },
      relations: ["articles"]
    });
  }

  async deleteCategory(id: string): Promise<void> {
    const deleteResponse = await this.categoryRepository.delete(id);
    if (deleteResponse.affected === 0) {
      throw new Error("Category not found 🤷");
    }
  }

  async createArticle(id: string, articleData: any) {
    const category = await this.categoryRepository.findOneBy({ id: +id });
    if (!category) {
      throw new Error("Category not found 🤷");
    }
    const newArticle: Article = this.utilsService.createInstance(
      Article,
      articleData
    );
    newArticle.category = category;
    await this.articleRepository.save(newArticle);
    return newArticle;
  }
}
