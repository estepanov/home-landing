<script lang="ts">
    import { ProgressBar } from "@skeletonlabs/skeleton"
    import { onMount } from "svelte"
    import { fade, slide, fly } from "svelte/transition"
    import { getAndSetAllLandingZones, allLandingZones, landingZoneError, isLandingZoneLoading, setPrimaryLandingZone, isSetPrimaryLZLoading, primaryLandingZone, getPrimaryLandingZone, deleteLandingZone } from "../../stores/landingZones"
    import EditModal from "../landingzone/EditModal.svelte"

    onMount(() => {
        getAndSetAllLandingZones();
    })
</script>

<div>
    {#if $landingZoneError}
        <div transition:slide class="alert alert-error alert-message">
            {$landingZoneError}
        </div>
    {/if}
    <div>
        {#each $allLandingZones as lz}
            <div class="my-2 py-2 px-4 bg-surface-200-700-token rounded-md border-2 border-transparent flex hover:bg-surface-50-900-token hover:border-2 hover:text-xl transition-all hover:border-surface-200-700-token">
                <div class="font-bold flex items-center">
                    {lz.name}
                    {#if $primaryLandingZone?.homePageId === lz.homePageId}
                        <span transition:fade class="text-primary-500 bg-white dark:bg-black py-1 px-3 text-xs rounded-sm mx-4 uppercase font-light">Primary</span>
                    {/if}
                </div>
                <div class="flex justify-end flex-1 space-x-2">
                    {#if $primaryLandingZone?.homePageId !== lz.homePageId}
                    <button transition:fly={{x: -50}} class="btn btn-outline-primary btn-sm" disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading} type="button" on:click|preventDefault={() => deleteLandingZone(lz.homePageId).then(() => getAndSetAllLandingZones())}>Delete</button>
                    <button transition:fly={{x: -50}} class="btn btn-filled-primary btn-sm " disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading} type="button" on:click|preventDefault={() => setPrimaryLandingZone(lz)}>Promote</button>
                    {/if}
                    <EditModal landingZone={lz}>
                        Edit
                    </EditModal>
                </div>
            </div>
        {/each}
    </div>
    {#if $isLandingZoneLoading}
    <div class="mt-4"  transition:slide>
        <ProgressBar label={$allLandingZones.length ? undefined : "Fetching landing zones"} meter="bg-primary-500" track="bg-surface-200-700-token" height={$allLandingZones.length ? "h-2" : "h-4"} />
    </div>
{/if}
</div>