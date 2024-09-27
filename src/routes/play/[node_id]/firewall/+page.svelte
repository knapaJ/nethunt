<script lang="ts">
	export let data;
</script>

<div class="flex flex-col space-y-4 p-2">
	<h1 class="block text-center text-2xl">{data.props.node.name}</h1>
	<p>{data.props.node.description}</p>

	{#if !data.props.solved}
		<p>One of these ports is not like the other. One of them will lead you forward, the others will bring doom.</p>

		<div class="grid grid-cols-3 content-center">
			{#each data.props.options as option}
				<div class="flex flex-row space-x-4">
					<form method="post" action="?/submit_option" >
						<input type="hidden" name="option" value={option}/>
						<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" type="submit">{option}</button>
					</form>
				</div>
			{/each}
		</div>
	{:else}
		<p>{data.props.node.answer_description}</p>

		<div class="flex flex-col">
			{#each data.props.neighbors as neighbor}
				<a href="/play/{neighbor}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Go to {neighbor}</a>
			{/each}
		</div>
	{/if}

</div>