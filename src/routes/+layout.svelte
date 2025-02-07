<script lang="ts">
    import Header from "../components/Header.svelte";

    let { children } = $props();

    let width: number = $state(0);
</script>

<svelte:window bind:innerWidth={width} />

<div id="content" style:--screen-width={width}>
    <Header />

    <main class="scale-background">
        {@render children?.()}
    </main>

    <footer>Footer Placeholder</footer>
</div>

<style>
    #content {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        --scale-factor: 4;
    }
    footer,
    main {
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
        background-image: url("/img/background.png");
        --image-width: 64;
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

    :global(.scale-background) {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        image-rendering: pixelated; /*no blur*/

        /*pixel-perfect upscaling of a --image-width wide image on a --screen-width wide viewport by a factor of --scale-factor */
        background-size: calc(
            (100vw / (var(--screen-width) / var(--scale-factor))) *
                var(--image-width)
        );
    }
    :global(.scale) {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        image-rendering: pixelated; /*no blur*/

        /*pixel-perfect upscaling of a --image-width wide image on a --screen-width wide viewport by a factor of --scale-factor */
        width: calc(
            (100vw / (var(--screen-width) / var(--scale-factor))) *
                var(--image-width)
        );
    }
</style>
