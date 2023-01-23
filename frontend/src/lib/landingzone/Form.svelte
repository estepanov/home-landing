<script lang="ts">
  // import { writable } from "svelte/store"
  // import Input from "../form/Input.svelte"

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

  // const { form, errors, state, handleChange, handleSubmit, handleReset, isValid } =
  //   createForm({
  //     initialValues: {
  //       name: "",
  //       bookmarks: [makeBookmark()],
  //     },
  //     validationSchema: yup.object().shape({
  //       bookmarks: yup.array().of(
  //         yup.object().shape({
  //           id: yup.string().required(),
  //           name: yup.string().required(),
  //           url: yup.string().required(),
  //         })
  //       ),
  //     }),
  //     onSubmit: (values) => {
  //       alert(JSON.stringify(values))
  //     },
  //   })

  const add = () => {
    // const newBookmark = makeBookmark()
    // $form.bookmarks = $form.bookmarks.concat(newBookmark)
  }

  const remove = (idToRemove: string) => () => {
    // $form.bookmarks = $form.bookmarks.filter(({ id }) => id !== idToRemove)
  }
</script>
<p>not ready yet</p>
<!-- <form>
  <h2>General</h2>
  <Input
    label="Name"
    name="name"
    on:change={handleChange}
    on:blur={handleChange}
    bind:value={$form.name}
  />
  {#if $errors.name}
    <small class="error">{$errors.name}</small>
  {/if}
  <h2>Bookmarks</h2>
<div class="bg-primary-100-900-token space-y-2">
    {#each $form.bookmarks as bookmark, bmIndex (bookmark.id)}
      <div class="form-group grid grid-cols-5 gap-4">
        <div class="col-span-2">
          <Input
            label="Name"
            name={`bookmarks[${bmIndex}].name`}
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.bookmarks[bmIndex].name}
          />
          {#if $errors.bookmarks[bmIndex]?.name}
            <small class="error">{$errors.bookmarks[bmIndex].name}</small>
          {/if}
        </div>
        <div class="col-span-2">
          <Input
            label="URL"
            name={`bookmarks[${bmIndex}].url`}
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={$form.bookmarks[bmIndex].url}
          />
          {#if $errors.bookmarks[bmIndex]?.url}
            <small class="error">{$errors.bookmarks[bmIndex].url}</small>
          {/if}
        </div>
        <div class="col-span-1 flex flex-col items-start justify-end">
          {#if $form.bookmarks.length !== 1}
          <button type="button" class="btn btn-filled-tertiary btn-sm h-full" on:click={remove(bookmark.id)}>Remove</button>
          {/if}
        </div>
      </div>
  
      {#if bmIndex === $form.bookmarks.length - 1}
        <button type="button" class="btn btn-filled-secondary btn-sm" on:click={add}>+ Add Bookmark</button>
      {/if}
    {/each}
</div>
>
  <div class="button-group space-x-4 mt-4">
    <button type="button" class="btn btn-filled-primary" disabled={!$isValid} on:click={handleSubmit}>submit</button>
    <button type="button" class="btn btn-outline-primary" on:click={handleReset}>reset</button>
  </div>
</form> -->
