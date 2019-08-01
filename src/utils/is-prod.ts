const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

export default isProd;
