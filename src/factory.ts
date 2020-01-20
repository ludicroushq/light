interface Factory {
  _name?: string;
  [key: string]: any;
}

export default (name: string): any => ({
  handler(factoryFn: any): Factory {
    const factory = factoryFn();
    const returnOBJ: Factory = {
      _name: name,
      ...factory,
    };

    if (name) {
      Object.keys(factory).forEach((key): void => {
        returnOBJ[`${key}${name}`] = factory[key];
      });
    }

    return returnOBJ;
  },
});
