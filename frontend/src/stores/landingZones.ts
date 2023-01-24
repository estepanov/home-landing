import { derived, writable } from 'svelte/store';
import { API } from "@aws-amplify/api";

export enum LZRequestStatus {
    INIT,
    LOADING,
    FAIL,
    COMPLETE,
}

export interface LandingZone {
    homePageId: string;
    name: string;
    bookmarks: Bookmark[];
    createdAt?: number;
}

export type NewLandingZone = Omit<LandingZone, 'homePageId'>

export interface Bookmark {
    id: string;
    name: string;
    url: string;
}

export const landingZonereqState = writable<LZRequestStatus>(LZRequestStatus.INIT);

export const isLandingZoneLoading = derived(landingZonereqState, ($landingZonereqState) => {
    return $landingZonereqState === LZRequestStatus.LOADING;
});

export const landingZoneError = writable<null | string>(null);

export const allLandingZones = writable<LandingZone[]>([]);

export const primaryLandingZone = writable<LandingZone | null>(null);

export const getPrimaryLandingZone = async () => {
    return API.get("lzs", "landingzones/primary", {})
        .then((data) => {
            primaryLandingZone.set(data);
            return data;
        })
};

export const setPrimaryLZReqState = writable<LZRequestStatus>(LZRequestStatus.INIT);

export const isSetPrimaryLZLoading = derived(setPrimaryLZReqState, ($setPrimaryLZReqState) => {
    return $setPrimaryLZReqState === LZRequestStatus.LOADING;
});

export const makePrimaryLandingZone = async (landingZoneId: string) => {
    setPrimaryLZReqState.set(LZRequestStatus.LOADING)
    return API.post("lzs", `landingzones/primary`, {
        body: {
            primaryLandingZoneId: landingZoneId,
        },
    }).then((data) => {
        setPrimaryLZReqState.set(LZRequestStatus.COMPLETE)
        return data
    })
}

export const postLandingZone = async (landingZone: NewLandingZone) => {
    landingZoneError.set(null)
    landingZonereqState.set(LZRequestStatus.LOADING)
    return API.post("lzs", "landingzones", {
        body: landingZone,
    })
        .then((data) => {
            console.log('postLandingZone', data)
            landingZonereqState.set(LZRequestStatus.COMPLETE)
            return data
        })
        .catch((err) => {
            console.log('err postLandingZone', err)
            landingZonereqState.set(LZRequestStatus.FAIL)
            landingZoneError.set(err?.message)
            throw err
        })
};

export const deleteLandingZone = async (id: string) => {
    landingZoneError.set(null)
    landingZonereqState.set(LZRequestStatus.LOADING)
    return API.del("lzs", `landingzones/${id}`, {})
        .then((data) => {
            console.log('deleteLandingZone', data)
            landingZonereqState.set(LZRequestStatus.COMPLETE)
            return data
        })
        .catch((err) => {
            console.log('err deleteLandingZone', err)
            landingZonereqState.set(LZRequestStatus.FAIL)
            landingZoneError.set(err?.message)
        })
};

export const putLandingZone = async (landingZone: LandingZone) => {
    landingZoneError.set(null)
    landingZonereqState.set(LZRequestStatus.LOADING)
    return API.put("lzs", `landingzones/${landingZone.homePageId}`, {
        body: landingZone,
    }).then((data) => {
        console.log('putLandingZone', data)
        landingZonereqState.set(LZRequestStatus.COMPLETE)
        return data
    })
    .catch((err) => {
        console.log('err putLandingZone', err)
        landingZonereqState.set(LZRequestStatus.FAIL)
        landingZoneError.set(err?.message)
    })
};

const getLandingZones = async () => {
    return API.get("lzs", "landingzones", {});
};

const getLandingZone = async (id: string) => {
    return API.get("lzs", `landingzones/${id}`, {});
};

export async function getAndSetAllLandingZones() {
    landingZoneError.set(null)
    landingZonereqState.set(LZRequestStatus.LOADING)
    console.log('fetching', 'allLandingZones')
    return getLandingZones()
        .then((data) => {
            console.log('allLandingZones', data)
            landingZonereqState.set(LZRequestStatus.COMPLETE)
            allLandingZones.set(data)
        })
        .catch((err) => {
            console.log('err allLandingZones', err)
            landingZonereqState.set(LZRequestStatus.FAIL)
            landingZoneError.set(err?.message)
            allLandingZones.set([])
        })
}
