<script lang="ts">
    let { user }: { user: string | undefined } = $props();
    let username = $derived(user);
</script>

<header>
    <a href="/">
        <span>Tunnel Rats</span>
    </a>
    <nav>
        <a class="nav-item highlight" href="/download">Download</a>
        <a class="nav-item" href="/upload">Upload Levels</a>
        <a class="nav-item" href="/levels">Browse Levels</a>
        {#if !username}
            <a class="nav-item" href="/login">Login</a>
        {:else}
            <a class="nav-item" href="/logout" data-sveltekit-preload-data="off">Logout</a>
        {/if}
    </nav>
</header>

<style>
    header {
        padding: 1em;
        width: 100%;
        color: var(--color-text);
        z-index: 1000;
        background-color: black;
        position: fixed;
        height: 4em;
        filter: drop-shadow(0 0 0.5em black);
        display: flex;
        justify-content: space-between;
    }

    nav {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
    .nav-item {
        background-color: var(--color-highlight-transparent);
        padding: 0.5em 0.5em;
        line-height: 1;
        color: var(--color-on-highlight);
    }
    .nav-item.highlight {
        background-color: var(--color-highlight);
    }
    .nav-item:hover {
        background-color: var(--color-highlight-darker);
    }
</style>
