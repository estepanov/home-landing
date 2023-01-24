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

<button class="btn btn-filled-secondary btn-sm rounded-none" on:click|preventDefault={triggerCustomModal}>
    edit
</button>