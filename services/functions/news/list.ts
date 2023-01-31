import handler from "../../utils/handler";
import { BING_WORLD_NEWS } from "../../utils/newsConstants"
import { NewsCacheTable } from "../../utils/Tables"

export const world = handler(async (event) => {

  const result = await NewsCacheTable().getItem(BING_WORLD_NEWS.sourceName, BING_WORLD_NEWS.sourceCategory)

  // Return the retrieved item
  return {
    ...BING_WORLD_NEWS,
    lastCheckedDate: result.Item?.updatedAt,
    items: result.Item?.data || [],
  }
});