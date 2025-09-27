<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { WikiOfTruth, Input, Button } from '$lib/components';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { children } = $props();

	let date = $state(new Date().toDateString());

	let page = $state('');

	function search(event: Event) {
		event.preventDefault();
		if (page !== '') {
			goto(resolve(`/wiki/${page}`));
			page = '';
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="grid grid-cols-3 border-b-2 pt-5 pr-5 pb-4 pl-5">
	<WikiOfTruth />
	<div class="m-auto inline h-fit text-center align-middle">
		<p class="align-baseline">{date}</p>
	</div>
	<form onsubmit={search} class="text-right align-middle">
		<Input
			type="text"
			placeholder="Search the Unknown Universe"
			class="mr-1 inline w-100 align-middle"
			bind:value={page}
		/>
		<Button type="submit">Go</Button>
	</form>
</nav>

<div class="p-8 text-center">
	{@render children?.()}
</div>
