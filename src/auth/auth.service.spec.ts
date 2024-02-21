import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service"; // Ajuste le chemin selon ta structure
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {} // Fournis ici un mock de UsersService
        },
        {
          provide: JwtService,
          useValue: {} // Fournis ici un mock de JwtService
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // Ajoute ici d'autres tests spécifiques à AuthService
});
