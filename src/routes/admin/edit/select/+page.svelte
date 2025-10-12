<script lang="ts">
	import { articles } from '$lib';
	import { onMount } from 'svelte';
	import { Command, Label, Input, Button, T } from '$lib/components';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let adminUsername = $state('');

	onMount(() => {
		adminUsername = localStorage.getItem('admin_username') ?? '';
	});

	let open = $state(false);
	let searchValue = $state('');

	function goToPage(where: string) {
		open = false;
		window.location.assign(resolve(`/admin/edit/${where}`));
	}

	function openDialog(event: Event) {
		event.preventDefault();
		open = true;
	}
</script>

<svelte:head>
	<title>Select an Article to Edit - Wiki of Truth</title>
</svelte:head>

<Command.Dialog bind:open>
	<Command.Input placeholder="Search for an article to edit" bind:value={searchValue} />
	<Command.List>
		<Command.Empty>No articles found.</Command.Empty>
		{#each $articles as article (article.path)}
			<Command.Item onclick={() => goToPage(article.path)}
				><span>Edit <strong>{article.title}</strong></span></Command.Item
			>
		{/each}
	</Command.List>
</Command.Dialog>

<div class="h-[85vh] w-screen p-8 align-middle">
	<p class="text-xl font-bold"><T />{adminUsername}<T /></p>

	<form onsubmit={openDialog} class="flex h-[60vh] items-center justify-center">
		<div class="m-auto h-fit w-fit">
			<Label for="searchInput">Search for an article to edit</Label>
			<div class="mt-1 flex">
				<Input id="searchInput" class="mr-1" bind:value={searchValue} />
				<Button type="submit">Search</Button>
			</div>
		</div>
	</form>

	<Button variant="link" onclick={() => goto(resolve('/admin'))} class="text-teal-500">Back</Button>
</div>
