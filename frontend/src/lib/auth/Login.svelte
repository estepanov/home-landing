<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton"
  import { login, authError, isAuthenticating } from "../../stores/auth"
  import Input from "../form/Input.svelte"

  function onSubmit(e) {
    if ($isAuthenticating) return
    $authError = null
    const formData = new FormData(e.target)
    const username = formData.get("username")
    const password = formData.get("password")
    login(
      formData.get("username") as string,
      formData.get("password") as string
    )
  }
</script>

<div class=" max-w-md w-ful">
  <form on:submit|preventDefault={onSubmit} class="space-y-2 p-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-2xl">
    {#if $authError}
      <div class="alert alert-error" transition:fade|local={{ duration: 200 }}>
        <div class="alert-message">
          <h2>Woops...</h2>
          <p class="text-xs">{$authError}</p>
        </div>
      </div>
    {/if}
    <Input
      label="Username"
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
      autocomplete="current-password"
      required
      disabled={$isAuthenticating}
    />
  </form>
  <button
    type="submit"
    class="btn btn-filled-primary btn-base text-sm uppercase mt-4 px-8"
    disabled={$isAuthenticating}>sign in</button
  >
  {#if $isAuthenticating}
    <ProgressBar label="Checking credentials..." rounded="rounded-full" meter="bg-primary-500" track="bg-primary-500/30" height="h4"  />
  {/if}
</div>
