<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components';
</script>

<svelte:head>
	<title>Wiki of Truth</title>
</svelte:head>

<main>
	<h1 class="mb-2 text-3xl font-bold">Welcome to the Wiki of Truth!</h1>
	<p>
		To start exploring, you can use the search bar in the top right, or you can read some of the
		articles below. <Button
			variant="link"
			class="p-0 text-teal-500"
			onclick={() => goto(resolve('/about'))}>About</Button
		>
	</p>
</main>
