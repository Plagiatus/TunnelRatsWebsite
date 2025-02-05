<script lang="ts">
    import type { Action } from "svelte/action";

    let { fileInput }: { fileInput: (files: FileList) => void } = $props();

    let dropContainer: HTMLLabelElement;
    let highlight: boolean = $state(false);
    // svelte-ignore non_reactive_update
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
        if (!droppedFiles) return;
        fileInput(droppedFiles);
    }
    function inputFiles(_e: Event) {
        fileInput(files);
    }
</script>

<label
    id="dropContainer"
    use:initDropContainer
    bind:this={dropContainer}
    class={[{ highlight }]}
    for="hotbars"
>
    Drop your hotbar.nbt or command_storage_*.dat here or
    <div id="dropContainerClick">click here</div>
    to select the file(s).
    <input
        type="file"
        name="hotbars"
        id="hotbars"
        hidden
        bind:files
        onchange={inputFiles}
        accept=".nbt, .dat"
        multiple
    />
</label>

<style>
    #dropContainer {
        border: 2px dotted orange;
        margin: 1em;
        padding: 1em;
        border-radius: 1em;
        display: grid;
        place-items: center;
        cursor: pointer;
    }

    #dropContainerClick {
        background-color: orange;
        padding: 0.25em 0.75em;
        border-radius: 1em;
    }
    #dropContainer.highlight {
        background-color: rgb(255, 165, 0, 0.5);
    }
</style>
