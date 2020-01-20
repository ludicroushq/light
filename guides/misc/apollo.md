---
title: setting up graphql through apollo
subtitle: configure your API to support graphql with apollo
---

# apollo

## Introduction

GraphQL and Apollo are the new kids on the block, but they are popular for very good reason. They help retrieve extremely complex information in one go, saving both time and data in every request. The setup is very simple and non-intrusive so you can use the Apollo docs without light interfering.

## Setup

The first step to using Apollo with light is to install `apollo-server-micro`. Micro is the framework that is used under the hood of light so this is the proper version needed. Additionally, `graphql` is a peer dependency of Apollo so we are going to need that as well.

```bash
npm install apollo-server-micro graphql
```

Once done, all you need to do is create a `graphql.js` file under the routes folder. Inside this, add the following starter code:

```javascript
const { route } = require('light');
const { ApolloServer, gql } = require('apollo-server-micro');

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      return 'Hello World!';
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const graphqlHandler = apolloServer.createHandler();

const { handler } = route();
module.exports = handler((req, res) => graphqlHandler(req, res));
```

Most of the code that is provided is the starter code for Apollo. The only light related code is the `module.exports` at the bottom \(and the line above\) which simply tells light to run the following graphql handler when the route is `/graphql` with either GET \(for the graphical interface\) or POST \(for the actual queries\). _As always, if you are hosting on a serverless platform, you will need to point the route `/graphql` to this file._

