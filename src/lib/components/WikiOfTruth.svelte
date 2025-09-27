<script lang="ts">
	import { text } from '@sveltejs/kit';

	let { checkFontSize = '5xl', textFontSize = '4xl' } = $props();
</script>

<h1 class="font-black">
	<span class="text-{checkFontSize} mr-3 align-middle text-primary">&#x2713</span><span
		class="text-{textFontSize} align-middle">Wiki of Truth</span
	>
</h1>
