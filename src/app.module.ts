import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { databaseConfig } from "./config/database.config";
import { AuthModule } from "./auth/auth.module";
import { ArticlesService } from "./articles/articles.service";
import { ArticlesController } from "./articles/articles.controller";
import { ArticlesModule } from "./articles/articles.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => databaseConfig
    }),
    AuthModule,
    ArticlesModule
  ],
  controllers: [AppController, ArticlesController],
  providers: [AppService, ArticlesService]
})
export class AppModule {}
