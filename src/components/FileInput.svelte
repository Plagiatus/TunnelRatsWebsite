<script lang="ts">
    import type { Action } from "svelte/action";
    import * as nbt from "prismarine-nbt";

    let dropContainer: HTMLDivElement;
    let highlight: boolean = false;
    let files: FileList;

    const initDropContainer: Action = (node) => {
        node.addEventListener("dragenter", handleDrag);
        node.addEventListener("dragleave", handleDrag);
        node.addEventListener("dragover", handleDrag);
        node.addEventListener("drop", handleDrag);
        node.addEventListener("drop", handleDrop);
    };

    function handleDrag(_e: DragEvent) {
        _e.preventDefault();
        _e.stopPropagation();
        switch (_e.type) {
            case "dragenter":
            case "dragover": {
                highlight = true;
                break;
            }
            case "drop":
            case "dragleave": {
                highlight = false;
                break;
            }
        }
    }

    function handleDrop(_e: DragEvent) {
        const data = _e.dataTransfer;
        const droppedFiles = data?.files;
        loadFiles(droppedFiles);
    }
    function fileInput(_e: Event) {
        loadFiles(files);
    }

    function loadFiles(files: FileList | undefined) {
        if (!files) return;
        for (const file of files) {
            if (file.name === "hotbar.nbt") {
                readNBTFile(file);
            }
        }
    }

    async function readNBTFile(file: File) {
        const reader = new FileReader();
        const buffer = await file.arrayBuffer();
        const { parsed, type } = await nbt.parse(buffer);
        console.log({ parsed, type });
    }
</script>

<div
    id="dropContainer"
    use:initDropContainer
    bind:this={dropContainer}
    class={[{ highlight }]}
>
    Drop your hotbars here or
    <label id="dropContainerClick" for="hotbars"> click here </label>
    <input
        type="file"
        name="hotbars"
        id="hotbars"
        hidden
        bind:files
        onchange={fileInput}
        accept=".nbt"
    />
</div>

<style>
    #dropContainer {
        border: 2px dotted orange;
        margin: 1em;
        padding: 1em;
        border-radius: 1em;
        display: grid;
        place-items: center;
    }

    #dropContainerClick {
        background-color: orange;
        padding: 0.25em 0.75em;
        border-radius: 1em;
        cursor: pointer;
    }
    #dropContainer.highlight {
        background-color: rgb(255, 165, 0, 0.5);
    }
</style>
