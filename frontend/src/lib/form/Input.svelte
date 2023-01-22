<script lang="ts">
  import type { InputProps } from "./types"
  export let label: string = ""
  export let id: string = ""
  interface $$Props extends InputProps {
    label: string
    id: string
  }
</script>

<div class="space-y-1">
  <label for={id} class="inline-block text-surface-900-50">
    {label}
  </label>
  <input
    type="text"
    class="rounded-none"
    id={id}
    {...$$restProps}
  />
</div>
