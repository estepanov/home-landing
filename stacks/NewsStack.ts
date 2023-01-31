
import { Api, Config, Cron, StackContext, use, Table } from "@serverless-stack/resources";
import { AuthStack } from "./AuthStack";
import { isProdStage } from "./utils";

export function NewsStack({ stack, app }: StackContext) {
  const { auth } = use(AuthStack);
  const isProd = isProdStage(app);

  const NEWS_API_KEY = new Config.Secret(stack, "NEWS_API_KEY");

  // cache news data
  const newsTable = new Table(stack, "NewsTable", {
    fields: {
      sourceName: "string",
      sourceCategory: "string",
    },
    primaryIndex: { partitionKey: "sourceName", sortKey: "sourceCategory" },
  });

  const newsCacheCron = new Cron(stack, "NewsCacheCron", {
    schedule: "rate(4 hours)",
    job: {
      function: {
        handler: "functions/jobs/newsCache.handler",
        environment: {
          NEWS_TABLE_NAME: newsTable.tableName,
        }
      }
    }
  });

  newsCacheCron.bind([
    newsTable,
    NEWS_API_KEY
  ])

  // Create the API
  const newsApi = new Api(stack, "NewsApi", {
    authorizers: {
      cognitoAuthorizor: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        }
      },
    },
    defaults: {
      authorizer: "cognitoAuthorizor",
      function: {
        environment: {
          NEWS_CACHE_TABLE_NAME: newsTable.tableName,
        },
      },
    },
    routes: {
      "GET /news/world": "functions/news/list.world",
    },
    customDomain: {
      domainName: isProd ? `news.api.home.${process.env.ROOT_HOSTED_ZONE}` : `${app.stage}.news.api.home.${process.env.ROOT_HOSTED_ZONE}`,
      hostedZone: `${process.env.ROOT_HOSTED_ZONE}`,
      path: "v1",
    }
  });

  newsApi.bind([
    newsTable
  ])


  auth.attachPermissionsForAuthUsers(stack, [
    newsApi,
  ])

  // Show the API endpoint in the output
  stack.addOutputs({
    NewsApiEndpoint: newsApi.url,
    NewsApiEndpointCustomDomain: newsApi.customDomainUrl || newsApi.url,
  });

  // Return the API resource
  return {
    newsApi,
    newsCacheCron,
    NEWS_API_KEY
  };
}
