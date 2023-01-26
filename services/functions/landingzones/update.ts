import handler from "../../utils/handler";
import dynamoDb from "../../utils/dynamodb";

export const main = handler(async (event) => {
  if (!event.body) throw new Error("No body provided");
  const data = JSON.parse(event.body);
  if(!data.name) throw new Error("No name provided")

  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: event.requestContext.authorizer?.jwt.claims.sub, // The id of the author
      homePageId: event.pathParameters?.id, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET #name = :name, bookmarks = :bookmarks, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":bookmarks": data.bookmarks || [],
      ":name": data.name,
      ":updatedAt": new Date().getTime(),
    },
    ExpressionAttributeNames: {
      "#name": "name"
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamoDb.update(params);
  return { status: true, landingZone: result.Attributes };
});