<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components';

	let loading = $state(true);
	let pageJson: any = $state({});

	onMount(async () => {
		const response = await fetch(`http://localhost:8000/wiki/${page.params.page}`);
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
	<main class="p-8">
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
	</main>
{:else}
	<main class="bg-neutral-100">
		<div class="m-auto w-[56vw] bg-white p-8 text-center">
			<h1 class="text-3xl font-bold">{pageJson.title}</h1>
			<div class="w-fit text-left">
				<p class="space w-[52vw] p-3 font-sans leading-5 whitespace-pre-wrap">
					{@html pageJson.value}
				</p>
			</div>
		</div>
	</main>
{/if}
