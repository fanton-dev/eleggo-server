import * as dotenv from 'dotenv';

import { DocumentBuilder } from '@nestjs/swagger';

const environment = process.env.NODE_ENV;
const envFilePath = !environment ? '.env' : `.env.${environment}`;
dotenv.config({ path: envFilePath });

const configuration = () => ({
  app: {
    port: parseInt(process.env.APP_PORT || '3000'),
    prefix: process.env.APP_PREFIX || 'api',
  },
  database: {
    type: process.env.DATABASE_DRIVER,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    migrationsRun: false,
    entities: [__dirname + '/**/*.model{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    subscribers: [__dirname + '/subscribers/**/*{.ts,.js}'],
    cli: {
      entitiesDir: __dirname + 'entities',
      migrationsDir: __dirname + 'migrations',
      subscribersDir: __dirname + 'subscribers',
    },
  },
  session: {
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60000 * 24,
    },
    resave: false,
    saveUninitialized: false,
  },
  swagger: new DocumentBuilder()
    .setTitle('Eleggo Server API')
    .setDescription('API server for the Eleggo brain compute interface.')
    .setVersion('0.0.1')
    .build(),
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_API,
    scope: ['profile'],
  },
  discord: {
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackApi: process.env.DISCORD_CALLBACK_API,
    scope: ['identify'],
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackApi: process.env.GOOGLE_CALLBACK_API,
    scope: ['profile'],
  },
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    codeSnippetsS3Bucket: process.env.AWS_CODE_SNIPPETS_S3_BUCKET,
    recordingsS3Bucket: process.env.AWS_RECORDINGS_S3_BUCKET,
  },
});

const configObject = configuration();

export { configuration, configObject };
export default configuration;
