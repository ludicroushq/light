const { LIGHT_ENV } = process.env;
export const isNetlify = LIGHT_ENV?.toLowerCase() === 'netlify';
export const isAWS = LIGHT_ENV?.toLowerCase() === 'aws';
export const isRunKit = LIGHT_ENV?.toLowerCase() === 'runkit';
export const isNow = LIGHT_ENV?.toLowerCase() === 'now';
export const isVercel = LIGHT_ENV?.toLowerCase() === 'vercel';
export const isNextJS = LIGHT_ENV?.toLowerCase() === 'nextjs';
export const isServerless = isNetlify || isAWS || isRunKit || isNow || isVercel || isNextJS;
