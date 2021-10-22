declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: string;

      APP_PORT?: string;
      APP_PREFIX?: string;

      API_ROOT?: string;
    }
  }
}

export {};
