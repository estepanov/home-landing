import { derived, writable } from 'svelte/store';
import { API } from "@aws-amplify/api";

export enum NewsRequestStatus {
    INIT,
    LOADING,
    FAIL,
    COMPLETE,
}

export interface News {
    humanName: string;
    sourceName: string;
    sourceCategory: string;
    lastCheckedDate?: number;
    items: NewsItem[];
}

export interface Provider {
    _type: string;
    name: string;
    image: {
        thumbnail: {
            contentUrl: string;
        }
    }
}

export interface NewsItem {
    name: string;
    datePublished: string;
    image: {
        thumbnail: {
            width: number;
            contentUrl: string;
            height: number;
        }
        isLicensed: boolean;
    },
    description: string;
    provider: Provider[];
    url: string;
}

export const newsReqState = writable<NewsRequestStatus>(NewsRequestStatus.INIT);

export const isNewsLoading = derived(newsReqState, ($newsReqState) => {
    return $newsReqState === NewsRequestStatus.LOADING;
});

export const newsError = writable<null | string>(null);

export const worldNews = writable<null | News>(null);

export const getWorldNews = async () => {
    newsReqState.set(NewsRequestStatus.LOADING)
    return API.get("news", "news/world", {})
        .then((data) => {
            newsReqState.set(NewsRequestStatus.COMPLETE)
            worldNews.set(data);
            return data;
        })
        .catch((err) => {
            newsReqState.set(NewsRequestStatus.FAIL)
            newsError.set(err.message);
        })
};

export const usNewsReqState = writable<NewsRequestStatus>(NewsRequestStatus.INIT);

export const isUSNewsLoading = derived(newsReqState, ($newsReqState) => {
    return $newsReqState === NewsRequestStatus.LOADING;
});

export const usNewsError = writable<null | string>(null);

export const usNews = writable<null | News>(null);

export const getUSNews = async () => {
    usNewsReqState.set(NewsRequestStatus.LOADING)
    return API.get("news", "news/us", {})
        .then((data) => {
            usNewsReqState.set(NewsRequestStatus.COMPLETE)
            usNews.set(data);
            return data;
        })
        .catch((err) => {
            usNewsReqState.set(NewsRequestStatus.FAIL)
            usNewsError.set(err.message);
        })
};

export const businessNewsReqState = writable<NewsRequestStatus>(NewsRequestStatus.INIT);

export const isBusinessNewsLoading = derived(businessNewsReqState, ($newsReqState) => {
    return $newsReqState === NewsRequestStatus.LOADING;
});

export const businessNewsError = writable<null | string>(null);

export const businessNews = writable<null | News>(null);

export const getBusinessNews = async () => {
    businessNewsReqState.set(NewsRequestStatus.LOADING)
    return API.get("news", "news/business", {})
        .then((data) => {
            businessNewsReqState.set(NewsRequestStatus.COMPLETE)
            businessNews.set(data);
            return data;
        })
        .catch((err) => {
            businessNewsReqState.set(NewsRequestStatus.FAIL)
            businessNewsError.set(err.message);
        })
};