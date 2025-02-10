<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageProps } from "./$types";

    let { data, form }: PageProps = $props();
</script>

<h1>Verify your email address</h1>

<p>
    We've sent a confirmation email to {data.user!.email}. Please click the link
    inside the email to verify your email address.
</p>

<form action="?/verify" method="post" use:enhance>
    <input type="text" name="code" id="code" minlength="8" maxlength="8" required/>
    <button>Verify</button>
</form>

<p class="error">{form?.error ?? ""}</p>
<p>{form?.message ?? ""}</p>

<form action="?/resend" method="post" use:enhance>
    <button>Resend email</button>
</form>
