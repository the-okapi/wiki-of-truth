<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!localStorage.getItem('admin_token')) {
			goto(resolve('/login'));
		}
	});

	let { children } = $props();
</script>

{@render children?.()}
