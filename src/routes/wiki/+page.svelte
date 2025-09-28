<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	onMount(() => {
		goto(resolve('/'));
	});
</script>

<svelte:head>
	<title>Wiki of Truth</title>
</svelte:head>

<div class="h-[85vh] w-screen bg-white"></div>
