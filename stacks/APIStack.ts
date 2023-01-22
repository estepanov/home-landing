import { Api, StackContext, use } from "@serverless-stack/resources";
import { DBStack } from "./DBStack";
import { isProdStage } from "./utils";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(DBStack);
  const isProd = isProdStage(app);

  // Create the API
  const api = new Api(stack, "LandingZoneApi", {
    defaults: {
      authorizer: "iam",
      function: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
    },
    routes: {
      "GET /landingzones": "functions/landingzones/list.main",
      "GET /landingzones/{id}": "functions/landingzones/get.main",
      "PUT /landingzones/{id}": "functions/landingzones/update.main",
      "DELETE /landingzones/{id}": "functions/landingzones/delete.main",
      "POST /landingzones": "functions/landingzones/create.main",
    },
    customDomain: {
      domainName: isProd ? `api.home.${process.env.ROOT_HOSTED_ZONE}` : `${app.stage}.api.home.${process.env.ROOT_HOSTED_ZONE}`,
      hostedZone: `${process.env.ROOT_HOSTED_ZONE}`,
      path: "v1",
    }
  });

  api.bind([table])

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    ApiEndpointCustomDomain: api.customDomainUrl || api.url,
  });

  // Return the API resource
  return {
    api,
  };
}