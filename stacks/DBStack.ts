import { StackContext, Table } from "@serverless-stack/resources";

export function DBStack({ stack }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "LZTable", {
    fields: {
      userId: "string",
      homePageId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "homePageId" },
  });

  const primaryLZTable = new Table(stack, "PrimaryLZTable", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
  });

  return {
    table,
    primaryLZTable
  };
}