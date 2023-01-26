<script lang="ts">
  import { writable } from "svelte/store"
  import Input from "../form/Input.svelte"
  import { Stepper, Step } from "@skeletonlabs/skeleton"
    import { postLandingZone, isLandingZoneLoading, putLandingZone, LandingZone, primaryLandingZone } from "../../stores/landingZones"
  const active = writable(0)

  const getId = () => {
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16)
  }
  interface Bookmark {
    name: string
    url: string
    id: string
  }

  const makeBookmark = (name = "", url = ""): Bookmark => {
    return {
      name,
      url,
      id: getId(),
    }
  }
  export let onSave: ()=>void = () => {}
  export let landingZone: LandingZone|null = null
  export let mode: "create" | "edit" = "create";

  let name = landingZone?.name || ""
  $: isValidName = name?.trim()?.length >= 1

  $: error = ""
  $: success = ""

  let bookmarks = landingZone?.bookmarks || [makeBookmark()]

  const addBookmark = () => {
    bookmarks = [...bookmarks, makeBookmark()]
  }

  const removeBookmark = (id: string) => () => {
    bookmarks = bookmarks.filter((b) => b.id !== id)
  }

  const onComplete: any = () => {
    const newItem = {
      homePageId: mode === "edit" ? landingZone?.homePageId : undefined,
      name,
      bookmarks,
    }
    console.log(newItem)
    if(!$isLandingZoneLoading) {
      const actionPromise = mode === "create" ? postLandingZone : putLandingZone
      actionPromise(newItem)
        .then((record) => {
          if(mode === "edit") {
            if($primaryLandingZone?.homePageId === newItem.homePageId) {
              primaryLandingZone.set(record.landingZone)
            }
            onSave()
          } 
          active.set(0)
          console.log('record',record)
          success = `${newItem.name} was created successfully.`
          name = ""
          bookmarks = [makeBookmark()]
        })
        .catch((err) => {
          console.log(err)
          error = err?.response?.data?.error || err?.message
        })

    }
  }
</script>
{#if error.length > 0}
  <div class="alert variant-ghost-error my-2">
    {error}
  </div>
{/if}
{#if success.length > 0}
  <div class="alert variant-ghost-success my-2">
    {success}
  </div>
{/if}

<Stepper {active} length={2} on:complete={onComplete} buttonTextComplete={mode === "edit" ? "Update" : "Create"}>
  <Step index={0} locked={!isValidName}>
    <svelte:fragment slot="header">Name</svelte:fragment>
    <Input
      label="What do you want to call this landing page?"
      name="name"
      required
      bind:value={name}
    />
  </Step>
  <Step index={1} locked={$isLandingZoneLoading}>
    <svelte:fragment slot="header">Bookmarks</svelte:fragment>
    {#each bookmarks as bookmark, bmIndex (bookmark.id)}
      <div class="form-group grid grid-cols-5 gap-4">
        <div class="col-span-2">
          <Input
            required
            label="Name"
            name={`bookmarks[${bmIndex}].name`}
            bind:value={bookmarks[bmIndex].name}
          />
          <!-- {#if $errors.bookmarks[bmIndex]?.name}
          <small class="error">{$errors.bookmarks[bmIndex].name}</small>
        {/if} -->
        </div>
        <div class="col-span-2">
          <Input
            required
            label="URL"
            name={`bookmarks[${bmIndex}].url`}
            bind:value={bookmarks[bmIndex].url}
          />
          <!-- {#if $errors.bookmarks[bmIndex]?.url}
          <small class="error">{$errors.bookmarks[bmIndex].url}</small>
        {/if} -->
        </div>
        <div class="col-span-1 flex flex-col items-start justify-end">
          <button
            type="button"
            class="btn-icon variant-ghost-error btn-sm p-1"
            on:click|preventDefault={removeBookmark(bookmark.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button
          >
        </div>
      </div>
    {/each}
    {#if bookmarks.length < 10}
      <button
        type="button"
        class="btn variant-soft-secondary"
        on:click|preventDefault={addBookmark}>+ Add Bookmark</button
      >
    {/if}
  </Step>
</Stepper>
