
import { Cognito, StackContext } from "sst/constructs";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";

export function AuthStack({ stack, app }: StackContext) {

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    cdk: {
        userPool: UserPool.fromUserPoolId(stack, "UserPool", process.env.USER_POOL_ID),
        userPoolClient: UserPoolClient.fromUserPoolClientId(stack, "UserPoolClient", process.env.USER_POOL_CLIENT_ID),
    },
    login: ["email"],
  });


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