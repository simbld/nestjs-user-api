import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { HashPasswordService } from "../../shared/hash-password.service";

@Module({
  imports: [UsersModule, JwtModule.register({ secret: jwtConstants.secret })],
  providers: [AuthService, UsersService, JwtStrategy, HashPasswordService],
  controllers: [AuthController]
})
export class AuthModule {}
