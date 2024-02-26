import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { User } from "../users/user/user.entity";
import { HashPasswordService } from "../../shared/hash-password.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashPasswordService: HashPasswordService
  ) {}

  /**
   * Validate the user in parameter
   */

  async validate(email: string): Promise<User> {
    return await this.usersService.getUserByEmail(email);
  }

  /**
   * Try to login the user in parameter.
   * Return an access token if login is successfull otherwise return
   * a 404 status
   * @param user
   */

  async login(user: User): Promise<any | { status: number }> {
    const userData = await this.validate(user.email);
    // user not found
    if (!userData) {
      return { status: 404, message: "User not found" };
    }

    // Check hashed password (crypto.createHmac dans Node.js est asynchrone par nature)
    const hashedPassword = this.hashPasswordService.hash(user.password);
    if (userData.password !== hashedPassword) {
      return { status: 404, message: "Invalid password" };
    }
    // User found and password is valid, create the access token
    const payload = { email: userData.email, sub: userData.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      expires_in: 3600,
      access_token: accessToken
    };
  }
  async register(user: User): Promise<User> {
    user.password = this.hashPasswordService.hash(user.password);
    return this.usersService.saveUser(user);
  }
}
