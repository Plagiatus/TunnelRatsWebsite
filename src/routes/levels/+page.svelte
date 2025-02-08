<script lang="ts">
    import type { LevelInDB } from "$lib/server/db/repositories/LevelRepository";
    import LevelInList from "cmp/LevelInList.svelte";

    let { data }: { data: { levels: LevelInDB[] } } = $props();
</script>

<svelte:head>
    <title>Levels - Tunnel Rats</title>
</svelte:head>

<h1>Browse / Search Levels</h1>
{#each data.levels as level}
    <LevelInList {level} />
{/each}
