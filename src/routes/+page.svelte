<script lang="ts">
    import { importLevel, type LevelToDisplay } from "$lib/import/main";
    import { findLevelsInHotbar, findLevelsInStorageDat, readNBTFile } from "$lib/nbtReader";
    import type { CompoundTag } from "nbtify";
    import FileInput from "../components/FileInput.svelte";
    import Level from "../components/Level.svelte";

    let importedLevels: CompoundTag[] = $state([]);

    async function loadFiles(files: FileList | undefined) {
        if (!files) return;
        const foundLevels: LevelToDisplay[] = [];
        for (const file of files) {
            if (file.name.endsWith(".nbt")) {
                const data = await readNBTFile(file);                
                const levels = findLevelsInHotbar(data);
                importedLevels.push(...levels);
            } else if(file.name.endsWith(".dat")){
                const data = await readNBTFile(file);
                const levels = findLevelsInStorageDat(data);
                importedLevels.push(...levels);
            }
        }
    }
</script>

<svelte:head>
    <title>Tunnel Rats Map Sharer</title>
</svelte:head>

<h1>Tunnel Rats Map Sharer</h1>
<FileInput fileInput={loadFiles} />

<div class="foundLevelWrapper">
    {#each importedLevels as level}
        <Level {level} />
    {/each}
</div>

<style>
    .foundLevelWrapper {
        display: flex;
    }
</style>