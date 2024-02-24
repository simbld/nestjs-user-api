import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { databaseConfig } from "./config/database.config";
import { AuthModule } from "./auth/auth.module";
import { ArticlesModule } from "./articles/articles.module";
import { UsersModule } from "./users/users.module";
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => databaseConfig
    }),
    AuthModule,
    UsersModule,
    ArticlesModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
