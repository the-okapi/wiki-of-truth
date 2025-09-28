<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components';
	import { onMount } from 'svelte';
	import { version } from '$app/environment';

	let loading = $state(false);

	type Article = {
		id: string;
		path: string;
		title: string;
		image: string;
		image_alt: string;
	};

	let articles: Article[] = $state([]);

	onMount(async () => {
		const response = await fetch('https://api.wiki.unlimitedstuffltd.com/featured');
		articles = await response.json();
		loading = false;
	});
</script>

<svelte:head>
	<title>Wiki of Truth</title>
</svelte:head>

<main class="h-content-height mt-8">
	<h1 class="mb-2 text-3xl font-bold">Welcome to the Wiki of Truth!</h1>
	<p>
		To start exploring, you can click the button in the top right or hit <kbd
			class="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100"
			>Ctrl</kbd
		>. Alternatively, you can read some of the articles below. <Button
			variant="link"
			class="p-0 text-teal-500"
			onclick={() => goto(resolve('/about'))}>About the Wiki of Truth</Button
		>
	</p>
	<div class="flex h-[60vh] items-center justify-center">
		{#if loading}
			<p class="font-bold">Loading...</p>
		{:else}
			{#each articles as article}
				<button
					class="mx-2 h-fit w-[12vw] cursor-pointer rounded-md border-2 p-[1vw] hover:shadow"
					onclick={() => goto(resolve(`/wiki/${article.path}`))}
				>
					<img
						src={article.image}
						alt={article.image_alt}
						class="m-auto mb-3 max-h-[13vw] max-w-[10vw] rounded"
					/>
					{article.title}
				</button>
			{/each}
		{/if}
	</div>
	<div class="grid grid-cols-2 px-8 pr-14">
		<div class="text-left">
			<Button variant="link" class="text-teal-500" onclick={() => goto(resolve('/login'))}
				>Admin</Button
			>
		</div>
		<div class="my-auto text-right align-middle">
			<p class="font-mono text-sm">v{version}</p>
		</div>
	</div>
</main>
