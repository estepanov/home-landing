<script lang="ts">
  import { Bookmark } from "../../stores/landingZones"
  import { fade } from "svelte/transition"

  export let bookmarks: Bookmark[] = []
  
  const addProtocolToLink = (url: string) => {
    if (!url || !url.trim().length) return "#"
    if (!url.startsWith("http")) {
      return "https://" + url
    }
    return url
  }

</script>

<div>
  <ul transition:fade|local class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
    {#each bookmarks as bookmark (bookmark.id)}
      <li>
        <a 
          class="flex flex-row justify-center items-center card py-4 text-md md:text-xl rounded-sm decoration-0 transition-all font-semibold tracking-wider !no-underline" 
          href={addProtocolToLink(bookmark.url)}
        >
          <!-- <span class="block pr-4">
            <img 
              src="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={addProtocolToLink(bookmark.url)}&size=32"
              alt="{bookmark.name} favicon"
              class="w-8 h-8 rounded-full grayscale" 
            />
          </span> -->
          <span class="block">
            {bookmark.name}
          </span>
        </a>
      </li>
    {/each}
  </ul>
</div>
