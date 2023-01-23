<script lang="ts">
    import { ProgressBar } from "@skeletonlabs/skeleton"
import { onMount } from "svelte"
    import { getAndSetAllLandingZones, allLandingZones, landingZoneError, isLandingZoneLoading } from "../../stores/landingZones"

    onMount(() => {
        getAndSetAllLandingZones();
        console.log("LZList mounted")
    })
</script>

<div>
    {#if $landingZoneError}
        <div class="alert alert-error alert-message">
            {$landingZoneError}
        </div>
    {/if}
    {#if $isLandingZoneLoading}
        <ProgressBar label="Loading page data" rounded="rounded-full" meter="bg-secondary-500" track="bg-secondary-500/30" height="h4" />
    {/if}
    {#each $allLandingZones as lz}
        <div>
            {lz.name}
        </div>
    {/each}
</div>