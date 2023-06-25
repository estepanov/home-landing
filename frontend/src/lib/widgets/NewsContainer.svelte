<script lang="ts">
  import { fade } from "svelte/transition"
    import type { NewsItem } from "../../stores/news"
  export let newsItems: NewsItem[] = []
  export let name = ""
  export let date
</script>

<div class="my-4 space-y-4" transition:fade|local>
  <div class="group flex flex-row justify-between items-center">
    <span class="text-xl font-extrabold">{name}</span>
    {#if date}
    <span class="text-xs text-secondary italic opacity-0 group-hover:opacity-100 transition-all">
      as of {new Date(date).toLocaleString()}
    </span>
    {/if}
  </div>
  <ul transition:fade|local class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {#each newsItems as newsItem (newsItem.url)}
      <li class="card p-3 group space-y-4 rounded-lg">
        <div class="flex flex-row justify-between">
          <a class="!no-underline hover:!underline sm:text-md font-bold font-sans leading" target="_blank" rel="noreferrer" href={newsItem.url}>{newsItem.name}</a>
          <div>
            {#each newsItem.provider as provider (provider.name)}
              <span class="badge inline-block rounded-sm mr-1 opacity-60 group-hover:opacity-100 transition-all">{provider.name}</span>
            {/each}
          </div>
        </div>
        <div class="text-sm leading-tight opacity-70 group-hover:opacity-100 transition-all">
          {newsItem.description}
        </div>
      </li>
    {/each}
  </ul>
</div>
