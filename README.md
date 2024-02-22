<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Quête n°3 - NestJS

A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

### Initialiser le Projet NestJS

```bash
# nestjs-user-api
$ npm init -y
$ npm i -g @nestjs/cli
$ nest new .
```

### Installer TypeORM et MySQL

- Crée un fichier .env à la racine du projet.
- Ajoute les variables pour la configuration de la base de données.
- Crée le fichier src/config/database.config.ts pour la configuration TypeORM.

### Modifier le AppModule

- Ajoute la configuration de TypeORM dans app.module.ts

### Ajouter Scripts TypeORM dans package.json

- Ajoute les scripts pour gérer les migrations.

```bash
# package.json
$ npm run migration:create (pour créer une nouvelle migration vide)
$ npm run migration:generate (pour génerer une nouvelle migration)
$ npm run migration:up (pour exécuter les migrations non exécutées)
$ npm run migration:down (pour rolllback la dernière migration)
```

### Générer le Module, Service, et Controller

```bash
# nestjs-user-api
$ nest g module users
$ nest g service users
$ nest g controller users
```

### Créer l'Entité User

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

### Configurer le Module Users

- Ajoute l'entité User à users.module.ts.

`imports: [TypeOrmModule.forFeature([User])]`

### Gérer les Migrations

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

(la commande qui m'a dépanné quand je n'arrivais plus a lancer mon serveur a cause d'une manip qui a supprimé mon dossier /dist)

```bash

ts-node -P tsconfig.json -r tsconfig-paths/register ./node_modules/.bin/typeorm migration:run -d src/config/migration.config.ts


```

### Développer le UsersService

- Implémente les méthodes nécessaires dans users.service.ts

### Développer le UsersController

- Ajoute les méthodes CRUD dans users.controller.ts.
- Le décorateur `@Controller('users')` sera chargé de gérer la route `http://localhost:3000/users`
- N'oublie pas d'injecter le UsersService dans ton constructeur. Tu vas en avoir besoin pour interagir avec ta base de données.

### Tester l'API avec Postman ou curl

- Fais des tests pour t'assurer que tout fonctionne correctement.

## Pour mettre en place une authentification JWT dans ton projet NestJS, voici les étapes détaillées

### Installer les Dépendances

Ouvre un terminal dans le dossier de ton projet et installe les packages nécessaires :

```bash
npm install --save @nestjs/passport passport @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt
```

### Créer le Module et le Service d'Authentification

Utilise la CLI de NestJS pour générer un module et un service pour l'authentification :

```bash
nest g module auth
nest g service auth
```

### Mettre à Jour le Service Users

Ajoute une méthode dans UsersService pour récupérer un utilisateur par son email :

```bash
// src/users/users.service.ts

@Injectable()
export class UsersService {
  // Ajoute tes constructeurs et méthodes existants ici

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email: email });
  }
}
```

### Exporter le UsersService et TypeORM Feature

Modifie UsersModule pour exporter UsersService et la configuration TypeORM :

```bash
// src/users/users.module.ts

@Module({
  // autres configurations
  exports: [UsersService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
```

### Mettre à Jour le AuthModule

Importe UsersModule dans AuthModule :

```bash
// src/auth/auth.module.ts

@Module({
  imports: [
    UsersModule,
    // Autres imports
  ],
  // autres configurations
})
export class AuthModule {}
```

### Implémenter AuthService

Dans AuthService, ajoute les méthodes nécessaires pour la validation, le login, l'enregistrement et le hashage du mot de passe :

```bash
// src/auth/auth.service.ts

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Ajoute ici les méthodes validate, login, register, et hash
}
```

### Créer AuthController

Génère un controller pour l'authentification et ajoute les endpoints pour le login et l'enregistrement :

```bash
nest g controller auth
```

### Configurer JWT Module dans AuthModule

Ajoute JwtModule à AuthModule avec une clé secrète :

```bash
// src/auth/auth.module.ts

JwtModule.register({
  secret: jwtConstants.secret,
  // autres configurations
})
```

### Implémenter la Stratégie JWT

Crée une stratégie JWT dans auth/jwt.strategy.ts en utilisant PassportStrategy :

```bash
// src/auth/jwt.strategy.ts

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(email: string) {
    // implémentation de la validation
  }
}
```

### Sécuriser les Routes avec AuthGuard

Utilise AuthGuard pour protéger les routes nécessitant une authentification :

```bash
// Un exemple de controller

@UseGuards(AuthGuard('jwt'))
@Get('/hello')
getHello(): string {
  // Ton code ici
}
```

### Tester ton API

Utilise Postman ou un autre outil pour tester les endpoints /auth/login et /auth/register. Assure-toi que les utilisateurs peuvent se connecter et obtenir un JWT, et que les routes protégées nécessitent un token valide pour accéder.
