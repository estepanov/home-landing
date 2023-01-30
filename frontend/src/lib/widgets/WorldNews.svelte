<script lang="ts">
  import { onMount } from "svelte"
  import { getWorldNews, worldNews } from "../../stores/news"

  onMount(() => {
    getWorldNews().then((data) => {
      console.log("world news", data)
    })
  })
</script>

{#if $worldNews}
<div class="text-sm font-extrabold">
  {new Date($worldNews.lastCheckedDate).toLocaleString()}
</div>
<div>
  {#each $worldNews.items as newsItem (newsItem.url)}
  <a href={newsItem.url}>
    <span class="block">{newsItem.name}</span>
    <span class="block text-on-primary-token">{newsItem.description}</span>
    <!-- <img src={news.urlToImage} alt={news.title} /> -->
  </a>
  {/each}
</div>
{/if}
