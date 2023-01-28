import { StackContext, Table } from "@serverless-stack/resources";

export function DBStack({ stack }: StackContext) {
  // Create the DynamoDB table

  // stores the user's home page content
  const table = new Table(stack, "LZTable", {
    fields: {
      userId: "string",
      homePageId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "homePageId" },
  });

  // stores the user's primary home page (allows switching between home pages)
  const primaryLZTable = new Table(stack, "PrimaryLZTable", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
  });

  //cache weather data
  // const weatherTable = new Table(stack, "WeatherTable", {
  //   fields: {
  //     userId: "string",
    

  return {
    table,
    primaryLZTable
  };
}