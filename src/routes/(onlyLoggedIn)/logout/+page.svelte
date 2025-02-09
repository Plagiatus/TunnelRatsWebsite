<script lang="ts">
    import { invalidateAll, goto } from "$app/navigation";

    async function logout() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await invalidateAll();
        goto("/");
    }

    logout();

</script>

<svelte:head>
    <title>Logout...</title>
</svelte:head>

<h1>Logout</h1>

<p>Logging you out. If this page is visible for more than a few seconds, please reload.</p>