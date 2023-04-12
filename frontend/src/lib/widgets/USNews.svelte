<script lang="ts">
  import { onMount } from "svelte"
  import { getUSNews, usNews } from "../../stores/news" 
  import NewsContainer from "./NewsContainer.svelte"

  onMount(() => {
    getUSNews().then((data) => {
      console.log("us news", data)
    })
  })
</script>

{#if $usNews}
  <NewsContainer newsItems={$usNews.items} name="US News" date={$usNews.lastCheckedDate} />
{/if}
