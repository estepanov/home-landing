<script module="ts">
  import "./theme.postcss"
  import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
  // import "@skeletonlabs/skeleton/themes/theme-skeleton.css"
  import "@skeletonlabs/skeleton/styles/all.css"
  import { LightSwitch, Modal, ProgressRadial } from "@skeletonlabs/skeleton"
  import { onMount } from "svelte"
  import Login from "./lib/auth/Login.svelte"
  import DateString from "./lib/widgets/DateString.svelte"
  import DatOfWeek from "./lib/widgets/DatOfWeek.svelte"
  import Time from "./lib/widgets/Time.svelte"
  import { checkCurrentUser, isAuthenticated } from "./stores/auth"
  import TriggerButton from "./lib/settings/TriggerButton.svelte"
  import {
    getPrimaryLandingZone,
    primaryLandingZone,
    isPrimaryLandingZoneLoading
  } from "./stores/landingZones"
    import Bookmarks from "./lib/widgets/Bookmarks.svelte"
    import EditTriggerModal from "./lib/landingzone/EditTriggerModal.svelte"
    import { fade } from "svelte/transition"
  onMount(() => {
    checkCurrentUser().then(async (data) => {
      console.log("data", data)
      if (data) {
        const res = await getPrimaryLandingZone()
        console.log("res", res)
      }
    })
  })

  let date = new Date()

  onMount(() => {
    const interval = setInterval(() => {
      date = new Date()
    }, 1000)
    return () => clearInterval(interval)
  })

  onMount(() => {
    const isDarkModeSet = localStorage.getItem("storeLightSwitch") === "true"
    const hasDarkModeClass = document.documentElement.classList.contains("dark")
    if(isDarkModeSet && !hasDarkModeClass) {
      document.documentElement.classList.add("dark")
    }
  })
</script>

<main 
  class="bg-gradient-to-bl from-primary-500 to-transparent h-full w-full"
  class:from-primary-500={!$primaryLandingZone || !$primaryLandingZone.background}
  class:from-secondary-500={$primaryLandingZone?.background === "secondary"}

>
  <div class="p-5 pt-36">
    {#if !$isAuthenticated}
      <Login />
    {:else if $primaryLandingZone}
      <div>
        <Bookmarks bookmarks={$primaryLandingZone.bookmarks} />
      </div>
    {/if}
  </div>
  <div
    class="absolute top-5 right-5 flex flex-col justify-center items-end space-y-1"
  >
    <Time {date} />
    <DateString {date} />
    <DatOfWeek {date} />
  </div>

  <div
    class="absolute bottom-5 right-5 flex flex-row space-x-4 justify-center items-center"
  >
    {#if $isAuthenticated}
      {#if $isPrimaryLandingZoneLoading}
        <div transition:fade>
          <ProgressRadial stroke={200} meter="stroke-primary-600 dark:stroke-primary-400" track="stroke-white dark:stroke-black" class="w-6 h-6 mx-1"  />
        </div>
      {/if} 
      {#if $primaryLandingZone}
        <div class="text-sm font-bold text-token">
          {$primaryLandingZone.name}
        </div>
        <EditTriggerModal landingZone={$primaryLandingZone} />
      {/if}
      <TriggerButton />
    {/if}
    <LightSwitch />
  </div>
</main>

<Modal />
