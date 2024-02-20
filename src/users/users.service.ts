import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(id: number): Promise<User[]> {
    return await this.usersRepository.find({
      // Properties to return. We don't want the password property.
      select: ["firstname", "lastname", "email"],
      where: [{ id: id }]
    });
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
