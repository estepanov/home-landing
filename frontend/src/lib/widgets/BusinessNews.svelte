<script lang="ts">
  import { onMount } from "svelte"
  import { getBusinessNews, businessNews } from "../../stores/news" 
  import NewsContainer from "./NewsContainer.svelte"

  onMount(() => {
    getBusinessNews().then((data) => {
      console.log("business news", data)
    })
  })
</script>

{#if $businessNews}
  <NewsContainer newsItems={$businessNews.items} name="Business News" date={$businessNews.lastCheckedDate} />
{/if}
