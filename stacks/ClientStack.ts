import { StackContext, StaticSite, use } from "sst/constructs";
import { ApiStack } from "./APIStack";
import { AuthStack } from "./AuthStack";
import { NewsStack } from "./NewsStack";
import { isProdStage } from "./utils";
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { Duration } from 'aws-cdk-lib';

const ADD_CORS_DOMAINS = [
    `${process.env.ROOT_HOSTED_ZONE}`,
    `*.${process.env.ROOT_HOSTED_ZONE}`,
    '*.stepanov.network'
]

const ADD_CORS = ADD_CORS_DOMAINS.join(' ');

const responseHeaderPolicy = (context) => new cloudfront.ResponseHeadersPolicy(context, 'SecurityHeadersResponseHeaderPolicy', {
    comment: 'Security headers response header policy',
    securityHeadersBehavior: {
        // https://github.com/sveltejs/kit/issues/93
        contentSecurityPolicy: {
            override: true,
            contentSecurityPolicy: `default-src ${ADD_CORS}; img-src 'self' ${ADD_CORS}; script-src 'self' 'unsafe-inline' ${ADD_CORS}; style-src 'self' 'unsafe-inline' *.googleapis.com ${ADD_CORS}; font-src *.googleapis.com fonts.gstatic.com ${ADD_CORS}; object-src 'none'; connect-src ${ADD_CORS} cognito-idp.us-east-2.amazonaws.com;`,
        },
        strictTransportSecurity: {
            override: true,
            accessControlMaxAge: Duration.days(2 * 365),
            includeSubdomains: true,
            preload: true
        },
        contentTypeOptions: {
            override: true
        },
        referrerPolicy: {
            override: true,
            referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN
        },
        xssProtection: {
            override: true,
            protection: true,
            modeBlock: true
        },
        frameOptions: {
            override: true,
            frameOption: cloudfront.HeadersFrameOption.DENY
        }
    }
});

export function ClientStack({ stack, app }: StackContext) {
    const isProd = isProdStage(app);
    const { api } = use(ApiStack);
    const { newsApi } = use(NewsStack)
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
                VITE_APP_NEWS_API_URL: newsApi.customDomainUrl || newsApi.url,
                VITE_APP_USER_POOL_ID: auth.userPoolId,
                VITE_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId as string,
                VITE_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
        },
        customDomain: {
            domainName: isProd ? `home.${process.env.ROOT_HOSTED_ZONE}` : `${app.stage}.home.${process.env.ROOT_HOSTED_ZONE}`,
            hostedZone: `${process.env.ROOT_HOSTED_ZONE}`,
        },
        cdk: {
            distribution: {
                defaultBehavior: {
                    responseHeadersPolicy: responseHeaderPolicy(stack)
                }
            },
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
