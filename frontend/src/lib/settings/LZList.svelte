<script lang="ts">
    import { ProgressBar } from "@skeletonlabs/skeleton"
import { onMount } from "svelte"
    import { getAndSetAllLandingZones, allLandingZones, landingZoneError, isLandingZoneLoading, makePrimaryLandingZone, isSetPrimaryLZLoading, primaryLandingZone, getPrimaryLandingZone, deleteLandingZone } from "../../stores/landingZones"

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
        <div>
            {lz.name} 
            {#if $primaryLandingZone?.homePageId !== lz.homePageId}
                <button class="btn btn-filled-primary btn-sm" disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading} type="button" on:click|preventDefault={() => makePrimaryLandingZone(lz.homePageId).then(() => getPrimaryLandingZone())}>make primary</button>
                <button class="btn btn-outline-primary btn-sm" disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading} type="button" on:click|preventDefault={() => deleteLandingZone(lz.homePageId).then(() => getAndSetAllLandingZones())}>delete</button>
            {/if}
        </div>
    {/each}
    {#if $isLandingZoneLoading}
    <div class="mt-4">
        <ProgressBar label={$allLandingZones.length ? undefined : "Fetching landing zones"} meter="bg-primary-500" track="bg-surface-200-700-token" height={$allLandingZones.length ? "h-2" : "h-4"} />
    </div>
{/if}
</div>