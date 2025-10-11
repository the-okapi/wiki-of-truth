<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { WikiOfTruth, Button, Command, Input } from '$lib/components';
	import { resolve } from '$app/paths';
	import { articles } from '$lib';
	import { onMount } from 'svelte';
	import { SERVER_URL } from '$lib/index';

	let { children } = $props();

	let date = $state(new Date().toDateString());

	let open = $state(false);

	let searchValue = $state('');

	function goToPage(path: string) {
		open = false;
		window.location.assign(resolve(`/wiki/${path}`));
	}

	function openCommandDialog(event: Event) {
		event.preventDefault();
		open = true;
	}

	function onkeydown(event: KeyboardEvent) {
		console.log(event);
		if (event.key === 'Control') {
			event.preventDefault();
			open = !open;
		}
	}

	onMount(async () => {
		const response = await fetch(`${SERVER_URL}/get-all`);
		articles.set(await response.json());
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:document {onkeydown} />
<Command.Dialog bind:open>
	<Command.Input placeholder="Search the Unknown Universe" bind:value={searchValue} />
	<Command.List>
		<Command.Empty>No articles found.</Command.Empty>
		{#each $articles as article (article.path)}
			<Command.Item onclick={() => goToPage(article.path)}>{article.title}</Command.Item>
		{/each}
	</Command.List>
</Command.Dialog>

<nav class="z-10 grid h-[15vh] w-[100vw] grid-cols-3 border-b-2 bg-white pt-5 pr-5 pb-4 pl-5">
	<WikiOfTruth />
	<div class="m-auto inline h-fit text-center align-middle">
		<p class="align-baseline">{date}</p>
	</div>
	<form onsubmit={openCommandDialog} class="m-auto flex h-fit w-[100%] text-right align-middle">
		<Input placeholder="Search the Unknown Universe" bind:value={searchValue} class="mr-1" />
		<Button type="submit">Go</Button>
	</form>
</nav>

<div class="text-center">
	{@render children?.()}
</div>

<style>
	nav {
		top: 0;
		left: 0;
	}
</style>
