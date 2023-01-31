import { NewsAPI, NewsCategory, NewsEndpoint, NewsMarkets } from "../../utils/newsAPI";
import { Config } from "@serverless-stack/node/config";
import dynamodb from "utils/dynamodb";

export async function world() {
    const news = new NewsAPI(Config.NEWS_API_KEY)
    const newsResponse = await news.getNewsData(
        NewsEndpoint.NEWS,
        {
            mkt: NewsMarkets.US,
            category: NewsCategory.World
        }
    )

    const queryKey = {
        sourceName: newsResponse.newsSource,
        sourceCategory: newsResponse.newsCategory,
    }
    const TableName = process.env.NEWS_TABLE_NAME as string;

    const query = await dynamodb.get({
        TableName,
        Key: queryKey,
    })

    if (!query.Item) {
        console.log('No item found, creating new item')
        await dynamodb.put({
            TableName,
            Item: {
                sourceName: newsResponse.newsSource,
                sourceCategory: newsResponse.newsCategory,
                data: newsResponse.data,
                updatedAt: new Date().getTime()
            }
        })
    } else {
        console.log('Item found, updating item')
        await dynamodb.update({
            TableName,
            Key: queryKey,
            // 'UpdateExpression' defines the attributes to be updated
            // 'ExpressionAttributeValues' defines the value in the update expression
            UpdateExpression: "SET #data = :data, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
                ":data": newsResponse.data,
                ":updatedAt": new Date().getTime(),
            },
            ExpressionAttributeNames: {
                "#data": "data"
            },
            // 'ReturnValues' specifies if and how to return the item's attributes,
            // where ALL_NEW returns all attributes of the item after the update; you
            // can inspect 'result' below to see how it works with different settings
            ReturnValues: "ALL_NEW",
        })
    }
    return newsResponse
}
