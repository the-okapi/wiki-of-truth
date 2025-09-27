<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components';

	let loading = $state(true);
	let pageJson: any = $state({});

	onMount(async () => {
		const response = await fetch(`https://api.wiki.unlimitedstuffltd.com/wiki/${page.params.page}`);
		pageJson = await response.json();
		loading = false;
	});
</script>

<svelte:head>
	{#if loading}
		<title>Loading...</title>
	{:else}
		<title>{pageJson.title} - Wiki of Truth</title>
	{/if}
</svelte:head>

{#if loading}
	<Skeleton class="m-auto mb-10 h-7 w-80" />
	<div class="text-left">
		<Skeleton class="mb-2 inline-block h-5 w-[87vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[93vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[86vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[84vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[87vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[91vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[90vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[86vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[89vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[90vw]" />
		<Skeleton class="mb-2 inline-block h-5 w-[84vw]" />
		<Skeleton class="inline-block h-5 w-[87vw]" />
	</div>
{:else}
	<h1 class="text-3xl font-bold">{pageJson.title}</h1>
	<div class="text-left">
		<p>{pageJson.value}</p>
	</div>
{/if}
