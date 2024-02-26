import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "../../articles/article/article.entity";
import { User } from "../../users/user/user.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];

  @OneToMany(() => User, (user) => user.category)
  author: User[];
}
