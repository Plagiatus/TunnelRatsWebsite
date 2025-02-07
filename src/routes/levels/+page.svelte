<script lang="ts">
    import type { LevelToDisplay } from "$lib/import/main";
    import Level from "cmp/Level.svelte";

    let { data }: { data: { levels: LevelToDisplay[] } } = $props();
</script>

<svelte:head>
    <title>Levels - Tunnel Rats</title>
</svelte:head>

<h1>Browse / Search Levels</h1>
{#each data.levels as level}
    <Level {level} />
{/each}
