<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components';
	import { onMount } from 'svelte';

	let loading = $state(false);

	let articles: any[] = $state([
		{
			path: 'test',
			title: 'This is a test!',
			image: 'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg',
			image_alt: 'Wikipedia Logo'
		},
		{
			path: 'test2',
			title: 'This is another test',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
			image_alt: 'Phone'
		}
	]);
	/*
	onMount(async () => {
		const response = await fetch('http://localhost:8000/featured');
        articles = await response.json();
        loading = false;
	});*/
</script>

<svelte:head>
	<title>Wiki of Truth</title>
</svelte:head>

<main class="mt-8">
	<h1 class="mb-2 text-3xl font-bold">Welcome to the Wiki of Truth!</h1>
	<p>
		To start exploring, you can use the search bar in the top right, or you can read some of the
		articles below. <Button
			variant="link"
			class="p-0 text-teal-500"
			onclick={() => goto(resolve('/about'))}>About</Button
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
</main>
