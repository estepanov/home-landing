import { NewsAPI, NewsCategory, NewsEndpoint, NewsMarkets } from "../../utils/newsAPI";
import { Config } from "@serverless-stack/node/config";
import { NewsCacheTable } from "../../utils/Tables"

const buildCacheFunc = (mkt: NewsMarkets, category: NewsCategory) => {
    return async () => {
        const news = new NewsAPI(Config.NEWS_API_KEY)
        const newsResponse = await news.getNewsData(
            NewsEndpoint.NEWS,
            {
                mkt,
                category
            }
        )

        await NewsCacheTable().putOrUpdateItem(
            newsResponse.newsSource,
            newsResponse.newsCategory,
            {
                data: newsResponse.data,
                updatedAt: new Date().getTime()
            }
        )

        return newsResponse
    }
}


export const world = buildCacheFunc(NewsMarkets.US, NewsCategory.World);
export const us = buildCacheFunc(NewsMarkets.US, NewsCategory.US);
export const business = buildCacheFunc(NewsMarkets.US, NewsCategory.Business);
export const us_northeast = buildCacheFunc(NewsMarkets.US, NewsCategory.US_Northeast);
export const technology = buildCacheFunc(NewsMarkets.US, NewsCategory.Technology);
export const science = buildCacheFunc(NewsMarkets.US, NewsCategory.Science);