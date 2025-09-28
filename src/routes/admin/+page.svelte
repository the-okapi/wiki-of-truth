<script>
	import { Button } from '$lib/components';

	function createArticle() {}

	function editArticle() {}
</script>

<svelte:head>
	<title>Admin Dashboard - Wiki of Truth</title>
</svelte:head>

<main class="h-[85vh] w-screen bg-white pt-8">
	<h1 class="text-3xl font-bold">Admin Dashboard</h1>
	<div class="m-8">
		<Button onclick={createArticle}>Create Article</Button>
		<Button onclick={editArticle}>Edit Article</Button>
	</div>
</main>
