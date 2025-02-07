<script lang="ts">
    import { importLevel, type LevelToDisplay } from "$lib/import/main";
    import type { CompoundTag } from "nbtify";

    let { level }: { level?: LevelToDisplay } = $props();
</script>

{#if level}
    <div class="level">
        <span class="level-name">{level.name}</span>
        <span class="level-info level-sections">sections: {level.level.sections}</span>
        <span class="level-info level-size">width: {level.level.width}</span>
        <span class="level-info level-version">v{level.version}</span>
    </div>
{/if}

<style>
    .level {
        border-radius: 1em;
        padding: 1em;
        border: 1px solid black;
        display: grid;
        grid-template-areas: "name name name" "sections size version";
        gap: 1em;
    }

    .level-name {
        font-size: larger;
        grid-area: name;
    }
    .level-version {
        color: gray;
        grid-area: version;
    }
    .level-sections {
        color: gray;
        grid-area: sections;
    }
    .level-size {
        color: gray;
        grid-area: size;
    }
</style>
