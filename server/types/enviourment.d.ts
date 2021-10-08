declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';

    DATABASE_DRIVER?: string;
    DATABASE_HOST?: string;
    DATABASE_PORT?: string;
    DATABASE_USERNAME?: string;
    DATABASE_PASSWORD?: string;
    DATABASE_NAME?: string;

    SESSION_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_API: string;
  }
}
