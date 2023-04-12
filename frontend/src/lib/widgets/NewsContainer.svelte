<script lang="ts">
  import { fade } from "svelte/transition"
    import type { NewsItem } from "../../stores/news"
  export let newsItems: NewsItem[] = []
  export let name = ""
  export let date
</script>

<div class="my-4 space-y-4" transition:fade|local>
<!-- <div class="my-4 p-4 space-y-4 rounded-2xl card variant-soft-primary" transition:fade|local> -->
  <div class="group flex flex-row justify-between items-center">
    <span class="text-xl font-extrabold">{name}</span>
    {#if date}
    <span class="text-xs text-secondary italic opacity-0 group-hover:opacity-100 transition-all">
      as of {new Date(date).toLocaleString()}
    </span>
    {/if}
  </div>
  <ul transition:fade|local class="space-y-2 md:space-y-4">
    {#each newsItems as newsItem (newsItem.url)}
      <li class="card p-4 rounded-lg space-y-2 group">
        <div class="flex flex-row justify-between">
          <a class="!no-underline hover:!underline sm:text-md bg-slate-200-700-token font-bold font-sans leading" target="_blank" rel="noreferrer" href={newsItem.url}>{newsItem.name}</a>
          <div>
            {#each newsItem.provider as provider (provider.name)}
              <span class="badge inline-block rounded-sm mr-1 opacity-60 group-hover:opacity-100 transition-all">{provider.name}</span>
            {/each}
          </div>
        </div>
        <div class="text-sm leading-tight">
          {newsItem.description}
        </div>
      </li>
    {/each}
  </ul>
</div>
