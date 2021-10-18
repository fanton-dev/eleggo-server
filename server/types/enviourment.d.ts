declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production';

    APP_PORT?: string;
    APP_PREFIX?: string;

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

    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_CALLBACK_API: string;

    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CALLBACK_URL: string;

    AWS_REGION: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_CODE_SNIPPETS_S3_BUCKET: string;
    AWS_RECORDINGS_S3_BUCKET: string;
  }
}
