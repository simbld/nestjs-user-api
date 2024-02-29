import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ArticlesService } from "./articles.service";
import { Article } from "./article/article.entity";
import { UtilsService } from "../../shared/utils.service";

export const mockArticleRepository = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  save: jest.fn()
};

export const mockUtilsService = {
  handleDeleteResponse: jest.fn(),
  createInstance: jest.fn()
};

describe("ArticlesService", () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticleRepository
        },
        {
          provide: UtilsService,
          useValue: mockUtilsService
        }
      ]
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
