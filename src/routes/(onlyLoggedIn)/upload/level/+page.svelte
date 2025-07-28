<script lang="ts">
    import { enhance } from "$app/forms";
    import { enhanceLoading, waitMs } from "$lib/client/utils.svelte";
    import type { Level } from "$lib/import/main";
    import type { LevelInDB } from "$lib/server/db/repositories/LevelRepository";
    import LevelInList from "cmp/LevelInList.svelte";
    import type { PageProps } from "./$types";
    import type { User } from "$lib/server/db/repositories/UserRepository";
    import type { LevelInNBT } from "$lib/nbtReader";
    import { type CompoundTag, parse, stringify } from "nbtify";

    let { user, form }: PageProps & { user: Partial<User> } = $props();

    let error = $state("");
    let level: LevelInDB | undefined = $state();
    let rawLevel: LevelInNBT | undefined = $state();
    let loading = enhanceLoading();
    function messageReceiver(event: MessageEvent) {
        rawLevel = parse(event.data) as LevelInNBT;
        console.log(rawLevel);
        level = {
            id: "",
            title: rawLevel.data.name,
            description: rawLevel.data.info ?? "",
            author: rawLevel.data.author,
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

    function cancel() {
        window.close();
    }
</script>

<svelte:window onmessage={messageReceiver} />

<svelte:head>
    {#if error}
        <title>Upload FAILED - Tunnel Rats</title>
    {:else}
        <title>Upload {level?.title} - Tunnel Rats</title>
    {/if}
</svelte:head>

<h1>Create {level?.title}</h1>

<div class="wrapper">
    {#if level}
        <div class="level-setup-wrapper">
            <form
                enctype="multipart/form-data"
                class="level-setup"
                method="POST"
                use:enhance={loading.enhance}
            >
                {#if form?.error}
                    <div class="error">{@html form.error}</div>
                {/if}
                <div class="input-wrapper">
                    <label for="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        bind:value={level.title}
                        maxlength="32"
                        minlength="3"
                        required
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
                        required
                    />
                </div>
                <div class="input-wrapper">
                    <label for="version">Version</label>
                    <input
                        type="text"
                        name="version"
                        id="version"
                        maxlength="24"
                        placeholder="1.0.0"
                        required
                    />
                    <span
                        >We recommend you use <a
                            href="https://semver.org/"
                            target="_blank"
                            rel="noopener noreferrer">Semantic Versioning</a
                        > for your maps.</span
                    >
                </div>
                <div class="input-wrapper">
                    <label for="info">Description</label>
                    <textarea
                        name="info"
                        id="info"
                        bind:value={level.description}
                        minlength="10"
                        maxlength="1024"
                        required
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
                {#if rawLevel?.data.namespace}
                    <div class="input-wrapper">
                        <label for="dp-link">Datapack Link</label>
                        <input
                            type="text"
                            name="dp-link"
                            id="dp-link"
                            placeholder="https://...."
                            required
                        />
                        <span
                            >This level uses the namespace link functionality to
                            go with a custom datapack. Please link to this
                            datapack here.</span
                        >
                    </div>
                {/if}

                {#if rawLevel}
                    <input
                        type="hidden"
                        name="levelData"
                        value={stringify<CompoundTag>(rawLevel)}
                    />
                {/if}
                <button>Create</button>
                <button type="button" onclick={cancel} class="danger"
                    >Cancel</button
                >
            </form>
            <div>
                <h2>Preview</h2>
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
