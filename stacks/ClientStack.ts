import { StackContext, Api, StaticSite, Cognito, use } from "@serverless-stack/resources";
import { ApiStack } from "./APIStack";
import { AuthStack } from "./AuthStack";
import { isProdStage } from "./utils";

export function ClientStack({ stack, app }: StackContext) {
    const isProd = isProdStage(app);
    const { api } = use(ApiStack);
    const { auth } = use(AuthStack);

    const site = new StaticSite(stack, "MainSite", {
        path: "frontend",
        buildCommand: "npm run build",
        buildOutput: "dist",
        vite: {
            types: "types/my-env.d.ts",
        },
        environment: {
                // Pass in the API endpoint to our app
                VITE_COGNITO_REGION: app.region,
                VITE_COGNITO_COOKIE_DOMAIN: process.env.VITE_COGNITO_COOKIE_DOMAIN,
                VITE_COGNITO_OATH_LOGIN_REDIRECT: process.env.VITE_COGNITO_OATH_LOGIN_REDIRECT,
                VITE_COGNITO_OATH_LOGOUT_REDIRECT: process.env.VITE_COGNITO_OATH_LOGOUT_REDIRECT,
                VITE_COGNITO_OATH_DOMAIN: isProd ? `auth.${process.env.ROOT_HOSTED_ZONE}` : `dev-auth.${process.env.ROOT_HOSTED_ZONE}`,
                VITE_APP_API_URL: api.customDomainUrl || api.url,
                VITE_APP_USER_POOL_ID: auth.userPoolId,
                VITE_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId as string,
                VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
        },
        customDomain: {
            domainName: isProd ? `home.${process.env.ROOT_HOSTED_ZONE}` : `${app.stage}.home.${process.env.ROOT_HOSTED_ZONE}`,
            hostedZone: `${process.env.ROOT_HOSTED_ZONE}`,
        }
    });


    stack.addOutputs({
        SiteUrl: site.url,
        SiteCustomDomainUrl: site.customDomainUrl || site.url,
    });

    return {
        site
    }
}
