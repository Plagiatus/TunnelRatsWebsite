<script lang="ts">
    import { enhance } from "$app/forms";
    import { enhanceLoading } from "$lib/client/utils.svelte";
    import type { PageProps } from "./$types";

    let { data, form }: PageProps = $props();
    let loading = enhanceLoading();
</script>

<h1>Login</h1>
<form method="post" use:enhance={loading.enhance}>
    {#if form?.error}
        <div class="error">{form.error}</div>
    {/if}
    <label for="username">Username</label>
    <input
        type="text"
        name="username"
        autocomplete="username"
        value={form?.username}
        required
        minlength="3"
        maxlength="31"
        disabled={loading.loading}
    />
    <label for="username">Password</label>
    <input
        type="password"
        name="password"
        autocomplete="current-password"
        value={form?.password}
        required
        minlength="8"
        maxlength="255"
        disabled={loading.loading}
    />
    <button disabled={loading.loading}>Login</button>
</form>

<a href="/login/forgot-password">Forgot Password?</a>
<a href="/register">Register</a>
