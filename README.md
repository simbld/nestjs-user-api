<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Quête n°3 - NestJS

A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Initialiser le Projet NestJS

```bash
# nestjs-user-api
$ npm init -y
$ npm i -g @nestjs/cli
$ nest new .
```

## Installer TypeORM et MySQL

- Crée un fichier .env à la racine du projet.
- Ajoute les variables pour la configuration de la base de données.
- Crée le fichier src/config/database.config.ts pour la configuration TypeORM.

## Modifier le AppModule

- Ajoute la configuration de TypeORM dans app.module.ts

## Ajouter Scripts TypeORM dans package.json

- Ajoute les scripts pour gérer les migrations.

```bash
# package.json
$ npm run migration:create (pour créer une nouvelle migration vide)
$ npm run migration:generate (pour génerer une nouvelle migration)
$ npm run migration:up (pour exécuter les migrations non exécutées)
$ npm run migration:down (pour rolllback la dernière migration)
```

## Générer le Module, Service, et Controller

```bash
# nestjs-user-api
$ nest g module users
$ nest g service users
$ nest g controller users
```

## Créer l'Entité User

```bash
# nestjs-user-api
- nest g class users/user.entity
```

```bash
# user.entity.ts
- id: auto-généré
- email: string (50 caractères)
- password: string (50 caractères)
- firstname: string (80 caractères)
- lastname: string (80 caractères)
```

## Configurer le Module Users

- Ajoute l'entité User à users.module.ts.

`imports: [TypeOrmModule.forFeature([User])]`

## Gérer les Migrations

- Crée le fichier src/config/migration.config.ts.
- Génère et applique la migration pour la création de la table utilisateur.

Tu dois d'abord lancer ton serveur car les migrations seront générées en TS, mais devront être transpilées en JS.

```bash
$ npm run start:dev
```

Pour créer la migration correspondante à la création de la table user :

```bash
$ npm run migration:generate src/migrations/CreateUserTable
```

Après avoir généré une migration, on l'applique :

```bash
$ npm run migration:up

```

## Développer le UsersService

- Implémente les méthodes nécessaires dans users.service.ts

## Développer le UsersController

- Ajoute les méthodes CRUD dans users.controller.ts.
- Le décorateur `@Controller('users')` sera chargé de gérer la route `http://localhost:3000/users`
- N'oublie pas d'injecter le UsersService dans ton constructeur. Tu vas en avoir besoin pour interagir avec ta base de données.

## Tester l'API avec Postman ou curl

- Fais des tests pour t'assurer que tout fonctionne correctement.
