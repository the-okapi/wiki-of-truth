<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components';
	import { resolve } from '$app/paths';
	import { version } from '$app/environment';
	import { PUBLIC_SERVER_URL as SERVER_URL } from '$env/static/public';

	let text = $state('');

	let logOutLoading = $state(false);

	function createArticle() {
		goto(resolve('/admin/create'));
	}

	function editArticle() {
		goto(resolve('/admin/edit/select'));
	}

	async function logOut() {
		logOutLoading = true;
		text = 'Loading...';
		let token = localStorage.getItem('admin_token');
		let username = localStorage.getItem('admin_username');
		localStorage.removeItem('admin_token');
		localStorage.removeItem('admin_username');
		await fetch(`${SERVER_URL}/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				token
			})
		});
		goto(resolve('/'));
	}
</script>

<svelte:head>
	<title>Admin Dashboard - Wiki of Truth</title>
</svelte:head>

<main class="flex h-[85vh] w-screen items-center justify-center bg-white pt-8">
	<div>
		<h1 class="text-3xl font-bold">
			Admin Dashboard <span class="font-mono text-xl font-normal">{version}</span>
		</h1>
		<div class="m-8 mt-16">
			<Button onclick={createArticle} disabled={logOutLoading}>Create Article</Button>
			<Button onclick={editArticle} disabled={logOutLoading}>Edit Article</Button><br /><br />
			<Button onclick={logOut} disabled={logOutLoading}>Log Out</Button>
			<p>{text}</p>
		</div>
	</div>
</main>
