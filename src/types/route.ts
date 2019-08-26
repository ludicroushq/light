export default interface Route {
  path: string | string[];
  handler: any;
  method: string[] | string;
  file?: string;
}; // eslint-disable-line
