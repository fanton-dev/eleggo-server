import * as dotenv from 'dotenv';

const environment = process.env.NODE_ENV;
const envFilePath = !environment ? '.env' : `.env.${environment}`;
dotenv.config({ path: envFilePath });

const configuration = {
  app: {
    port: parseInt(process.env.APP_PORT || '3000'),
    prefix: process.env.APP_PREFIX || 'api',
  },
  api: {
    root: process.env.API_ROOT,
  },
};

export { configuration };
export default configuration;
