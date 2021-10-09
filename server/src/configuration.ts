import * as dotenv from 'dotenv';

const environment = process.env.NODE_ENV;
const envFilePath = !environment ? '.env' : `.env.${environment}`;
dotenv.config({ path: envFilePath });

const configuration = () => ({
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
});

const configObject = configuration();

export { configuration, configObject };
export default configuration;
