import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user/user.entity";
import { HashPasswordService } from "../../shared/hash-password.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private hashPasswordService: HashPasswordService
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

  async saveUser(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async updateUser(id: number, userUpdates: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (userUpdates.password) {
      userUpdates.password = await this.hashPasswordService.hash(
        userUpdates.password
      );
    }
    const updatedUser = this.usersRepository.merge(user, userUpdates);
    return this.usersRepository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
