---
title: params
subtitle: a function to parse params out of urls
---

## `params(path, url): Promise<object>`

`params` is a function used to parse url params out of a given url. It takes in a template and the actual URL and compares the two to return an object mapping of name to value.

### Output

This function returns a promise object based on the input. For example, `await params('/posts/:id', '/posts/123');` will return:

```js
{
  id: '123',
}
```

### Parameters

This function takes in two strings, the path (template) and url (actual url).

#### `path: string`

A template string containing the positions of the parameters as defined by the [find-my-way](https://github.com/delvedor/find-my-way) documentation.

```js
'/posts/:id';
```

#### `url: string`

The URL of the current route being processed, usually found with `req.url`.

```js
'/posts/123'; // req.url
```
