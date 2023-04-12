export interface NewsSource {
    humanName: string;
    sourceName: string;
    sourceCategory: string;
}

export const BING_WORLD_NEWS:NewsSource = {
    humanName: 'World News',
    sourceName: 'BingNewsAPI',
    sourceCategory: 'mkt:en-US/category:World',
}

export const BING_US_NEWS:NewsSource = {
    humanName: 'US News',
    sourceName: 'BingNewsAPI',
    sourceCategory: 'mkt:en-US/category:US',
}

export const BING_US_NORTHEAST_NEWS:NewsSource = {
    humanName: 'US Northeast News',
    sourceName: 'BingNewsAPI',
    sourceCategory: 'mkt:en-US/category:US_Northeast',
}

export const BING_TECH_NEWS:NewsSource = {
    humanName: 'Technology News',
    sourceName: 'BingNewsAPI',
    sourceCategory: 'mkt:en-US/category:Technology',
}

export const BING_SCIENCE_NEWS:NewsSource = {
    humanName: 'Science News',
    sourceName: 'BingNewsAPI',
    sourceCategory: 'mkt:en-US/category:Science',
}

export const BING_BUSINESS_NEWS:NewsSource = {
    humanName: 'Business News',
    sourceName: 'BingNewsAPI',
    sourceCategory: 'mkt:en-US/category:Business',
}

export const NEWS_ITEMS:NewsSource[] = [
    BING_WORLD_NEWS,
    BING_US_NEWS,
    BING_US_NORTHEAST_NEWS,
    BING_TECH_NEWS,
    BING_SCIENCE_NEWS,
    BING_BUSINESS_NEWS,
]