import { Category } from "../../categories/category/category.entity";
import { User } from "../../users/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  publishedAt: Date;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({
    type: "enum",
    enum: ["draft", "published"],
    default: "draft"
  })
  status: "draft" | "published";

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: "authorId" })
  author: User;

  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn({ name: "categoryId" })
  category: Category;
}
