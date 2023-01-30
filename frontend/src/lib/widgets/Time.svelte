<script lang="ts">

  export let date = new Date()

  $: time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
</script>

<div class="text-4xl font-extrabold">
{time}
</div>