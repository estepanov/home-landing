import { Auth } from "@aws-amplify/auth"

export const AMPLIFY_CONFIG = {
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab',
        // REQUIRED - Amazon Cognito Region
        region: import.meta.env.VITE_COGNITO_REGION,
        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,
        // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
        // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
        signUpVerificationMethod: 'code', // 'code' | 'link' 
        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: import.meta.env.VITE_COGNITO_COOKIE_DOMAIN,
        //     // OPTIONAL - Cookie path
        //     path: '/',
        //     // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        //     // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: import.meta.env.VITE_COGNITO_OATH_LOGIN_REDIRECT?.includes('https') ? "strict" : "lax",
        //     // OPTIONAL - Cookie secure flag
        //     // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: import.meta.env.VITE_COGNITO_OATH_LOGIN_REDIRECT?.includes('https')
        // },
        // OPTIONAL - customized storage object
        // storage: MyStorage,
        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_SRP_AUTH',
        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },
        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: import.meta.env.VITE_COGNITO_OATH_DOMAIN,
            scope: ['emmail'],
            // scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: import.meta.env.VITE_COGNITO_OATH_LOGIN_REDIRECT,
            redirectSignOut: import.meta.env.VITE_COGNITO_OATH_LOGOUT_REDIRECT,
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    },
    API: {
        endpoints: [
            {
                name: "lzs",
                endpoint: import.meta.env.VITE_APP_API_URL,
                region: import.meta.env.VITE_COGNITO_REGION,
                custom_header: async () => {
                    return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
                }
            },
            {
                name: "news",
                endpoint: import.meta.env.VITE_APP_NEWS_API_URL,
                region: import.meta.env.VITE_COGNITO_REGION,
                custom_header: async () => {
                    return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
                }
            },
        ]
    }
}