import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { Article } from "./article.entity";
import { ArticlesService } from "../articles.service";
import { UtilsService } from "../../../shared/utils.service";

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
