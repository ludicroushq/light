interface Model {
  _name?: string;
  model: any;
  [key: string]: any;
}

export default (name: string): any => ({
  handler(modelFn: any): Model {
    const model = modelFn();

    const returnOBJ: Model = {
      _name: name,
      model,
    };

    if (name) returnOBJ[name] = model;

    return returnOBJ;
  },
});
