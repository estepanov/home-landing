<script lang="ts">
  import { TabGroup, Tab } from "@skeletonlabs/skeleton"
  import { writable, type Writable } from "svelte/store"
    import { fade, slide } from "svelte/transition"
  import Logout from "../auth/Logout.svelte"
  import Form from "../landingzone/Form.svelte"
  import LzList from "./LZList.svelte"
  const storeTab: Writable<string> = writable("list")
</script>

<div>
  <TabGroup selected={storeTab}>
    <Tab value="list">Landing Zones</Tab>
    <Tab value="create">Create New</Tab>
    <Tab value="session">Session</Tab>
  </TabGroup>

  <div class="p-2" transition:fade={{delay: 100}}>
    {#if $storeTab === "list"}
    <div transition:slide|local={{delay: 100}}>
      <LzList />
    </div>
    {/if}
    {#if $storeTab === "create"}
    <div transition:slide|local={{delay: 100}}>
      <Form />
    </div>
    {/if}
    {#if $storeTab === "session"}
    <div transition:slide|local={{delay: 100}}>
      <Logout />
    </div>
    {/if}
  </div>
</div>
