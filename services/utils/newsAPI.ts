import fetch from "node-fetch";

export enum NewsEndpoint {
    NEWS = "news",
    NEWS_SEARCH = "news/search",
    TRENDING = "news/trendingtopics",
}

// https://learn.microsoft.com/en-us/bing/search-apis/bing-news-search/reference/market-codes
export enum NewsMarkets {
    US = "en-US",
}

// https://learn.microsoft.com/en-us/bing/search-apis/bing-news-search/reference/query-parameters#news-categories-by-market
export enum NewsCategory {
    Business = "Business",
    Entertainment= "Entertainment",
    Entertainment_MovieAndTV= "Entertainment_MovieAndTV",
    Entertainment_Music= "Entertainment_Music",
    Health= "Health",
    Politics= "Politics",
    Products= "Products",
    ScienceAndTechnology= "ScienceAndTechnology",
    Technology= "Technology",
    Science= "Science",
    Sports= "Sports",
    Sports_Golf= "Sports_Golf",
    Sports_MLB= "Sports_MLB",
    Sports_NBA= "Sports_NBA",
    Sports_NFL= "Sports_NFL",
    Sports_NHL= "Sports_NHL",
    Sports_Soccer= "Sports_Soccer",
    Sports_Tennis= "Sports_Tennis",
    Sports_CFB= "Sports_CFB",
    Sports_CBB= "Sports_CBB",
    US= "US",
    US_Northeast= "US_Northeast",
    US_South= "US_South",
    US_Midwest= "US_Midwest",
    US_West= "US_West",
    World= "World",
    World_Africa= "World_Africa",
    World_Americas= "World_Americas",
    World_Asia= "World_Asia",
    World_Europe= "World_Europe",
    World_MiddleEast= "World_MiddleEast",
}

// https://learn.microsoft.com/en-us/bing/search-apis/bing-news-search/reference/query-parameters#category
interface QueryParams {
    mkt: string;
    category?: NewsCategory; // only for news endpoint
}

interface NewsAPIResponse {
    newsSource: string;
    newsCategory: string;
    data: any;
}

const DEFAULT_QUERY_PARAMS: QueryParams = {
    mkt: NewsMarkets.US
};

// class to fetch news from Microsoft Bing News API
export class NewsAPI {
    // The API key for the Microsoft Bing News API
    private apiKey: string;

    // The base URL for the Microsoft Bing News API
    private baseUrl: string;

    // The constructor for the NewsAPI class
    constructor(
        apiKey: string,
    ) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.bing.microsoft.com/v7.0/";
    }

    public get newsSource () {
        return "BingNewsAPI"
    }
    
    private formatQueryParams(params: QueryParams): string {
        const queryItemKeys = Object.keys(params)
        const queryItems = queryItemKeys
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)

        return queryItems.join('&');
    }

    private formatQueryKVPs(params: QueryParams): string {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}:${encodeURIComponent(params[key])}`)
        return queryItems.join('/');
    }

    private get header () {
        return {
            headers: {
                'Ocp-Apim-Subscription-Key': this.apiKey
            }
        }
    }

    private endpointUrl (enpoint: NewsEndpoint) {
        return `${this.baseUrl}${enpoint}`
    }

    // This method will make an API call to the Microsoft Bing News API
    public async getNewsData(endpoint:NewsEndpoint, query: QueryParams = DEFAULT_QUERY_PARAMS): Promise<NewsAPIResponse> {
        // The URL for the API call
        const url: string = `${this.endpointUrl(endpoint)}?${this.formatQueryParams(query)}`;
        // Make the API call
        const response = await fetch(url, this.header);

        // Get the JSON data from the response
        const data = await response.json();
        console.log('fetched data', data);
        // Return the data
        return {
            newsSource: this.newsSource,
            newsCategory: this.formatQueryKVPs(query),
            data: data?.value || []
        };
    }
}
