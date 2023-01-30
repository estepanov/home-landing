/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_REGION: string
  readonly VITE_COGNITO_COOKIE_DOMAIN: string
  readonly VITE_COGNITO_OATH_LOGIN_REDIRECT: string
  readonly VITE_COGNITO_OATH_LOGOUT_REDIRECT: string
  readonly VITE_COGNITO_OATH_DOMAIN: string
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_NEWS_API_URL: string
  readonly VITE_APP_USER_POOL_ID: string
  readonly VITE_APP_IDENTITY_POOL_ID: string
  readonly VITE_APP_USER_POOL_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}