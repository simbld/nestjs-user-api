import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UtilsService } from "../../shared/utils.service";
import { Article } from "./article/article.entity";
import { ArticlesService } from "./articles.service";

export const mockArticleRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
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
        Article,
        UtilsService,
        {
          provide: UtilsService,
          useValue: mockUtilsService
        },
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticleRepository
        }
      ]
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
