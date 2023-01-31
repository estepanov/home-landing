<script lang="ts">
  import { onMount } from "svelte"
  import { getWorldNews, worldNews } from "../../stores/news" 
  import NewsContainer from "./NewsContainer.svelte"

  onMount(() => {
    getWorldNews().then((data) => {
      console.log("world news", data)
    })
  })
</script>

{#if $worldNews}
  <NewsContainer newsItems={$worldNews.items} name="World News" date={$worldNews.lastCheckedDate} />
{/if}
