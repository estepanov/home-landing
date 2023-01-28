<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton"
  import { onMount } from "svelte"
  import { fade, slide, fly } from "svelte/transition"
  import {
    getAndSetAllLandingZones,
    allLandingZones,
    landingZoneError,
    isLandingZoneLoading,
    setPrimaryLandingZone,
    isSetPrimaryLZLoading,
    primaryLandingZone,
    deleteLandingZone,
  } from "../../stores/landingZones"
  // import EditModal from "../landingzone/EditModal.svelte"

  onMount(() => {
    getAndSetAllLandingZones()
  })
</script>

<div>
  {#if $landingZoneError}
    <div transition:slide class="alert alert-error alert-message">
      {$landingZoneError}
    </div>
  {/if}
  <div>
    {#each $allLandingZones as lz (lz.homePageId)}
      <div
        class="flex my-2 py-2 px-4 bg-surface-200-700-token rounded-md border-2 border-transparent flex-col sm:flex-row hover:bg-surface-100-800-token hover:border-2 text-sm sm:text-base sm:hover:text-xl transition-all hover:border-surface-200-700-token"
      >
        <div
          class="flex items-center sm:mb-0"
          class:mb-1={$primaryLandingZone?.homePageId !== lz.homePageId}
        >
          <div class="font-bold flex items-center overflow-hidden">
            {lz.name}
          </div>
          <div class="flex items-center">
            {#if $primaryLandingZone?.homePageId === lz.homePageId}
              <span
                transition:fade
                class="text-primary-500 bg-white dark:bg-black py-1 px-3 text-xs rounded-sm mx-4 uppercase font-light"
                >Current</span
              >
            {/if}
          </div>
        </div>
        {#if $primaryLandingZone?.homePageId !== lz.homePageId}
          <div transition:fade class="flex justify-end flex-1 space-x-2">
            <button
              transition:fly|fade={{ x: -50, delay: 10 }}
              class="btn variant-filled-warning transition-all btn-sm py-1"
              class:opacity-50={$isLandingZoneLoading || $isSetPrimaryLZLoading}
              disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading}
              type="button"
              on:click|preventDefault={() =>
                deleteLandingZone(lz.homePageId).then(() =>
                  getAndSetAllLandingZones()
                )}
            >
              Delete
            </button>
            <button
              transition:fly|fade={{ x: -50, delay: 10 }}
              class="btn variant-filled-primary btn-sm transition-all py-1"
              class:opacity-50={$isLandingZoneLoading || $isSetPrimaryLZLoading}
              disabled={$isLandingZoneLoading || $isSetPrimaryLZLoading}
              type="button"
              on:click|preventDefault={() => setPrimaryLandingZone(lz)}
            >
              Set as current
            </button>
            <!-- <EditModal landingZone={lz}>Edit</EditModal> -->
          </div>
        {/if}
      </div>
    {/each}
  </div>
  {#if $isLandingZoneLoading}
    <div class="mt-4" transition:slide>
      <ProgressBar
        label={$allLandingZones.length ? undefined : "Fetching landing zones"}
        meter="bg-primary-500"
        track="bg-surface-200-700-token"
        height={$allLandingZones.length ? "h-2" : "h-4"}
      />
    </div>
  {/if}
</div>
