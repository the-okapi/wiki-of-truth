<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status}: {page.error?.message} - Wiki of Truth</title>
</svelte:head>

<div class="flex h-[85vh] w-screen items-center justify-center bg-white">
	<h1 class="text-5xl font-black">{page.status}: {page.error?.message}</h1>
</div>
