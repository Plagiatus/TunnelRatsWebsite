<script lang="ts">
    import type { User } from "$lib/server/db/repositories/UserRepository";
    import { onMount } from "svelte";
    import titleImg from "$lib/assets/title.png?enhanced";

    let { user }: { user: Partial<User> | undefined } = $props();
    let username = $derived(user);

    let showProfileOverlay = $state(false);
    onMount(() => {
        document.addEventListener("click", () => {
            showProfileOverlay = false;
        });
    });
</script>

<header>
    <nav>
        <a href="/" aria-label="Tunnel Rats" id="title-in-header" >
            <enhanced:img src={titleImg} alt="Tunnel Rats" />
        </a>
        <a class="nav-item" href="/download">Download</a>
    </nav>
    <nav>
        <a class="nav-item" href="/levels">Browse Levels</a>
        {#if !username}
            <a class="nav-item" href="/login">Login</a>
        {:else}
            <a class="nav-item" href="/upload">Upload</a>
            <label class="nav-item" for="showProfileOverlay">Profile</label>
        {/if}
    </nav>

    <input
        type="checkbox"
        name="showProfileOverlay"
        id="showProfileOverlay"
        bind:checked={showProfileOverlay}
        hidden
    />
</header>

{#if showProfileOverlay && user}
    <aside>
        <div id="side-menu-header">
            <span>{user.username}</span>
            <label for="showProfileOverlay">Close</label>
        </div>
        <nav>
            <hr />
            <a href="/profile">Your Profile</a>
            <a href="/profile">Your Levels</a>
            <a href="/profile">Your Collections</a>
            <a href="/profile">Your Likes</a>
            <a href="/profile">Settings</a>
            <hr />

            <a href="/logout" data-sveltekit-preload-data="off" class="error">
                Logout
            </a>
        </nav>
    </aside>
{/if}

<style>
    header {
        padding: 1em;
        width: 100%;
        color: var(--color-text);
        z-index: 1000;
        background-color: black;
        position: fixed;
        height: 4rem;
        filter: drop-shadow(0 0 0.5em black);
        display: flex;
        justify-content: space-between;
    }

    header nav {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    #title-in-header {
        object-fit: contain;
        max-height: 2em;
        aspect-ratio: 1920 / 290;
    }
    #title-in-header img {
        object-fit: contain;
        max-height: 2em;
        aspect-ratio: 1920 / 290;
    }
    .nav-item {
        background-color: var(--color-highlight);
        padding: 0.5em 0.5em;
        line-height: 1;
        color: var(--color-on-highlight);
    }
    .nav-item:hover {
        background-color: var(--color-highlight-darker);
    }

    aside {
        position: fixed;
        right: 0;
        top: 4em;
        z-index: 1001;
        padding: 1em;
        background-color: var(--color-background);
        color: var(--color-text);
    }

    #side-menu-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1em;
    }

    aside nav {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    label {
        cursor: pointer;
    }
</style>
