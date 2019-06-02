---
title: query
subtitle: a function to parse query parameters
---

## `query(url): Promise<object>`

`query` is a function used to extract query parameters from URLs. It uses the WHATWG URL API under the hood to extract the query parameters and convert it from a [URLSearchParams](https://nodejs.org/api/url.html#url_class_urlsearchparams) to a JSON object. It takes a URL and returns an object.

### Output

This function returns a promise object based on the input. For example, `await query('/asdf?id=123&name=light');` will return:

```js
{
  id: '123',
  name: 'light',
}
```

Any duplicate keys will result in an array. For example, `await query('/asdf?name=hello&name=world');` will return:

```js
{
  name: ['hello', 'world'],
}
```

### Parameters

This function takes in a string which is the URL.

#### `url: string`

Any string which is a URL. It doesn't need to, but should contain a `?` followed by query parameters.
