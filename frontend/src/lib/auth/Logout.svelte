
<script lang="ts">
    import { modalStore } from "@skeletonlabs/skeleton"
    import { logout } from "../../stores/auth"

    function logoutSequence(): void {
        logout()
        modalStore.clear();
    }
</script>

<button type="button" on:click|preventDefault={logoutSequence} class="py-2 px-2 text-xs rounded-none underline">Logout</button>