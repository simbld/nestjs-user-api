import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User | null> {
    return await this.usersRepository
      .createQueryBuilder("user")
      .select(["user.firstname", "user.lastname", "user.email"])
      .where("user.id = :id", { id })
      .getOne();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ email: email });
    return user;
  }

  saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  deleteUser(user: User): void {
    this.usersRepository.delete(user);
  }
}
