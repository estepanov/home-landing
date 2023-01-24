import handler from "../../../utils/handler";
import dynamoDb from "../../../utils/dynamodb";

const update = async (event, data) => {
    const params = {
        TableName: process.env.PRIMARY_LZ_TABLE_NAME,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        Key: {
            userId: event.requestContext.authorizer?.jwt.claims.sub, // The id of the author
        },
        UpdateExpression: "SET primaryLandingZoneId = :primaryLandingZoneId, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":primaryLandingZoneId": data.primaryLandingZoneId || null,
            ":updatedAt": Date.now(), // Current Unix timestamp
        },
    };

    await dynamoDb.update(params);

}

const create = async (event, data) => {
    const params = {
        TableName: process.env.PRIMARY_LZ_TABLE_NAME,
        Item: {
            // The attributes of the item to be created
            userId: event.requestContext.authorizer?.jwt.claims.sub, // The id of the author
            createdAt: Date.now(), // Current Unix timestamp
            updatedAt: Date.now(), // Current Unix timestamp
        },
    };

    await dynamoDb.put(params);
}

export const main = handler(async (event) => {
    if (!event.body) throw new Error("No body provided");
    const data = JSON.parse(event.body);
    const exists = await dynamoDb.get({
        TableName: process.env.PRIMARY_LZ_TABLE_NAME,
        Key: {
            userId: event.requestContext.authorizer?.jwt.claims.sub, // The id of the author
        }
    })
    if (!exists.Item) {
        await create(event, data);
    } else {
        await update(event, data);
    }

    return { status: true };
});