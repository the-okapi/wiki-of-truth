<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { WikiOfTruth, Button, Command, Input } from '$lib/components';
	import { resolve } from '$app/paths';

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

	function onkeypress(event: KeyboardEvent) {
		if (event.key === 'Control') {
			// todo
			event.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:document {onkeypress} />
<Command.Dialog bind:open>
	<Command.Input placeholder="Search for an article" bind:value={searchValue} />
	<Command.List>
		<Command.Empty>No articles found.</Command.Empty>
		<!--TODO-->
	</Command.List>
</Command.Dialog>

<nav class="z-10 grid h-[15vh] w-[100vw] grid-cols-3 border-b-2 bg-white pt-5 pr-5 pb-4 pl-5">
	<WikiOfTruth />
	<div class="m-auto inline h-fit text-center align-middle">
		<p class="align-baseline">{date}</p>
	</div>
	<form onsubmit={openCommandDialog} class="m-auto flex h-fit w-[100%] text-right align-middle">
		<Input placeholder="Search the unknown universe" bind:value={searchValue} class="mr-1 w-100" />
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
