import type { SSTConfig } from "sst"
import {
  AuthStack,
  DBStack,
  NewsStack,
  ApiStack,
  ClientStack
} from "./stacks"
import { RemovalPolicy } from "aws-cdk-lib";


export default {
  config(input) {
    return {
      name: "home-landing",
      region: "us-east-2",
    }
  },
  stacks(app) {
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);

    app.setDefaultFunctionProps({
      runtime: "nodejs18.x",
      nodejs: {
        format: "esm",
      },
    });

    app
      .stack(AuthStack)
      .stack(DBStack)
      .stack(NewsStack)
      .stack(ApiStack)
      .stack(ClientStack);

  },
} satisfies SSTConfig