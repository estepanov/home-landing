<script module="ts">
  import { LightSwitch } from "@skeletonlabs/skeleton"
  import { onMount } from "svelte"
  import Login from "./lib/auth/Login.svelte"
  import Logout from "./lib/auth/Logout.svelte"
  import {
    checkCurrentUser,
    isAuthenticated,
    isAuthenticating,
  } from "./stores/auth"
  onMount(() => {
    checkCurrentUser()
  })

  let date = new Date()
  const MONTH = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  }
  const DAYS = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  }
  $: dayOfWeek = `${DAYS[date.getDay()]}`
  $: dateString = `${
    MONTH[date.getMonth() + 1]
  } ${date.getDate()}, ${date.getFullYear()}`

  $: time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  onMount(() => {
    const interval = setInterval(() => {
      date = new Date()
    }, 1000)
    return () => clearInterval(interval)
  })
</script>

<main class="bg-gradient-to-bl from-primary-500 to-transparent h-full w-full">
  <div class="p-10">
    {#if $isAuthenticated}
      <Logout />
    {/if}
    {#if $isAuthenticating}
      Checking
    {/if}
    {#if !$isAuthenticated && !$isAuthenticating}
      <Login />
    {/if}
  </div>
  <div
    class="absolute top-5 right-5 flex flex-col justify-center items-end space-y-1"
  >
    <div class="text-4xl font-bold text-white">
      {time}
    </div>
    <div class="text-token text-md">
      {dateString}
    </div>
    <div class="text-token text-sm">
      {dayOfWeek}
    </div>
  </div>

  <div class="absolute bottom-5 right-5 flex flex-col justify-center items-end">
    <LightSwitch />
  </div>
</main>
