<script lang="ts">
    import Footer from "cmp/Footer.svelte";
    import Header from "../components/Header.svelte";
    import type { PageData } from "./$types";

    let { children, data } = $props();

    let width: number = $state(0);
</script>

<svelte:window bind:innerWidth={width} />

<div id="content" style:--screen-width={width}>
    <Header user={data.user} />

    <main class="scale-background">
        {@render children?.()}
    </main>

    <Footer />
</div>

<style>
    #content {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        --scale-factor: 4;
    }
    main {
        padding: 1em;
    }
    main {
        position: relative;
        margin-top: 3em;
        flex-grow: 1;
        color: var(--color-text);
        background-image: url("/img/background.png");
        --image-width: 64;
    }

    :global(body) {
        --color-text: #fff;
        --color-background: black;

        --color-highlight: orange;
        --color-highlight-darker: rgb(207, 137, 5);
        --color-highlight-transparent: rgba(255, 165, 0, 0.5);
        --color-on-highlight: rgb(0, 0, 0);

        --color-warning: yellow;
        --color-error: red;
    }

    :global(a) {
        color: inherit;
    }

    :global(.error) {
        background-color: var(--color-error);
    }
    :global(.warning) {
        background-color: var(--color-warning);
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
