<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Label, Button, Input } from '$lib/components';
	import { SERVER_URL } from '$lib/config';

	const validPathChars = 'abcdefghijklmnopqrstuvwxyz0123456789-';

	let path = $state('');
	let title = $state('');
	let image = $state('');
	let image_alt = $state('');

	let text = $state('');

	let loading = $state(false);

	async function onsubmit(event: Event) {
		event.preventDefault();
		loading = true;
		for (let i = 0; i < path.length; i++) {
			if (!validPathChars.includes(path[i])) {
				text =
					'Path can only include lowercase letters (abcdef...), numbers (1,2,3....) and hyphens (-)';
			}
		}
		let response = await fetch(`${SERVER_URL}/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				owner_token: localStorage.getItem('admin_token'),
				owner_username: localStorage.getItem('admin_username'),
				path,
				title,
				image,
				image_alt
			})
		});
		if (response.status === 400) {
			if (!localStorage.getItem('admin_token') || !localStorage.getItem('admin_username')) {
				text = 'Path already exists';
				loading = false;
				return;
			} else {
				loading = false;
				goto(resolve('/login'));
			}
		} else if (response.status === 500) {
			text = 'There was an error on our side. Please try again later.';
			loading = false;
			return;
		}
		loading = false;
		goto(resolve(`/admin/edit/${path}`));
	}
</script>

<svelte:head>
	<title>Create an Article</title>
</svelte:head>

<div class="h-[85vh] w-screen bg-white p-6">
	<Button variant="link" class="text-teal-500" onclick={() => goto(resolve('/admin'))}>Back</Button>
	<h1 class="mb-10 text-3xl font-bold">Create an Article</h1>
	<div class="mb-5 grid grid-cols-2">
		<div class="flex justify-end">
			<form {onsubmit} class="mr-10 w-fit text-center">
				<Label for="path" class="mb-1">Path:</Label>
				<Input
					id="path"
					class="mb-5"
					bind:value={path}
					placeholder="articlename"
					required
					disabled={loading}
				/>
				<Label for="title" class="mb-1">Title</Label>
				<Input
					id="title"
					class="mb-5"
					bind:value={title}
					placeholder="Article Name"
					required
					disabled={loading}
				/>
				<Label for="image" class="mb-1">Image URL:</Label>
				<Input
					id="image"
					class="mb-5"
					bind:value={image}
					placeholder="https://example.com/image.png"
					required
					disabled={loading}
				/>
				<Label for="image-alt" class="mb-1">Image Alt:</Label>
				<Input
					id="image-alt"
					class="mb-5"
					bind:value={image_alt}
					placeholder="An image of the universe"
					required
					disabled={loading}
				/>
				<Button type="submit" disabled={loading}>Create</Button>
			</form>
		</div>
		<img
			class="ml-10 max-h-[45vh] max-w-[40vw] rounded-lg border-2"
			placeholder="Image preview will appear here"
			src={image}
			alt={image_alt}
		/>
	</div>
	<p>{text}</p>
</div>
