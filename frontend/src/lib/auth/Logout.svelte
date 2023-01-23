<script lang="ts">
    import { logout } from "../../stores/auth"
</script>

<button type="button" on:click|preventDefault={logout} class="py-2 px-2 text-xs rounded-none underline">Logout</button>