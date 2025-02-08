<script lang="ts">
    import type { LevelInDB } from "$lib/server/db/repositories/LevelRepository";

    let { level }: { level?: LevelInDB } = $props();
</script>

{#if level}
    <a class="level" href="/level/{level.id}">
        <img class="level-image" src="{level.image}" alt="{level.title} image" />
        <span class="level-title">{level.title}</span>
        <span class="level-info level-author">by {level.author}</span>
        <span class="level-info level-description">{level.description}</span>
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
        "image title author" 
        "image description description"
        "image tags tags"
        "image downloads likes";
        gap: 1em;
        text-decoration: none;
        color: inherit;
        background-color: rgba(1, 1, 1, 0.5);
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
