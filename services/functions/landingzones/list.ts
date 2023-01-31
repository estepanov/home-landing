import handler from "../../utils/handler";
import { LandingZonesTable } from "../../utils/Tables"

export const main = handler(async (event) => {
  const result = await LandingZonesTable().query(event.requestContext.authorizer?.jwt.claims.sub);
  return result.Items;
});