// // detect if serverless environment
// const { LIGHT_ENV } = process.env;
// const isNetlify = LIGHT_ENV === 'netlify';
// const isAWS = LIGHT_ENV === 'aws';
// const isRunKit = LIGHT_ENV === 'runkit';
// const isNow = LIGHT_ENV === 'now';
// const isServerless = isNetlify || isAWS || isRunKit || isNow;

// export const withServerless = () => {
//   // transform exports
//   if (isServerless) {
//     if (isNow) {
//       route = (a: Request, b: Response): {} => run(a, b, fun as RequestHandler);
//     }
//     if (isNetlify || isAWS) {
//       route = {
//         handler: AWSServerlessMicro(fun),
//       };
//     }
//     if (isRunKit) {
//       route = {
//         endpoint: (a: Request, b: Response): {} => run(a, b, fun as RequestHandler),
//       };
//     }
//   }
// };
