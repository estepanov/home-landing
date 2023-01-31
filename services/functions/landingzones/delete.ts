import handler from "../../utils/handler";
import { LandingZonesTable } from "../../utils/Tables"

export const main = handler(async (event) => {
  await LandingZonesTable().deleteItem(event.requestContext.authorizer?.jwt.claims.sub, event.pathParameters?.id)

  return { status: true };
});