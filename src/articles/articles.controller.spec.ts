import { Test, TestingModule } from "@nestjs/testing";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { Article } from "./article/article.entity";
import { Category } from "../categories/category/category.entity";
import { User } from "../users/user/user.entity";
import { jest } from "@jest/globals";

describe("ArticlesController", () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("find all articles", () => {
    beforeEach(async () => {
      jest.spyOn(service, "findAll").mockResolvedValue([
        /* array of article objects */
      ]);
    });

    it("should return an array of articles", async () => {
      const result: Article[] = [
        {
          id: 1,
          title: "Article 1",
          publishedAt: new Date(),
          content: "",
          status: "draft",
          author: {
            id: 0,
            createdAt: undefined,
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            status: "offline",
            articles: [],
            name: "",
            category: new Category()
          },
          category: new Category()
        }
      ];
      jest.spyOn(service, "findAll").mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  it("should return an array of articles", async () => {
    const result = await controller.findAll();
    expect(result).toBeDefined();
  });

  describe("create a new article", () => {
    beforeEach(async () => {
      jest
        .spyOn(service, "createArticle")
        .mockImplementation(async () => new Article());
      /* array of article objects */
    });

    it("should create a new article", async () => {
      const articleData = { title: "New Article" };
      const createdArticle = new Article();
      Object.assign(createdArticle, {
        id: 1,
        ...articleData,
        publishedAt: new Date(),
        content: "",
        status: "draft",
        author: new User(),
        category: new Category()
      });
      jest.spyOn(service, "createArticle").mockImplementation(async () => {
        return Promise.resolve(createdArticle);
      });

      expect(await controller.create(articleData)).toBe(createdArticle);
    });
  });

  it("should create a new article", async () => {
    const result = await controller.create({});
    expect(result).toBeDefined();
  });

  describe("find article with the given id", () => {
    beforeEach(async () => {
      jest.spyOn(service, "findOne").mockResolvedValue({
        id: 1,
        title: "Article 1",
        publishedAt: new Date(),
        content: "",
        status: "draft",
        author: {
          id: 0,
          createdAt: undefined,
          email: "",
          password: "",
          firstname: "",
          lastname: "",
          status: "offline",
          articles: [],
          name: "",
          category: new Category()
        },
        category: new Category()
      });
    });

    it("should return the article with the given id", async () => {
      const articleId: string = "1";
      const result: Article = {
        id: parseInt(articleId),
        title: "Article 1",
        publishedAt: new Date(),
        content: "",
        status: "draft",
        author: {
          id: 0,
          createdAt: undefined,
          email: "",
          password: "",
          firstname: "",
          lastname: "",
          status: "offline",
          articles: [],
          name: "",
          category: new Category()
        },
        category: new Category()
      };
      jest.spyOn(service, "findOne").mockResolvedValue(result);

      expect(await controller.findOne(articleId)).toBe(result);
    });
  });

  describe("update an article", () => {
    beforeEach(async () => {
      jest
        .spyOn(service, "updateArticle")
        .mockImplementation(async (id, articleData) => ({
          id: parseInt(id),
          title: articleData.title,
          publishedAt: new Date(),
          content: "",
          status: "draft",
          author: new User(),
          category: new Category()
        }));

      it("should update the article with the given id", async () => {
        const articleId: string = "1";
        const articleData = { title: "Updated Article" };
        const updatedArticle: Article = {
          id: parseInt(articleId),
          ...articleData,
          publishedAt: new Date(),
          content: "",
          status: "draft",
          author: new User(),
          category: new Category()
        };
        jest
          .spyOn(service, "updateArticle" as keyof ArticlesService)
          .mockResolvedValue(updatedArticle[1]);

        expect(await controller.update(articleId, articleData)).toBe(
          updatedArticle
        );
      });
    });

    it("should update an article", async () => {
      const result = await controller.update("testId", {});
      expect(result).toBeDefined();
    });

    describe("delete an article", () => {
      beforeEach(async () => {
        jest
          .spyOn(service, "deleteArticle")
          .mockImplementation(async () => undefined);
      });

      it("should delete the article with the given id", async () => {
        const articleId: string = "1";
        jest.spyOn(service, "deleteArticle").mockResolvedValue(undefined);

        expect(await controller.delete(articleId)).toBe(undefined);
      });
    });

    it("should delete an article", async () => {
      const result = await controller.delete("testId");
      expect(result).toBeUndefined();
    });
  });
});
