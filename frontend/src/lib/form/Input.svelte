<script lang="ts">
  import type { InputProps } from "./types"
  export let label: string = ""
  export let id: string = ""
  interface $$Props extends InputProps {
    label: string
    id: string
  }
</script>

<label class="inline-block text-surface-900-50 space-y-1">
  <span>
    {label}
  </span>
  <input
  type="text"
  {...$$restProps}
  />
</label>
