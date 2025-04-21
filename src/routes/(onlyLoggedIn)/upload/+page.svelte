<script lang="ts">
    // import { importLevel, type LevelToDisplay } from "$lib/import/main";
    import {
        findLevelsInHotbar,
        findLevelsInStorageDat,
        readNBTFile,
        type LevelInNBT,
    } from "$lib/nbtReader";
    import type { CompoundTag, StringTag } from "nbtify";
    import FileInput from "cmp/FileInput.svelte";
    import LevelInList from "cmp/LevelInList.svelte";
    import { waitMs } from "$lib/client/utils.svelte";

    let importedLevels: LevelInNBT[] = $state([]);
    let loadedLevels: boolean = $state(false);

    async function loadFiles(files: FileList | undefined) {
        loadedLevels = true;
        if (!files) return;
        for (const file of files) {
            if (file.name.endsWith(".nbt")) {
                const data = await readNBTFile(file);
                const levels = findLevelsInHotbar(data);
                importedLevels.push(...levels);
            } else if (file.name.endsWith(".dat")) {
                const data = await readNBTFile(file);
                const levels = findLevelsInStorageDat(data);
                importedLevels.push(...levels);
            }
        }
    }

    async function startImport(level: LevelInNBT) {
        const newWindow = window.open("/upload/level");
        // await waitMs(2000);
        console.log(
            newWindow?.addEventListener("load", () => {
                newWindow?.postMessage(JSON.parse(JSON.stringify(level)));
            }),
        );
    }
</script>

<svelte:head>
    <title>Upload - Tunnel Rats</title>
</svelte:head>

<h1>Tunnel Rats Map Sharer</h1>
<FileInput fileInput={loadFiles} />

{#if loadedLevels}
    <h2>Found Levels</h2>
    {#if importedLevels.length > 0}
        <p>Found {importedLevels.length} levels in your selected file(s).</p>
        <p>Select the ones you want to upload.</p>
        <div class="foundLevelWrapper">
            {#each importedLevels as level}
                <button
                    class="importableLevel"
                    onclick={() => startImport(level)}
                >
                    {level.data.name} by {level.data.author}
                </button>
            {/each}
        </div>
    {:else}
        <span>No Levels found</span>
    {/if}
{/if}

<style>
    .foundLevelWrapper {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
    }
    .importableLevel {
        cursor: pointer;
    }
</style>
