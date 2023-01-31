import * as uuid from "uuid";
import handler from "../../utils/handler";
import dynamoDb from "../../utils/dynamodb";
import { LandingZonesTable } from "../../utils/Tables"

export const main = handler(async (event) => {
    if (!event.body) throw new Error("No body provided");

    const queryCount = await LandingZonesTable().query(event.requestContext.authorizer?.jwt.claims.sub, undefined, {
        Select: "COUNT",
    })

    if (queryCount.Count && queryCount.Count >= 5) {
        throw new Error("You have reached the maximum number of landing zones")
    }
    const data = JSON.parse(event.body);
    const params = {
        name: data.name, // Parsed from request body
        bookmarks: data.bookmarks, // Parsed from request body
        createdAt: Date.now(), // Current Unix timestamp
    };

    await LandingZonesTable().putItem(event.requestContext.authorizer?.jwt.claims.sub, uuid.v1(), params)

    return params;
});