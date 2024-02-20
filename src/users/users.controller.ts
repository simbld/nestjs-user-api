import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "../users/user.entity";

@Controller("users")
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(":id")
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.saveUser(user);
  }

  @Put()
  update(@Body() user: User) {
    return this.service.saveUser(user);
  }

  @Delete(":id")
  deleteUser(@Param() params) {
    this.service.deleteUser(params.id);
    return;
  }
}
