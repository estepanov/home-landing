<script lang="ts">
    import { logout } from "../../stores/auth"
</script>

<button type="button" on:click|preventDefault={logout} class="btn btn-filled-primary btn-base">Logout</button>