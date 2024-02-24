import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/user/user.entity";
import { HashPasswordService } from "../../shared/hash-password.service";

describe("AuthService", () => {
  let service: AuthService;
  let testModule: TestingModule;
  const mockUsersService = { getUserByEmail: jest.fn(), saveUser: jest.fn() };
  const mockJwtService = { sign: jest.fn() };
  const mockHashPasswordService = { hash: jest.fn() };
  beforeEach(async () => {
    testModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: HashPasswordService, useValue: mockHashPasswordService }
      ]
    }).compile();

    service = testModule.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("login", () => {
    it("should return a JWT when given a valid user", async () => {
      const user: User = {
        id: 1,
        createdAt: new Date(),
        firstname: "John",
        lastname: "Doe",
        email: "test@example.com",
        password: "password",
        status: "offline",
        articles: [],
        name: ""
      };

      mockUsersService.getUserByEmail.mockImplementation((email) => {
        console.log(`getUserByEmail called with ${email}`);
        return Promise.resolve(user);
      });

      console.log("Calling login");
      const result = await service.login(user); // Pass the instance as the argument
      console.log("Login called");

      // ...
    });
  });
});