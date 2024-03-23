<button class="fab" {...$$props} on:click>
	<slot />
</button>

<style>
	.fab {
		position: absolute;
		bottom: 1em;
		right: 1em;
		padding: var(--size-2-2) var(--size-2-3);
	}
</style>
