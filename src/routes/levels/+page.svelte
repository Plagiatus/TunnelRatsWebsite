<script lang="ts">
    import LevelInList from "cmp/LevelInList.svelte";
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Levels - Tunnel Rats</title>
</svelte:head>

<h1>Browse / Search Levels</h1>
{#each data.levels as level}
    <LevelInList {level} />
{/each}
