// class to fetch news from Microsoft Bing News API
export class NewsAPI {
    // The API key for the Microsoft Bing News API
    private apiKey: string;

    // The base URL for the Microsoft Bing News API
    private baseUrl: string;

    // The constructor for the NewsAPI class
    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.cognitive.microsoft.com/bing/v7.0/news/search";
    }

    // This method will make an API call to the Microsoft Bing News API
    public async getNewsData(query: string): Promise<any> {
        // The URL for the API call
        const url: string = `${this.baseUrl}?q=${query}`;

        // Make the API call
        const response = await fetch(url, {
            headers: {
                'Ocp-Apim-Subscription-Key': this.apiKey
            }
        });

        // Get the JSON data from the response
        const data = await response.json();

        // Return the data
        return data;
    }
}
