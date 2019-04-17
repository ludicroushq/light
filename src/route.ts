export default (route: any): (req: any, res: any) => {} => {
  const fn = (req: any, res: any): () => {} => route.handler(req, res);
  fn.path = route.path;
  return fn;
};
