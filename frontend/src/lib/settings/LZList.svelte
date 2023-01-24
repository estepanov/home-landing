<script lang="ts">
    import { ProgressBar } from "@skeletonlabs/skeleton"
import { onMount } from "svelte"
    import { getAndSetAllLandingZones, allLandingZones, landingZoneError, isLandingZoneLoading, makePrimaryLandingZone, isSetPrimaryLZLoading, primaryLandingZone, getPrimaryLandingZone, deleteLandingZone } from "../../stores/landingZones"
    import EditModal from "../landingzone/EditModal.svelte"

    onMount(() => {
        getAndSetAllLandingZones();
    })
</script>

<div>
    {#if $landingZoneError}
        <div class="alert alert-error alert-message">
            {$landingZoneError}
        </div>
    {/if}
    {#each $allLandingZones as lz}
        <div class="my-2 py-2 px-4 bg-surface-200-700-token rounded-md">
            <span class="font-bold">{lz.name}</span>
            {#if $primaryLandingZone?.homePageId === lz.homePageId}
                <span class="text-primary-500">primary</span>
            {/if}
            <div>
                {#if $primaryLandingZone?.homePageId !== lz.homePageId}
                    <EditModal landingZone={lz} />
                    <button class="btn btn-filled-primary btn-sm" disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading} type="button" on:click|preventDefault={() => makePrimaryLandingZone(lz.homePageId).then(() => getPrimaryLandingZone())}>make primary</button>
                    <button class="btn btn-outline-primary btn-sm" disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading} type="button" on:click|preventDefault={() => deleteLandingZone(lz.homePageId).then(() => getAndSetAllLandingZones())}>delete</button>
                {/if}
            </div>
        </div>
    {/each}
    {#if $isLandingZoneLoading}
    <div class="mt-4">
        <ProgressBar label={$allLandingZones.length ? undefined : "Fetching landing zones"} meter="bg-primary-500" track="bg-surface-200-700-token" height={$allLandingZones.length ? "h-2" : "h-4"} />
    </div>
{/if}
</div>