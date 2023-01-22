
import { Cognito, StackContext, use } from "@serverless-stack/resources";
// import { DBStack } from "./DBStack";
import { ApiStack } from "./APIStack";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";

export function AuthStack({ stack, app }: StackContext) {
//   const { bucket } = use(DBStack);
  const { api } = use(ApiStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    cdk: {  
        userPool: UserPool.fromUserPoolId(stack, "UserPool", process.env.USER_POOL_ID),
        userPoolClient: UserPoolClient.fromUserPoolClientId(stack, "UserPoolClient", process.env.USER_POOL_CLIENT_ID),
    },
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    // new iam.PolicyStatement({
    //   actions: ["s3:*"],
    //   effect: iam.Effect.ALLOW,
    //   resources: [
    //     bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
    //   ],
    // }),
  ]);

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId || "",
    UserPoolClientId: auth.userPoolClientId,
  });

  // Return the auth resource
  return {
    auth,
  };
}