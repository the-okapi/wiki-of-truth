<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import remarkBreaks from 'remark-breaks';
	import type { Plugin } from 'svelte-exmarkdown';
	const breaksPlugin = (options = {}): Plugin => ({
		remarkPlugin: [remarkBreaks, options]
	});
	const plugins = [breaksPlugin()];

	let { md } = $props();
</script>

<div class="md-container">
	<Markdown {md} {plugins} />
</div>
