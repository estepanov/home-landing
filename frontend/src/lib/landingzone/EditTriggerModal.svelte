<script lang="ts">
    import { ModalComponent, ModalSettings, modalStore } from "@skeletonlabs/skeleton"
    import { LandingZone } from "../../stores/landingZones"
    import Form from "./Form.svelte"

    export let landingZone: LandingZone

    function triggerCustomModal(): void {
	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: Form,
		// Add your props as key/value pairs
		props: { 
            mode: "edit",
            landingZone,
            onSave: () => {
                modalStore.clear();
            }
        },
		// Provide default slot content as a template literal
		// slot: '<p>Skeleton</p>'
	};
	const d: ModalSettings = {
		type: 'component',
		// NOTE: title, body, response, etc are supported!
		component: modalComponent,
		// Pass abitrary data to the component
        meta:{}
	};
    modalStore.clear();
	modalStore.trigger(d);
	
}
</script>

<button class="btn-icon variant-soft-primary p-1 hover:bg-primary-500 hover:text-white" on:click={triggerCustomModal}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
</button>