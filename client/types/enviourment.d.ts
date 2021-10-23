declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: string;

      REACT_APP_API_ROOT?: string;
    }
  }
}

export {};
