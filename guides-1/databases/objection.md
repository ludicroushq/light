---
title: setting up knex and objection
subtitle: easily connect and use your postgres database with knex and objection
---

# objection

## Installation

To get started, install knex and objection and the database driver of your choice \(in our case, Postgres\)

```bash
$ npm install knex objection pg
```

## Configuration

Then, initialize knex.js by running `./node_modules/.bin/knex init`. Here is what we recommend but you can do whatever you would like since light doesn't enforce any sort of configuration. **Be sure to replace `my-project` with your local database name**

```javascript
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'my-project',
      user: 'root',
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN, 10) || 2,
      max: parseInt(process.env.DATABASE_POOL_MAX, 10) || 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN, 10) || 2,
      max: parseInt(process.env.DATABASE_POOL_MAX, 10) || 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
```

Then, you want to make sure to create the following folders so that knex is able to find them \(assuming you use the config above\): `db/migrations`, `db/seeds`.

## Starting a connection

Once you have the connection set up, we want to make sure to connect to the database on start-up. Create a `models/index.js` file and populate it with the following.

```javascript
const { Model } = require('objection');
const Knex = require('knex');
const config = require('../../knexfile');

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const connection = isProd ? config.production : config.development;

const knex = Knex(connection);

Model.knex(knex);

module.exports = Model;
```

That's it! We are ready to create our first model.

## Creating a model

Start by creating a migration so that we can generate a table.

```bash
$ knex migrate:make create_users
```

It should create a file in the `db/migrations` folder. Populate that with something like the following:

```javascript
exports.up = async (knex) => {
  await knex.raw('create extension if not exists "uuid-ossp"');
  return knex.schema.createTable('users', (table) => {
    table.uuid('id')
      .primary()
      .unique()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('first_name');
    table.string('last_name');
    table.string('email').notNullable().unique();

    table.timestamps(false, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
  return knex.raw('drop extension if exists "uuid-ossp"');
};
```

Then run the following command to execute the migration. Make sure to always create the `down` function as well and do not edit any previous migrations!

```bash
$ knex migrate:latest
```

In your `models` folder, create a new `User.js` file and populate it with the following.

```javascript
const Model = require('./index');

class User extends Model {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;
```

Then start a new `light console` and you should be able to create and list all users!

```bash
light> await User.query().insert({ first_name: 'Foo', last_name: 'Bar', email: 'foo@bar.com'});
User {
  first_name: 'Foo',
  last_name: 'Bar',
  email: 'foo@bar.com',
  id: '362cd50f-39ab-4d5a-9f4f-a3ce36d0aa38' }
light> await User.query()
[ User {
    id: '362cd50f-39ab-4d5a-9f4f-a3ce36d0aa38',
    first_name: 'Foo',
    last_name: 'Bar',
    email: 'foo@bar.com',
    created_at: 1776-07-04T22:57:34.469Z,
    updated_at: 1776-07-04T22:57:34.469Z } ]
```

To learn more, please take a look at the [Knex.js](http://knexjs.org/) and [Objection.js](https://vincit.github.io/objection.js/) docs!

