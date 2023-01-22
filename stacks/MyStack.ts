import { StackContext, Api, StaticSite } from "@serverless-stack/resources";

export function MyStack({ stack, app }: StackContext) {
  const isProd = app.stage === "prod";
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
    },
    customDomain: {
      domainName: isProd ? "api.home.builtbyevans.com" : "dev.api.home.builtbyevans.com",
      hostedZone: "builtbyevans.com",
      path: "v1",
    }
  });
  const site = new StaticSite(stack, "svelteJSSite", {
    path: "frontend",
    buildCommand: "npm run build", // or "yarn build"
    buildOutput: "dist",
    vite: {
      types: "types/my-env.d.ts",
    },
    environment: {
      // Pass in the API endpoint to our app
      VITE_APP_API_URL: api.url,
    },
    customDomain: {
      domainName: isProd ? "home.builtbyevans.com" : "dev.home.builtbyevans.com",
      hostedZone: "builtbyevans.com",
    }
  });
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
