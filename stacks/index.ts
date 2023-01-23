import { App } from "@serverless-stack/resources";
import { ApiStack } from "./APIStack";
import { AuthStack } from "./AuthStack";
import { ClientStack } from "./ClientStack";
import { DBStack } from "./DBStack";

export default function (app: App) {
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
    .stack(ApiStack)
    .stack(ClientStack);
}
