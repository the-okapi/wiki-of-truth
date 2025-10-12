<script>
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	onMount(() => {
		window.location.assign(resolve('/'));
	});
</script>

<svelte:head>
	<title>Wiki of Truth</title>
</svelte:head>

<div class="h-[85vh] w-screen bg-white"></div>
