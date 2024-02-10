import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity/user.entity";

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
      select: ["firstname", "lastname", "email"],
      where: [{ id: id }]
    });
  }

  async createUser(userData: User): Promise<User> {
    const newUser = this.usersRepository.create(userData); // Crée un nouvel utilisateur avec les données fournies
    await this.usersRepository.save(newUser); // Enregistre le nouvel utilisateur dans la base de données
    return newUser; // Retourne l'utilisateur créé
  }

  saveUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  deleteUser(user: User): void {
    this.usersRepository.delete(user);
  }
}
