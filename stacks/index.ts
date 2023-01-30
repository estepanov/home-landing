import { App } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";
import { ApiStack } from "./APIStack";
import { AuthStack } from "./AuthStack";
import { ClientStack } from "./ClientStack";
import { DBStack } from "./DBStack";
import { NewsStack } from "./NewsStack";

export default function (app: App) {
  // Remove all resources when non-prod stages are removed
  if (app.stage !== "prod") {
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
  }

  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app
    .stack(AuthStack)
    .stack(DBStack)
    .stack(NewsStack)
    .stack(ApiStack)
    .stack(ClientStack);
}
