import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { HashPasswordService } from "../../shared/hash-password.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
  providers: [UsersService, HashPasswordService],
  controllers: [UsersController]
})
export class UsersModule {}
