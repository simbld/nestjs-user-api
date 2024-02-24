import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { HashPasswordService } from "../../shared/hash-password.service";
import { AuthService } from "../auth/auth.service";
import { User } from "../users/user/user.entity";

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            getUserByEmail: jest.fn().mockImplementation((email) => {
              if (email === "existinguser@example.com") {
                return Promise.resolve({
                  id: 1,
                  email,
                  password: "hashedPassword" // Suppose this is the hashed password
                });
              }
              return null;
            })
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue("mockedJwtToken")
          }
        },
        {
          provide: HashPasswordService,
          useValue: {
            hash: jest.fn().mockReturnValue("hashedPassword") // Ensure this matches the mocked password above
          }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  it("should return a token for valid login", async () => {
    const user: User = {
      email: "existinguser@example.com",
      password: "correctPassword",
      createdAt: new Date(),
      firstname: "Firstname",
      lastname: "Lastname",
      id: 0,
      status: "offline",
      articles: [],
      name: ""
    };
    const result = await authService.login(user);
    expect(result).toEqual({
      expires_in: 3600,
      access_token: "mockedJwtToken"
    });
  });

  it("should return status 404 for invalid login", async () => {
    const user: User = {
      email: "nonexisting@example.com",
      password: "wrongPassword",
      id: 0,
      createdAt: undefined,
      firstname: "",
      lastname: "",
      status: "offline",
      articles: [],
      name: ""
    };
    const result = await authService.login(user);
    expect(result).toEqual({ status: 404, message: "User not found" });
  });
});
