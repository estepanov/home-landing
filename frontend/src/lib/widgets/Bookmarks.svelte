<script lang="ts">
  import { Bookmark } from "../../stores/landingZones"
  import { slide } from "svelte/transition"

  export let bookmarks: Bookmark[] = []
</script>

<div>
  <ul transition:slide|local class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
    {#each bookmarks as bookmark (bookmark.id)}
      <li>
        <a 
          class="flex justify-center items-center bg-white/30 dark:bg-black/30 h-24 text-md md:text-xl rounded-lg no-underline decoration-0 hover:scale-105 hover:bg-white/60 hover:dark:bg-black/60 transition-all font-semibold tracking-wider" 
          href={bookmark.url}
        >
            {bookmark.name}
        </a>
      </li>
    {/each}
  </ul>
</div>
