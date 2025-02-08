<script lang="ts">
    import LevelInList from "cmp/LevelInList.svelte";

    let { data } = $props();
</script>

{#if data.level}
    <LevelInList level={data.level} />
{:else}
    <h1>Level not found</h1>
{/if}
