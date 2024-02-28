import { DataSourceOptions } from "typeorm";
import "dotenv/config";

export const databaseConfig: DataSourceOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: process.env.TYPEORM_SYNC === "true" || false,
  logging: ["query", "error"]
};
