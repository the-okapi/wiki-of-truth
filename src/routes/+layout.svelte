<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { WikiOfTruth, Button, Command } from '$lib/components';
	import { resolve } from '$app/paths';

	let { children } = $props();

	let date = $state(new Date().toDateString());

	let open = $state(false);

	function goToPage(path: string) {
		open = false;
		window.location.assign(resolve(`/wiki/${path}`));
	}

	function openCommandDialog() {
		open = !open;
	}

	function onkeypress(event: KeyboardEvent) {
		if (event.key === 'Control') {
			// todo
			event.preventDefault();
			openCommandDialog();
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:document {onkeypress} />
<Command.Dialog bind:open>
	<Command.Input placeholder="Search for an article" />
	<Command.List>
		<Command.Empty>No articles found.</Command.Empty>
		<Command.Item onclick={() => goToPage('test')}>Test</Command.Item>
		<Command.Item onclick={() => goToPage('test2')}>Te</Command.Item>
	</Command.List>
</Command.Dialog>

<nav class="z-10 grid h-[15vh] w-[100vw] grid-cols-3 border-b-2 bg-white pt-5 pr-5 pb-4 pl-5">
	<WikiOfTruth />
	<div class="m-auto inline h-fit text-center align-middle">
		<p class="align-baseline">{date}</p>
	</div>
	<div class="m-auto h-fit w-[100%] text-right align-middle">
		<Button onclick={openCommandDialog}>Search for an Article</Button>
	</div>
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
