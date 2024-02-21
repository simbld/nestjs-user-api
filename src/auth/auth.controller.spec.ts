import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            // Ici tu peux mocker les méthodes de AuthService que ton controller utilise
            validateUser: jest.fn(),
            login: jest.fn()
            // etc.
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  // Ici tu peux ajouter d'autres tests spécifiques à tes endpoints
});
