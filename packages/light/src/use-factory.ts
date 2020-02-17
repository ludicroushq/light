interface Factory {
  _name?: string;
  [key: string]: any;
}

export default (name: string): any => {
  if (!name) throw new Error('factory must have a unique name');
  return {
    setHandler(factoryFn: any): Factory {
      const factory = factoryFn();
      const returnOBJ: Factory = {
        _name: name,
        ...factory,
      };

      Object.keys(factory).forEach((key): void => {
        returnOBJ[`${key}${name}`] = factory[key];
      });

      return returnOBJ;
    },
  };
};
