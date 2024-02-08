import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 80 })
  firstname: string;

  @Column({ length: 80 })
  lastname: string;
}
