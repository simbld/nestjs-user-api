import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Article } from "./article.entity";
import { ArticlesService } from "../articles.service";
import { UtilsService } from "../../../shared/utils.service";

describe("Article Entity", () => {
  let articleService: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn()
          }
        },
        {
          provide: UtilsService,
          useValue: {
            handleDeleteResponse: jest.fn(),
            createInstance: jest.fn()
          }
        }
      ]
    }).compile();

    articleService = module.get<ArticlesService>(ArticlesService);
  });

  it("should be defined", () => {
    expect(articleService).toBeDefined();
  });

  it("should create an article", async () => {
    const article = new Article();
    jest.spyOn(articleService, "createArticle").mockResolvedValue(article);

    const createdArticle = await articleService.createArticle({}); // Pass an empty object as the argument

    expect(createdArticle).toEqual(article);
    expect(articleService.createArticle).toHaveBeenCalledWith({});
  });

  it("should find all articles", async () => {
    const articles = [new Article(), new Article()];
    jest.spyOn(articleService, "findAll").mockResolvedValue(articles);

    const foundArticles = await articleService.findAll();

    expect(foundArticles).toEqual(articles);
    expect(articleService.findAll).toHaveBeenCalled();
  });

  it("should find an article by id", async () => {
    const article = new Article();
    jest.spyOn(articleService, "findOne").mockResolvedValue(article as never);

    const foundArticle = await articleService.findOne("1");

    expect(foundArticle).toEqual(article);
    expect(articleService.findOne).toHaveBeenCalledWith("1");
  });

  it("should update an article", async () => {
    const article = new Article();
    jest
      .spyOn(articleService, "updateArticle")
      .mockResolvedValue(article as never);

    const updatedArticle = await articleService.updateArticle("1", {});

    expect(updatedArticle).toEqual(article);
    expect(articleService.updateArticle).toHaveBeenCalledWith("1", {});
  });

  it("should delete an article", async () => {
    jest.spyOn(articleService, "deleteArticle").mockResolvedValue(undefined);

    await articleService.deleteArticle("1");

    expect(articleService.deleteArticle).toHaveBeenCalledWith("1");
  });
});
