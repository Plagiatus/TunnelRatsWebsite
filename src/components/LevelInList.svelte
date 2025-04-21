<script lang="ts">
    import type { LevelInDB } from "$lib/server/db/repositories/LevelRepository";

    let { level, link = true }: { level?: LevelInDB, link?: boolean } = $props();
</script>

{#if level}
    <a class="level" href={link ? `/level/${level.id}` : "#"}>
        <img class="level-image" src="{level.image}" alt="{level.title} image" />
        <span class="level-title">{level.title}</span>
        <span class="level-info level-author">by {level.author}</span>
        <span class="level-info level-description">{level.description.length > 113 ? level.description.substring(0, 110) + "..." : level.description}</span>
        <span class="level-info level-downloads">{level.downloads} Downloads</span>
        <span class="level-info level-likes">{level.likes} Likes</span>
    </a>
{/if}

<style>
    .level {
        border-radius: 1em;
        padding: 1em;
        border: 1px solid black;
        display: grid;
        grid-template-areas: 
        "image title title" 
        "image author author" 
        "image description description"
        "image tags tags"
        "image downloads likes";
        grid-template-columns: calc(128px + 1em) auto auto;
        text-decoration: none;
        color: inherit;
        background-color: rgba(1, 1, 1, 0.5);
    }

    .level-image {
        width: 128px;
        height: 128px;
        grid-area: image;
    }

    .level-title {
        font-size: larger;
        grid-area: title;
    }
    .level-author {
        grid-area: author;
    }
    .level-likes {
        color: gray;
        grid-area: likes;
        text-align: right;
    }
    .level-description {
        color: gray;
        grid-area: description;
    }
    .level-downloads {
        color: gray;
        grid-area: downloads;
    }
</style>
