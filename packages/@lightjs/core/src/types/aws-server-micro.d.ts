declare module 'aws-serverless-micro' {
  export default function (
    fn: import('micro').RequestHandler,
  ): import('@netlify/functions').Handler;
}
