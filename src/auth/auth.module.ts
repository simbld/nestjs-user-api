import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [UsersModule, JwtModule.register({ secret: jwtConstants.secret })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
