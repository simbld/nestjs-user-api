import { Test, TestingModule } from "@nestjs/testing";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";

describe("ArticlesController", () => {
  let controller: ArticlesController;

  // Mock of ArticlesService
  const mockArticlesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      // Provide the ArticlesService mock here
      providers: [
        {
          provide: ArticlesService,
          useValue: mockArticlesService
        }
      ]
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  // Add other tests here to test specific controller operation
});
