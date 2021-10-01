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
});

const configObject = configuration();

export { configuration, configObject };
export default configuration;
