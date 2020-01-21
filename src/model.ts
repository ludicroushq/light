interface Model {
  _name?: string;
  model: any;
  [key: string]: any;
}

export default (name: string): any => {
  if (!name) throw new Error('model must have a name');
  return {
    handler(modelFn: any): Model {
      const model = modelFn();

      const returnOBJ: Model = {
        _name: name,
        model,
      };

      returnOBJ[name] = model;

      return returnOBJ;
    },
  };
};
