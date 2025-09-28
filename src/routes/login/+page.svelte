<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Label, Input, Button } from '$lib/components';

	let username = $state('');
	let password = $state('');

	let errorText = $state('');
	let loading = $state(false);

	async function onsubmit(event: Event) {
		event.preventDefault();
		loading = true;
		let response = await fetch(
			`http://localhost:8000/login?username=${username}&password=${password}`
		);
		if (!response.ok) {
			errorText = 'Invalid username or password';
			loading = false;
			return;
		}
		let token = await response.text();
		localStorage.setItem('admin_token', token);
		goto(resolve('/admin'));
	}
</script>

<svelte:head>
	<title>Admin Login - Wiki of Truth</title>
</svelte:head>

<div class="flex h-[85vh] w-screen items-center justify-center bg-neutral-100">
	<div class="h-80 w-120 rounded-2xl border-2 bg-white p-5">
		<h2 class="text-left text-xl font-bold">Admin Login</h2>
		<form {onsubmit}></form>
	</div>
</div>
