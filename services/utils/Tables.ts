import { DynamoTable } from "./DynamoTable";

export const LandingZonesTable = () => new DynamoTable(
    process.env.TABLE_NAME as string,
    "userId",
    "homePageId"
);

export const PrimaryLandngZonesTable = () => new DynamoTable(
    process.env.PRIMARY_LZ_TABLE_NAME as string,
    "userId"
);

export const NewsCacheTable = () => new DynamoTable(
    process.env.NEWS_CACHE_TABLE_NAME as string,
    "sourceName",
    "sourceCategory"
);
