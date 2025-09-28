<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components';
	import DOMPurify from 'dompurify';

	let loading = $state(true);
	let pageJson = $state({
		title: '',
		value: ''
	});

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
	<main class="bg-neutral-100">
		<div class="m-auto w-[56vw] bg-white p-8 text-center">
			<Skeleton class="m-auto mb-10 h-7 w-80" />
			<div class="text-left">
				<Skeleton class="mb-2 inline-block h-5 w-[50vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[52vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[51vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[49vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[50vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[51vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[50vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[49vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[47vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[50vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[49vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[52vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[50vw]" />
				<Skeleton class="mb-2 inline-block h-5 w-[49vw]" />
				<Skeleton class="inline-block h-5 w-[52vw]" />
			</div>
		</div>
	</main>
{:else}
	<main class="bg-neutral-100">
		<div class="m-auto w-[56vw] bg-white p-8 text-center">
			<h1 class="text-3xl font-bold">{pageJson.title}</h1>
			<div class="w-fit text-left">
				<p class="space w-[52vw] p-3 font-sans leading-5 whitespace-pre-wrap">
					{@html DOMPurify.sanitize(pageJson.value)}
				</p>
			</div>
		</div>
	</main>
{/if}
