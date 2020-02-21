# factories

## Introduction

Factories are simple helpers to allow you to create records in your database in testing environments. Light's factories work in a similar way in that they are a wrapper over whatever ORM you choose.

## Example

{% code title="factories/user.js" %}
```javascript
const { createFactory } = require('light');
const { User } = require('../models/user'); // see `models` documentation

const { factory } = createFactory('User'); // name of the factory

module.exports = factory(() => ({
  async create(opts = {}) {
    const options = {
      ...opts,
    };
    return User.query().insertAndFetch(options);
  },
  async createDeleted(opts = {}) {
    const options = {
      deleted_at: Date.now(),
      ...opts,
    };
    return User.query().insertAndFetch(options);
  },
}));
```
{% endcode %}

The factory requires a name and a function that returns whatever methods you would like to make available.

### Usage

Inside of tests, you can then import the factory and create the database records.

{% code title="routes/\_\_tests\_\_/index.js" %}
```javascript
const { create, createDeleted, createUser, createDeletedUser } = require('../../factories/user');

let user;
let deletedUser;
beforeEach(async () => {
  user = await createUser({ name: 'Alice' });
  deletedUser = await createDeletedUser({ name: 'Bob' });
});
```
{% endcode %}

Similar to the models, light exports both the methods you provide as well as the same methods with the factory name appended. I.e. you can use `create` or `createUser` and they will do the same thing. The benefit of using `createUser` over `create` is that it will allow you to import multiple factories with `create` methods without the names colliding.

