const { LIGHT_ENV } = process.env;
const isNetlify = LIGHT_ENV === 'netlify';
const isAWS = LIGHT_ENV === 'aws';
const isRunKit = LIGHT_ENV === 'runkit';
const isNow = LIGHT_ENV === 'now';
const serverless = isNetlify || isAWS || isRunKit || isNow;

export const isServerless = () => {
  if (serverless) {
    return LIGHT_ENV;
  }
  return null;
};
