import * as uuid from "uuid";
import handler from "../../utils/handler";
import dynamoDb from "../../utils/dynamodb";

export const main = handler(async (event) => {
    if (!event.body) throw new Error("No body provided");
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            // The attributes of the item to be created
            userId: event.requestContext.authorizer?.jwt.claims.sub, // The id of the author
            homePageId: uuid.v1(), // A unique uuid
            content: data.content, // Parsed from request body
            attachment: data.attachment, // Parsed from request body
            createdAt: Date.now(), // Current Unix timestamp
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});