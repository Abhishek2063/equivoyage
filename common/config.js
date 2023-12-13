
const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const APP_URL = isProduction ? process.env.NEXT_PUBLIC_PROD_APP_URL : process.env.NEXT_PUBLIC_LOCAL_APP_URL;
const DATABASE_URL = isProduction ? process.env.NEXT_PUBLIC_PROD_DATABASE_URL : process.env.NEXT_PUBLIC_LOCAL_DATABASE_URL;
module.exports = { DATABASE_URL, APP_URL };