
const isProduction = process.env.NODE_ENV === 'production';

const APP_URL = isProduction ? process.env.PROD_APP_URL : process.env.LOCAL_APP_URL;
const DATABASE_URL = isProduction ? process.env.PROD_DATABASE_URL : process.env.LOCAL_DATABASE_URL;
module.exports = { DATABASE_URL, APP_URL };