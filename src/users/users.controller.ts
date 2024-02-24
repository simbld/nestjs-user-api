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
import { User } from "./user/user.entity";

@Controller("users")
export class UsersController {
  constructor(private service: UsersService) {}

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.service.getUser(+id);
  }

  @Get()
  getAllUsers() {
    return this.service.getUsers();
  }

  @Post()
  createUser(@Body() user: User) {
    return this.service.saveUser(user);
  }

  @Put(":id")
  updateUser(@Param("id") id: string, @Body() user: User) {
    user.id = +id;
    return this.service.saveUser(user);
  }

  @Delete(":id")
  deleteUser(@Param() params) {
    this.service.deleteUser(params.id);
    return;
  }
}
