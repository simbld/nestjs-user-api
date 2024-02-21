import { Test, TestingModule } from "@nestjs/testing";
import { ArticlesService } from "./articles.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Article } from "./article.entity";
import { Repository } from "typeorm";

describe("ArticlesService", () => {
  let service: ArticlesService;
  let mockRepository: MockType<Repository<Article>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        // Fournit un mock pour le repository d'Article
        {
          provide: getRepositoryToken(Article),
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    mockRepository = module.get(getRepositoryToken(Article));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // Ajoute d'autres tests selon les méthodes de ton ArticlesService
});

// Factory pour créer un mock de repository
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity)
  // Ajoute d'autres méthodes nécessaires pour tes tests
}));

// Type pour aider avec le typage du mock
type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
