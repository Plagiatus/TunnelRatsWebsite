<script lang="ts">
    import { goto } from "$app/navigation";
    import { waitMs } from "$lib/client/utils.svelte";
    import { onMount } from "svelte";

    async function forward() {
        await waitMs(2000);
        goto("/");
    }

    onMount(()=>{
        forward();
    })
</script>

<h1>Email Verified</h1>

<p>You'll be forwarded shortly.</p>
