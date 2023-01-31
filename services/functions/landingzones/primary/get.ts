import handler from "../../../utils/handler";
import { LandingZonesTable, PrimaryLandngZonesTable } from "../../../utils/Tables"

export const main = handler(async (event) => {
    const primaryLZItem = await PrimaryLandngZonesTable().getItem(event.requestContext.authorizer?.jwt.claims.sub)

    if (!primaryLZItem.Item || !primaryLZItem.Item.primaryLandingZoneId) {
        return {}
    }

    const result = await LandingZonesTable().getItem(event.requestContext.authorizer?.jwt.claims.sub, primaryLZItem.Item.primaryLandingZoneId)

    if (!result.Item) {
        throw new Error("Item not found.");
    }

    // Return the retrieved item
    return result.Item;
});