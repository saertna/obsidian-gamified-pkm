<script lang="ts">
	import {setIcon} from "obsidian";

	export let id: string;
	let el: HTMLElement;

	$: if(el && id) setIcon(el, id);
</script>

<span bind:this={el}></span>
