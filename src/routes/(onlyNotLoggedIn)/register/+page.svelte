<script lang="ts">
    import { enhance } from "$app/forms";
    import { enhanceLoading } from "$lib/client/utils.svelte";
    import type { PageProps } from "./$types";

    let { data, form }: PageProps = $props();
    let loading = enhanceLoading();
    $inspect(loading.loading);
</script>

<h1>Register</h1>
<form
    method="post"
    use:enhance={loading.enhance}
>
    {#if form?.error}
        <div class="error">{@html form.error}</div>
    {/if}
    <label for="username">Username</label>
    <input
        type="text"
        name="username"
        autocomplete="off"
        value={form?.username}
        required
        minlength="3"
        maxlength="31"
        disabled={loading.loading}
    />
    <label for="email">Email</label>
    <input
        type="email"
        name="email"
        autocomplete="off"
        value={form?.email}
        required
        disabled={loading.loading}
    />
    <label for="username">Password</label>
    <input
        type="password"
        name="password"
        autocomplete="new-password"
        value={form?.password}
        required
        minlength="8"
        maxlength="255"
        disabled={loading.loading}
    />
    <button disabled={loading.loading}>Register</button>
</form>

<a href="/login">Already have an account?</a>
