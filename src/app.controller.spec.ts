import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthGuard } from "@nestjs/passport";
describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    })
      .overrideGuard(AuthGuard("jwt"))
      .useValue({ canActivate: () => true })
      .compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      jest.spyOn(appService, "getHello").mockReturnValue("Hello World!");

      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
