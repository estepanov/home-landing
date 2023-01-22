<script lang="ts">
  import { login, authError } from "../../stores/auth"
  import Input from "../form/Input.svelte"

  function onSubmit(e) {
    $authError = null
    const formData = new FormData(e.target)
    const username = formData.get('username')
    const password = formData.get('password')
    login(formData.get('username') as string, formData.get('password') as string)
  }
</script>

<div class="w-6/12 p-4 bg-surface-50-900-token rounded-md">
  <form on:submit|preventDefault={onSubmit} class="space-y-2">
    {#if $authError}
      <div class="alert alert-error">
          <h3 class="alert-message">Woops...</h3>
          <p class="text-xs">{$authError}</p>
      </div>
    {/if}
    <Input label="Username" id="username" name="username" autocomplete="username" required />
    <Input label="Password" id="password" name="password" type="password" autocomplete="current-password" required/>
    <button type="submit" class="btn btn-filled-primary btn-base text-white text-sm uppercase">submit</button>
  </form>
</div>
