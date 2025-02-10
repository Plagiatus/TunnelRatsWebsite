<script lang="ts">
    import type {
        LevelInDB,
        LevelSearchOptions,
    } from "$lib/server/db/repositories/LevelRepository";
    import LevelInList from "./LevelInList.svelte";

    const { searchOptions }: { searchOptions: Partial<LevelSearchOptions> } =
        $props();

    let levels: LevelInDB[] = $state([]);
    $effect(() => {
        const search = new URLSearchParams();
        if (searchOptions.limit)
            search.append("limit", searchOptions.limit.toString());
        if (searchOptions.random) search.append("random", "true");
        if (searchOptions.search) search.append("search", searchOptions.search);
        if (searchOptions.skip)
            search.append("skip", searchOptions.skip.toString());
        if (searchOptions.sort)
            search.append("sort", JSON.stringify(searchOptions.sort));
        if (searchOptions.tags)
            searchOptions.tags.forEach((t) => search.append("tag", t));
        if (searchOptions.versions)
            searchOptions.versions.forEach((v) =>
                search.append("version", v.toString()),
            );
        loadLevels(search);
    });

    async function loadLevels(search: URLSearchParams) {
        console.log("searching", search);
        const response = await fetch("/api/levels?" + search.toString());
        const result = await response.json();
        levels = result;
    }
</script>

<div class="level-list">
    {#each levels as level}
        <LevelInList {level} />
    {/each}
</div>

<style>
    .level-list {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
</style>
