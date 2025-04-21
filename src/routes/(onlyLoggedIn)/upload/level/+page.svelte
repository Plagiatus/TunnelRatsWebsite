<script lang="ts">
    import { waitMs } from "$lib/client/utils.svelte";
    import type { Level } from "$lib/import/main";
    import type { LevelInDB } from "$lib/server/db/repositories/LevelRepository";
    import type { User } from "$lib/server/db/repositories/UserRepository";
    import LevelInList from "cmp/LevelInList.svelte";
    import { read } from "nbtify";

    let { user }: { user: Partial<User> | undefined } = $props();

    let error = $state("");
    let level: LevelInDB | undefined = $state();
    function messageReceiver(event: MessageEvent) {
        let lvl: Level = event.data;
        level = {
            id: "",
            title: lvl.data.name,
            description: lvl.data.info ?? "",
            author: lvl.data.author,
            image: "",
            versions: [],
            downloads: 401,
            likes: 42,
            owner: user?.id ?? -1,
            tags: [],
        };
    }

    async function startAbortTimer() {
        await waitMs(2000);
        if (!level)
            errorOccured(
                "Something went wrong with loading the level you selected. Please try again.",
            );
    }
    startAbortTimer();

    function errorOccured(_error: string) {
        error = _error;
    }

    function loadImage(_event: Event) {
        let inputElement = _event.target as HTMLInputElement;
        let files = inputElement.files;
        if (!files || files.length == 0) return;
        const reader = new FileReader();
        reader.addEventListener("load", async (data) => {
            if (level && data && data.target && data.target.result)
                level.image = data.target.result as string;
        });
        reader.readAsDataURL(files[0]);
    }
</script>

<svelte:window onmessage={messageReceiver} />

<svelte:head>
    <title>Upload {level?.title} - Tunnel Rats</title>
</svelte:head>

<h1>Create {level?.title}</h1>

<div class="wrapper">
    {#if level}
        <div class="level-setup-wrapper">
            <div class="level-setup">
                <div class="input-wrapper">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        bind:value={level.title}
                        maxlength="32"
                    />
                </div>
                <!-- TODO: add warning if author isn't user -->
                <div class="input-wrapper">
                    <label for="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        bind:value={level.author}
                        maxlength="32"
                    />
                </div>
                <div class="input-wrapper">
                    <label for="info">Description</label>
                    <textarea
                        name="info"
                        id="info"
                        bind:value={level.description}
                    ></textarea>
                </div>
                <div class="input-wrapper">
                    <label for="image"
                        >Image (will be resized to 128x128px)</label
                    >
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        oninput={loadImage}
                    />
                    {#if level.image}
                        <img src={level.image} alt="" id="preview-image" />
                    {/if}
                </div>
                <div class="input-wrapper">
                    <label for="tags">Tags</label>
                    <input type="text" name="tags" id="tags" />
                </div>

                <button>Create</button>
                <button>Cancel</button>
            </div>
            <div>
                <LevelInList {level} link={false} />
            </div>
        </div>
    {:else if error}
        <div class="error-display">{error}</div>
    {:else}
        <div class="loading">Loading...</div>
    {/if}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .level-setup-wrapper {
        display: grid;
        grid-template-columns: 1fr 33%;
        gap: 1em;
    }
    .level-setup {
        gap: 1em;
    }
    .wrapper > div {
        flex-grow: 1;
    }
    .loading,
    .error-display {
        display: grid;
        place-items: center;
        height: 100%;
    }

    #preview-image {
        width: 128px;
        height: 128px;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        margin: 1em 0;
    }

    /* .placeholder {
        animation: placeholder-loading alternate 1s;
    } */

    @keyframes placeholder-loading {
        0% {
            background-color: gray;
        }
        100% {
            background-color: lightgrey;
        }
    }
</style>
