---
layout: post
title: "Setting Up TypeORM with Apollo Federation"
date: 2024-07-15
categories: [GraphQL, TypeORM, Apollo Federation]
excerpt: "Learn how to set up a Node.js project using TypeORM and Apollo Federation to build a scalable and performant GraphQL API."
---

In this post, we will guide you through setting up a Node.js project using TypeORM with Apollo Federation. This combination allows you to create a scalable and performant GraphQL API by leveraging TypeORM's robust ORM capabilities and Apollo Federation's powerful schema stitching and microservices architecture.

## Introduction

TypeORM is an ORM for TypeScript and JavaScript (ES7, ES6, ES5). It supports various databases like MySQL, PostgreSQL, MariaDB, SQLite, and more. Apollo Federation is a powerful tool for building a distributed GraphQL architecture, allowing multiple GraphQL services to work together as a single data graph.

By combining these two technologies, you can build a robust backend service that efficiently manages data with TypeORM while serving it through a federated GraphQL API using Apollo Federation.

## Prerequisites

- Node.js and npm installed on your machine
- Basic knowledge of TypeScript
- Basic understanding of GraphQL and Apollo Federation
- A PostgreSQL database up and running

## Setting Up the Project

### Step 1: Initialize the Project

First, create a new Node.js project:

```bash
mkdir typeorm-apollo-federation
cd typeorm-apollo-federation
npm init -y
```

### Step 2: Install Dependencies

Install the necessary packages:

```bash
npm install typeorm reflect-metadata pg @apollo/server graphql @apollo/federation @apollo/subgraph apollo-datasource @apollo/federation-directives
npm install typescript ts-node @types/node @types/graphql --save-dev
```

### Step 3: Configure TypeScript

Create a `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

### Step 4: Set Up TypeORM

Create a `ormconfig.json` file to configure TypeORM:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "your_username",
  "password": "your_password",
  "database": "your_database",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"]
}
```

Create a directory structure for the project:

```bash
mkdir -p src/entity
```

### Step 5: Create an Entity

Create a `User` entity in `src/entity/User.ts`:

```typescript
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
```

### Step 6: Set Up Apollo Server with Federation

Create a new file `src/index.ts`:

```typescript
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildFederatedSchema } from "@apollo/federation";
import { typeDefs, resolvers } from "./schema";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

// Initialize TypeORM
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "your_username",
  password: "your_password",
  database: "your_database",
  synchronize: true,
  logging: false,
  entities: [User],
});

AppDataSource.initialize().then(async () => {
  // Create Apollo Federation schema
  const schema = buildFederatedSchema([
    {
      typeDefs,
      resolvers,
    },
  ]);

  // Create Apollo Server
  const server = new ApolloServer({ schema });

  // Start Apollo Server
  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      dataSource: AppDataSource,
    }),
  });

  console.log(`🚀 Server ready at ${url}`);
}).catch(error => console.log(error));
```

### Step 7: Define GraphQL Schema and Resolvers

Create a `src/schema.ts` file:

```typescript
import { gql } from "apollo-server";
import { User } from "./entity/User";

export const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(firstName: String!, lastName: String!): User
  }
`;

export const resolvers = {
  Query: {
    users: async () => User.find(),
    user: async (_, { id }) => User.findOneBy({ id }),
  },
  Mutation: {
    createUser: async (_, { firstName, lastName }) => {
      const user = User.create({ firstName, lastName });
      await user.save();
      return user;
    },
  },
};
```

## Running the Project

To run the project, compile the TypeScript files and start the server:

```bash
npx ts-node src/index.ts
```

Your Apollo Federation server with TypeORM is now running. You can interact with it through the GraphQL playground at the server URL, typically `http://localhost:4000`.

## Conclusion

By following these steps, you've set up a Node.js project using TypeORM with Apollo Federation. This setup allows you to efficiently manage your database and serve it through a scalable and performant GraphQL API. As your application grows, you can easily add more federated services to your architecture, maintaining a seamless and integrated data graph.

For further reading, you can check the official [TypeORM documentation](https://typeorm.io/#/) and [Apollo Federation documentation](https://www.apollographql.com/docs/federation/).