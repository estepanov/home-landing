import handler from "../../utils/handler";
import dynamoDb from "../../utils/dynamodb";
import { BING_WORLD_NEWS } from "../../utils/newsConstants"

export const world = handler(async (event) => {
  const result = await dynamoDb.get({
    TableName: process.env.NEWS_CACHE_TABLE_NAME as string,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      sourceName: BING_WORLD_NEWS.sourceName,
      sourceCategory: BING_WORLD_NEWS.sourceCategory,
    },
  });

  // Return the retrieved item
  return {
    ...BING_WORLD_NEWS,
    lastCheckedDate: result.Item?.updatedAt,
    items: result.Item?.data || [],
  }
});