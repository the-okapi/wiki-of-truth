<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { SERVER_URL } from '$lib/index';
	import { Markdown, Button, Spinner, Dialog, Label, Input } from '$lib/components';

	let loading = $state(true);
	let pageJson = $state({
		title: '',
		value: ''
	});

	let renameDialogOpen = $state(false);
	let savedDialogOpen = $state(false);

	let newTitle = $state('');

	let text = $state('');

	function changeTitle() {
		renameDialogOpen = true;
	}

	function rename(event: Event) {
		event.preventDefault();
		pageJson.title = newTitle;
		renameDialogOpen = false;
	}

	async function save() {
		loading = true;
		const response = await fetch(`${SERVER_URL}/update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				owner_token: localStorage.getItem('admin_token'),
				owner_username: localStorage.getItem('admin_username'),
				path: page.params.article,
				title: pageJson.title,
				value: pageJson.value
			})
		});
		if (response.ok) {
			savedDialogOpen = true;
			loading = false;
		} else {
			text = 'Error ' + response.status;
			loading = false;
		}
	}

	onMount(async () => {
		const response = await fetch(`${SERVER_URL}/wiki/${page.params.article}`);
		pageJson = await response.json();
		newTitle = pageJson.title;
		loading = false;
	});
</script>

<svelte:window {onbeforeunload} />

<svelte:head>
	{#if loading}
		<title>Loading...</title>
	{:else}
		<title>Edit {pageJson.title} - Wiki of Truth</title>
	{/if}
</svelte:head>

<Dialog.Root bind:open={savedDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Save successful!</Dialog.Title>
			<Dialog.Description
				>This article will display it's new version whenever viewed from now on.</Dialog.Description
			>
		</Dialog.Header>
		<Dialog.Footer>
			<Button onclick={() => (savedDialogOpen = false)}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={renameDialogOpen}>
	<Dialog.Content>
		<form onsubmit={rename}>
			<Dialog.Header>
				<Dialog.Title>Rename this Article</Dialog.Title>
				<Dialog.Description
					>Enter a new title for this articles. Article title will not be updated until article is
					saved.</Dialog.Description
				>
			</Dialog.Header>
			<Label for="renameTo" class="mt-5">New Title:</Label>
			<Input
				id="renameTo"
				class="mt-1 mb-5"
				bind:value={newTitle}
				placeholder={pageJson.title}
				required
			/>
			<Dialog.Footer>
				<Button type="submit">Go</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

{#if loading}
	<div class="flex h-[85vh] w-screen items-center justify-center">
		<p class="flex text-2xl font-bold"><Spinner class="m-auto mr-2" /> Loading...</p>
	</div>
{:else}
	<div>
		<div class="grid h-[10vh] grid-cols-3 border-b-2 px-5 text-xl">
			<div class="m-auto text-left">Source</div>
			<div class="m-auto flex text-center">
				<p class="m-auto mr-1 text-lg font-bold text-red-500">{text}</p>
				<Button onclick={save}>Save</Button>
				<p class="mx-7 my-auto text-2xl font-bold">{pageJson.title}</p>
				<Button onclick={changeTitle}>Change Title</Button>
			</div>
			<div class="m-auto text-right">What the viewer sees</div>
		</div>
		<div class="grid h-[75vh] w-screen grid-cols-2 text-left">
			<textarea class="w-[50vw] resize-none border-r-2 p-3 outline-0" bind:value={pageJson.value}
			></textarea>
			<div class="overflow-y-scroll p-3">
				<Markdown md={pageJson.value} />
			</div>
		</div>
	</div>
{/if}
