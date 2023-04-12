import handler from "../../utils/handler";
import { BING_BUSINESS_NEWS, BING_SCIENCE_NEWS, BING_TECH_NEWS, BING_US_NEWS, BING_US_NORTHEAST_NEWS, BING_WORLD_NEWS, NewsSource } from "../../utils/newsConstants"
import { NewsCacheTable } from "../../utils/Tables"

const buildGetCacheFunc = (source: NewsSource) => {
  return handler(async () => {
    const result = await NewsCacheTable().getItem(source.sourceName, source.sourceCategory)

    // Return the retrieved item
    return {
      ...source,
      lastCheckedDate: result.Item?.updatedAt,
      items: result.Item?.data || [],
    }
  })
}

export const world = buildGetCacheFunc(BING_WORLD_NEWS);
export const us = buildGetCacheFunc(BING_US_NEWS);
export const business = buildGetCacheFunc(BING_BUSINESS_NEWS);
export const us_northeast = buildGetCacheFunc(BING_US_NORTHEAST_NEWS);
export const technology = buildGetCacheFunc(BING_TECH_NEWS);
export const science = buildGetCacheFunc(BING_SCIENCE_NEWS);

