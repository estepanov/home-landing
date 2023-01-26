<script lang="ts">
  import {slide, fade} from "svelte/transition"
  import { ProgressBar } from "@skeletonlabs/skeleton"
  import { login, authError, isAuthenticating } from "../../stores/auth"
  import Input from "../form/Input.svelte"

  $: username = ""
  $: password = ""

  function onSubmit() {
    if ($isAuthenticating) return
    $authError = null
    login(
      username,
      password
    )
  }
</script>

<div class=" max-w-md w-ful">
  <form on:submit|preventDefault={onSubmit} class="space-y-2 p-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-2xl">
    {#if $authError}
      <div class="alert variant-ghost-error" transition:fade|local={{ duration: 200 }}>
        <div class="alert-message">
          <h2>Woops...</h2>
          <p class="text-xs">{$authError}</p>
        </div>
      </div>
    {/if}
    <Input
      label="Username"
      bind:value={username}
      id="username"
      name="username"
      autocomplete="username"
      required
      disabled={$isAuthenticating}
    />
    <Input
      label="Password"
      id="password"
      name="password"
      type="password"
      bind:value={password}
      autocomplete="current-password"
      required
      disabled={$isAuthenticating}
    />
    <div class="flex flex-row justify-end pt-2">
      <button
        type="submit"
        class="btn btn-sm variant-filled-primary uppercase px-8 block align-end"
        class:opacity-50={$isAuthenticating}
        disabled={$isAuthenticating}>sign in</button
      >
    </div>
    {#if $isAuthenticating}
    <div transition:slide>
      <ProgressBar label="Checking credentials..." rounded="rounded-full" meter="bg-primary-500" track="bg-primary-500/30" height="h-4"  />
    </div>
    {/if}
  </form>
</div>
