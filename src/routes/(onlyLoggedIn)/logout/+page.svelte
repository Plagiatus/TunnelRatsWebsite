<script lang="ts">
    import { invalidateAll, goto } from "$app/navigation";
    import { waitMs } from "$lib/client/utils.svelte";
    import { onMount } from "svelte";

    async function logout() {
        await waitMs(1000);
        await invalidateAll();
        goto("/");
    }

    onMount(()=>{
        logout();
    });

</script>

<svelte:head>
    <title>Logout...</title>
</svelte:head>

<h1>Logout</h1>

<p>Logging you out. If this page is visible for more than a few seconds, please reload.</p>