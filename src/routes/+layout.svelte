<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { WikiOfTruth, Input, Button } from '$lib/components';

	let { children } = $props();

	function search(event: Event) {
		event.preventDefault();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="grid grid-cols-2 border-b-2 pt-5 pr-5 pb-4 pl-5">
	<WikiOfTruth />
	<form onsubmit={search} class="text-right align-middle">
		<Input
			type="text"
			placeholder="Search the Unknown Universe"
			class="mr-1 inline w-100 align-middle"
		/>
		<Button type="submit">Search</Button>
	</form>
</nav>

{@render children?.()}
