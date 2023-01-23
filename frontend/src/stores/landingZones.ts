import { derived, writable } from 'svelte/store';
import { API } from "@aws-amplify/api";
import {Auth} from '@aws-amplify/auth';

export enum LZRequestStatus {
    INIT,
    LOADING,
    FAIL,
    COMPLETE,
}

interface LandingZone {
    id: string;
    name: string;
    bookmarks: Bookmark[];
}

interface Bookmark {
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

const postLandingZone = async (landingZone: LandingZone) => {
    return API.post("lzs", "landingzones", {
        body: landingZone,
    });
};

const deleteLandingZone = async (landingZone: LandingZone) => {
    return API.del("lzs", `landingzones/${landingZone.id}`, {});
};

const putLandingZone = async (landingZone: LandingZone) => {
    return API.put("lzs", `landingzones/${landingZone.id}`, {
        body: landingZone,
    });
};

const getLandingZones = async () => {
    return API.get("lzs", "landingzones", {});
};

export async function getAndSetAllLandingZones() {
    landingZoneError.set(null)
    landingZonereqState.set(LZRequestStatus.LOADING)
    console.log('fetching','allLandingZones')
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
