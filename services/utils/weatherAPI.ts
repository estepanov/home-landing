
// This is a class that will be used to make API calls to the Microsoft Bing Weather API
export class WeatherAPI {
    // The API key for the Microsoft Bing Weather API
    private apiKey: string;

    // The base URL for the Microsoft Bing Weather API
    private baseUrl: string;

    // The constructor for the WeatherAPI class
    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = "http://dev.virtualearth.net/REST/v1/Locations";
    }

    // This method will make an API call to the Microsoft Bing Weather API
    public async getWeatherData(location: string): Promise<any> {
        // The URL for the API call
        const url: string = `${this.baseUrl}/${location}?key=${this.apiKey}`;

        // Make the API call
        const response = await fetch(url);

        // Get the JSON data from the response
        const data = await response.json();

        // Return the data
        return data;
    }

}