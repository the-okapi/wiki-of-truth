<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Label, Input, Button, T } from '$lib/components';
	import { SERVER_URL } from '$lib/config';
	import { onMount } from 'svelte';
	import { version } from '$app/environment';

	let username = $state('');
	let password = $state('');

	let errorText = $state('');
	let loading = $state(false);

	async function onsubmit(event: Event) {
		event.preventDefault();
		if (username === '' || password === '') {
			return;
		}
		loading = true;
		errorText = 'Loading...';
		let response = await fetch(`${SERVER_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		});
		if (response.status === 400) {
			errorText = 'Invalid username or password';
			loading = false;
			return;
		} else if (response.status === 500) {
			errorText = 'There was a problem on our end.';
			loading = false;
			return;
		}
		let token = await response.text();
		localStorage.setItem('admin_token', token);
		localStorage.setItem('admin_username', username);
		errorText = '';
		loading = false;
		goto(resolve('/admin'));
	}
	onMount(() => {
		if (localStorage.getItem('admin_token') && localStorage.getItem('admin_username')) {
			goto(resolve('/admin'));
		}
	});
</script>

<svelte:head>
	<title>Admin Login - Wiki of Truth</title>
</svelte:head>

<div class="flex h-[85vh] w-screen items-center justify-center bg-neutral-100">
	<div class=" rounded-2xl border-2 bg-white">
		<h2 class="mt-5 mb-2 ml-5 text-left text-xl font-bold">
			Admin Login <span class="font-md font-mono font-normal">v{version}</span>
		</h2>
		<hr />
		<form {onsubmit} class="px-9 py-5 text-center">
			<div class="inline-block">
				<Label for="username" class="mb-1">Username:</Label>
				<Input
					bind:value={username}
					class="mb-3 w-80"
					id="username"
					disabled={loading}
					autocomplete="username"
				/>
				<Label for="password" class="mb-1">Password:</Label>
				<Input
					bind:value={password}
					class="mb-1 w-80"
					type="password"
					id="password"
					autocomplete="current-password"
					disabled={loading}
				/>
				<p class="mb-5"><T />{errorText}<T /></p>
				<Button type="submit" disabled={loading}>Go</Button>
			</div>
		</form>
	</div>
</div>
