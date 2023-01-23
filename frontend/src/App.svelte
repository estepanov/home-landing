<script module="ts">
  import { LightSwitch, Modal } from "@skeletonlabs/skeleton"
  import { onMount } from "svelte"
  import Login from "./lib/auth/Login.svelte"
  import DateString from "./lib/widgets/DateString.svelte"
  import DatOfWeek from "./lib/widgets/DatOfWeek.svelte"
  import Time from "./lib/widgets/Time.svelte"
  import {
    checkCurrentUser,
    isAuthenticated
  } from "./stores/auth"
    import TriggerButton from "./lib/settings/TriggerButton.svelte"
  onMount(() => {
    checkCurrentUser()
  })

  let date = new Date()

  onMount(() => {
    const interval = setInterval(() => {
      date = new Date()
    }, 1000)
    return () => clearInterval(interval)
  })
</script>

<main class="bg-gradient-to-bl from-primary-500 to-transparent h-full w-full">
  <div class="p-5 pt-36">
    {#if !$isAuthenticated}
      <Login />
    {/if}
  </div>
  <div
    class="absolute top-5 right-5 flex flex-col justify-center items-end space-y-1"
  >
    <Time {date} />
    <DateString {date} />
    <DatOfWeek {date} />
  </div>

  <div class="absolute bottom-5 right-5 flex flex-row space-x-4 justify-center items-center">
    {#if $isAuthenticated}
      <TriggerButton />
    {/if}
    <LightSwitch />
  </div>
</main>

<Modal />
