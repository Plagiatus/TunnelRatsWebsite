<script lang="ts">
    import logoJava from "$lib/assets/Minecraft_Java_Logo.svg";
    import logoBedrock from "$lib/assets/Minecraft_Logo.svg";
    import marketplaceImage from "$lib/assets/Minecraft_Get_on_Marketplace_Badge.svg";
    import { innerWidth } from "svelte/reactivity/window";

    let iFrameWidth = $derived((innerWidth.current ?? 0) * 0.4);
    $inspect(iFrameWidth);
</script>

<svelte:head>
    <title>Download Tunnel Rats</title>
</svelte:head>

<h1>Download</h1>

<div id="download-options-wrapper">
    <div id="paid" style="grid-area: paid;">
        <h2>Support the development</h2>
        <div id="paid-notice">
            <p>
                Developing this map takes a lot of time, effort and money. That
                is why we're offering an option to purchase the map.
            </p>
            <p>
                If you'd like to support the continued development of this and
                any further game(s), please consider buying yourself a copy of
                the map.
            </p>
        </div>
    </div>
    <div style="grid-area: logo-br;" class="logo">
        <img src={logoBedrock} alt="Bedrock Edition" class="logo" />
    </div>
    <div style="grid-area: paid-br;" class="paid-wrapper">
        <a
            href="https://www.minecraft.net/en-us/marketplace/pdp?id=f9db9942-8fde-4a14-92be-ba368aafda0d"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img
                id="marketplace"
                src={marketplaceImage}
                alt="Get it on the Marketplace"
            />
        </a>
    </div>
    <div style="grid-area: logo-jv;" class="logo">
        <img src={logoJava} alt="Java Edition" class="logo" />
    </div>
    <div style="grid-area: paid-jv;" class="paid-wrapper">
        <iframe
            title=""
            frameborder="0"
            src="https://itch.io/embed/1621667?bg_color=1e1d1c&amp;fg_color=fff&amp;link_color=ffa500&amp;border_color=ffa500"
            width={iFrameWidth}
            height="167"
            ><a href="https://plagiatus.itch.io/turf-roll"
                >Turf Roll by Plagiatus, Etex</a
            ></iframe
        >
    </div>

    <div style="grid-area: free;" id="free">
        <h2>Free Downloads</h2>
    </div>
    <div style="grid-area: free-br;">
        <p>
            Sorry, we don't currently provide a free Bedrock Edition download.
        </p>
    </div>
    <div style="grid-area: free-jv;">
        <div class="version-wrapper">
            <h3 class="map-version">
                v1.0 <span class="mc-version">for Minecraft 1.21.4</span>
            </h3>
            <a
                href="?"
                class="download primary"
                title="Intended to be used to start a game in singleplayer, LAN hosting, or through mods like essential."
                >Download v1.0</a
            >
            <br />
            <a href="?" class="download secondary">Download v1.0 Map only</a>
            <br />
            <a href="?" class="download secondary"
                >Download v1.0 Resourcepack only</a
            >
            <details>
                <summary>Changelog</summary>
                <span class="changelog-date">2025-01-19</span>
                Released Version 1.0
            </details>
        </div>
        <div class="version-wrapper">
            <h3 class="map-version">
                v1.0 <span class="mc-version">for Minecraft 1.21.4</span>
            </h3>
            <a
                href="?"
                class="download primary"
                title="Intended to be used to start a game in singleplayer, LAN hosting, or through mods like essential."
                >Download v1.0</a
            >
            <br />
            <a href="?" class="download secondary">Download v1.0 Map only</a>
            <br />
            <a href="?" class="download secondary"
                >Download v1.0 Resourcepack only</a
            >
        </div>
    </div>
</div>

<style>
    #download-options-wrapper {
        display: grid;
        grid-template-areas:
            "logo-br logo-jv"
            "paid paid"
            "paid-br paid-jv"
            "free free"
            "free-br free-jv";
        grid-template-columns: 1fr 1fr;
        gap: 2.5vw;
        margin: 2.5vw;
        /* background: linear-gradient(var(--color-text), var(--color-text)) center/2px 100% no-repeat; */
    }

    #free,
    #paid {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--color-highlight);
        border: 1px solid var(--color-highlight);
        padding: 0.5em;
    }

    div.logo {
        display: flex;
        justify-content: center;
        position: sticky;
        top: 5rem;
    }
    img.logo {
        max-height: 100px;
        max-width: 100vw;
        width: 100%;
        object-fit: contain;
    }
    #marketplace {
        border: 1px solid var(--color-highlight);
        height: 165px;
        object-fit: contain;
    }
    .paid-wrapper {
        display: flex;
        justify-content: center;
    }

    .map-version {
        color: var(--color-highlight);
    }
    .mc-version {
        color: var(--color-highlight-darker);
        font-weight: lighter;
        font-size: smaller;
    }

    .download.primary {
        background-color: var(--color-highlight);
        color: var(--color-on-highlight);
        padding: 0.5em 0.375em;
        display: inline-block;
        margin: 0.1em;
    }

    .version-wrapper:not(:first-of-type) {
        font-size: 0.8em;
        margin-top: 1em;
    }
</style>
