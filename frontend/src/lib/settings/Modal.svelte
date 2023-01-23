<script lang="ts">
  import { TabGroup, Tab } from "@skeletonlabs/skeleton"
  import { writable, type Writable } from "svelte/store"
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

  <div class="p-2">
    {#if $storeTab === "list"}
      <LzList />
    {/if}
    {#if $storeTab === "create"}
      <Form />
    {/if}
    {#if $storeTab === "session"}
      <Logout />
    {/if}
  </div>
</div>
