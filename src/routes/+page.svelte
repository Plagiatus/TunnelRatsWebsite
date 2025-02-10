<script lang="ts">
    import type { PageProps } from "./$types";
    import titleImg from "$lib/assets/title.png?enhanced";
    import LevelList from "cmp/LevelList.svelte";

    const { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Tunnel Rats</title>
</svelte:head>
<div id="lander">
    <div>
        <enhanced:img src={titleImg} alt="Tunnel Rats" id="lander-img" />
        <div id="lander-buttons">
            <a id="lander-button-1" class="lander-button" href="/download">PLAY NOW</a>
            <a id="lander-button-2" class="lander-button" href="/levels">Browse Levels</a>
        </div>
    </div>
</div>
<div id="presentation">
    <div id="popular" class="presentation-wrapper">
        <h2>Popular</h2>
        <LevelList searchOptions={{search: "Rats", limit: 10}}/>
    </div>
    <div id="recommended" class="presentation-wrapper">
        <h2>Recommended</h2>
        <LevelList searchOptions={{tags: ["a", "b", "c"]}}/>
    </div>
    <div id="new" class="presentation-wrapper">
        <h2>New</h2>
        <LevelList searchOptions={{versions: [1, 2, 3]}}/>
    </div>
</div>

<style>
    #lander {
        height: calc(100vh - 4em);
        display: grid;
        place-items: center;
    }

    #lander-img {
        object-fit: contain;
        width: 90vw;
        animation: img-appear 1s ease forwards;
    }
    
    @keyframes img-appear {
        0% {
            scale: 0.5;
            transform: translateY(-100vh);
        }
        100% {
            scale: 1;
            transform: translateY(0vh);
        }
    }
    
    #lander-buttons {
        display: flex;
        justify-content: center;
        gap: 2em;
    }
    .lander-button {
        padding: 1em 2em;
        background-color: var(--color-highlight);
        color: var(--color-on-highlight);
        text-decoration: none;
    }
    #lander-button-1 {
        animation: buttons-appear 1s 1s ease both;
    }
    #lander-button-2 {
        animation: buttons-appear 1s 1.5s ease both;
    }

    @keyframes buttons-appear {
        0% {
            scale: 1;
            opacity: 0;
            transform: translateY(100%);
        }
        100% {
            scale: 1;
            opacity: 1;
            transform: translateY(0);
        }
    }

    #presentation {
        display: flex;
        gap: 1em;
        justify-content: space-evenly;
    }
    .presentation-wrapper h2 {
        text-align: center;
    }

</style>
