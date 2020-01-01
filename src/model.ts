interface ModelOptions {
  name?: string;
}

interface Model {
  _name?: string;
  model: any;
  [key: string]: any;
}

export default (fn: any, opts: ModelOptions = {}): Model => {
  const model = fn();
  const { name } = opts;

  const returnOBJ: Model = {
    _name: name,
    model,
  };
  if (name) returnOBJ[name] = model;

  return returnOBJ;
};
