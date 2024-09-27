<script lang="ts">
	export let data;
	export let form;
</script>

<div class="flex flex-col space-y-4 p-2">
	<h1 class="block text-center text-2xl">{data.props.name}</h1>
	<p>{data.props.description}</p>

	{#if !data.props.solved}
		<p>{data.props.cipher_text !== undefined ? data.props.cipher_text : "There is nothing to hack, just reload the page"}</p>

		{#if form}
			<p class="text-red-500">{form.form_message}</p>
		{/if}
		<form action="?/submit" method="post">

			{#each data.props.options as option}
				<input type="text" name={option} placeholder={`Answer ${option+1}`} class="border border-gray-400 p-2 m-2 text-gray-900" />
			{/each}
			<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Submit</button>
		</form>

	{:else}
		<p>{data.props.answer_description !== undefined ? data.props.answer_description : ""}</p>

		<div class="flex flex-col">
			{#each data.props.neighbors as neighbor}
				<a href="/play/{neighbor}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Go to {neighbor}</a>
			{/each}
		</div>
		{#if data.props.goal}
			<p>Now for the hard part. Some exercise! Run, find me as fast as you can, before someone claims your prize! Show me this pic:</p>
			<img src="/wiener.gif" alt="Well, hot dog, we have a wiener!">
		{/if}
	{/if}

</div>