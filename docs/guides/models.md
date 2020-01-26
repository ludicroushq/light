# models

## Introduction

In frameworks such as Ruby on Rails, there are predefined ORMs which are the norm. Swapping them out takes a lot of effort and will cause a lot of pain. In the node world, there are tens of different widely used ORMs so it wouldn't be fair to force developers to use one specific one. As a result, light's models are merely wrappers you can place over any framework you choose.

## Example

Create a `models` folder at the same level as the `routes` folder and inside populate it with file, which for this example we will call `user.js`.

{% code title="models/user.js" %}
```javascript
const { model } = require('light');

// model definition
class User extends Model {
  /// ...
};

const { handler } = model('User');

module.exports = handler(() => User);
```
{% endcode %}

The first line simply imports `model` from light. The next few lines are ORM dependent and you should follow the guides of the ORM you are using. The last two lines are what contain the meat of the wrapper. You will need to pass the name of the model to the `model` function and you will need to pass a function that returns your model to the `handler` function. The result of the handle function should be exported.

### Importing

Importing is relatively simple.

{% code title="routes/index.js" %}
```javascript
const { User, model } = require('../models/user.js');
```
{% endcode %}

 Notice how we have two options, `User` and `model`? Both are equal to the same value. By default, the model will export itself as `model` and as whatever value you pass as the name. Using the name instead of `model` will allow you to import multiple models without the names interfering!

