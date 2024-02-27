import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Article } from "../articles/article/article.entity";
import { Category } from "./category/category.entity";
import { UtilsService } from "../../shared/utils.service";
import { mockArticleRepository } from "../articles/article/article.entity.spec"; // Import the missing mockArticleRepository

export const mockCategoryRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn()
};

describe("CategoriesService", () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository
        },
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticleRepository
        },
        UtilsService // Assure-toi que UtilsService est soit fourni directement, soit également simulé si nécessaire
      ]
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
