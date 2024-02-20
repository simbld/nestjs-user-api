import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService, TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
