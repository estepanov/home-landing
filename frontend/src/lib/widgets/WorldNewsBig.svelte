<script lang="ts">
  import { onMount } from "svelte"
  import { getWorldNews, worldNews } from "../../stores/news"
  import { fade } from "svelte/transition"

  onMount(() => {
    getWorldNews().then((data) => {
      console.log("world news", data)
    })
  })
</script>

{#if $worldNews}
<div transition:fade|local class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-4">
  {#each $worldNews.items as newsItem (newsItem.url)}
  <a class="card card-hover variant-glass-surface" href={newsItem.url}>
    <header class="card-header">
      <span class="font-bold text-base sm:text-md text-primary-600-300-token">{newsItem.name}</span>
    </header>
    <div class="p-4">
      <span class="block text-base">{newsItem.description}</span>
    </div>
    <footer class="card-footer">
      <span class="text-sm text-surface-400-500-token">{new Date(newsItem.datePublished).toLocaleString()}</span>
    </footer>
      <!-- <img src={news.urlToImage} alt={news.title} /> -->
  </a>
  {/each}
</div>
<div class="text-sm font-extrabold my-2">
  World news last fetched {new Date($worldNews.lastCheckedDate).toLocaleString()}
</div>
{/if}
