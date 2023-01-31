<script lang="ts">
  import { fade } from "svelte/transition"
  export let newsItems = []
  export let name = ""
  export let date
</script>

<div class="my-4 p-4 space-y-4 rounded card variant-soft-primary" transition:fade|local>
  <div class="">
    <span class="text-xl font-extrabold">{name}</span>
    {#if date}
    <span class="text-sm text-primary-400-500-token ml-2 italic">
      as of {new Date(date).toLocaleString()}
    </span>
    {/if}
  </div>
  <div transition:fade|local class="grid grid-cols-1 divide-y divide-primary-200 dark:divide-primary-700">
    {#each newsItems as newsItem (newsItem.url)}
        <!-- <div class="text-base sm:text-md py-2">{newsItem.name}</div> -->
        <a class="!text-black dark:!text-white !no-underline hover:!underline sm:text-md py-2" target="_blank" href={newsItem.url}>{newsItem.name}</a>
    {/each}
  </div>
</div>
