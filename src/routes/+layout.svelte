<script>

    import Header from "../components/Header.svelte";

</script>


<div id="content">
    <Header />

    <main>
        <slot />
    </main>

    <footer>Footer Placeholder</footer>
</div>

<style>
    #content {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
    footer, main {
        padding: 1em;
    }
    footer {
        width: 100%;
        color: white;
        z-index: 1000;
        background-color: black;
    }
    main {
        position: relative;
        margin-top: 3em;
        flex-grow: 1;
        color: var(--color-text);
        background: url("img/background.png");
    }
    footer {
        filter: drop-shadow(0 0 0.5em black);
    }

    :global(body) {
        --color-text: #fff;
        --color-background: black;
        
        --color-highlight: orange;
        --color-highlight-darker: rgb(207, 137, 5);
        --color-highlight-transparent: rgba(255, 165, 0, 0.5);
        --color-on-highlight: rgb(0, 0, 0);
    }
</style>
