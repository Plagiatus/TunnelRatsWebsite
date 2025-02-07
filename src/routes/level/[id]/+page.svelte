<script lang="ts">
    import Level from "cmp/Level.svelte";

    let { data } = $props();
</script>

{#if data.level}
    <Level level={data.level} />
{:else}
    <h1>Level not found</h1>
{/if}
