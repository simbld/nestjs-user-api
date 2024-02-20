import { Article } from "src/articles/article.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 80 })
  firstname: string;

  @Column({ length: 80 })
  lastname: string;

  @Column({
    type: "enum",
    enum: ["offline", "online", "busy", "away"],
    default: "offline"
  })
  status: "offline" | "online" | "busy" | "away";

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
