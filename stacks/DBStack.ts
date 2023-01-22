import { StackContext, Table } from "@serverless-stack/resources";

export function DBStack({ stack, app }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "LZTable", {
    fields: {
      userId: "string",
      homePageId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "homePageId" },
  });

  return {
    table,
  };
}