<script lang="ts">
  // import type { InputProps } from "./types"
  export let label: string = ""
  export let value: string

  const handleInput = (e) => {
    value = e.target.value
  }
</script>

<label class="inline-block text-surface-900-50 space-y-1">
  <span>
    {label}
  </span>
  <input type="text" on:input={handleInput} bind:value {...$$restProps} />
</label>
