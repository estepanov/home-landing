declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        USER_POOL_ID: string;
        USER_POOL_CLIENT_ID: string;
        ROOT_HOSTED_ZONE: string;
        VITE_COGNITO_OATH_LOGIN_REDIRECT: string;
        VITE_COGNITO_OATH_LOGOUT_REDIRECT: string;
        VITE_COGNITO_COOKIE_DOMAIN: string;
      }
    }
  }

export {}