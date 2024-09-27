<script lang="ts">
	import type { ActionData } from '../../../.svelte-kit/types/src/routes/login/$types';

	export let form: ActionData;
</script>

<div class="flex justify-center items-center flex-col md:flex-row-reverse">
	<div class="flex flex-col space-y-6 border border-gray-500 bg-blue-950 max-w-xl p-4 rounded-lg m-8 ">
		<h1 class="font-bold text-2xl">Log-In</h1>
		<form method="POST" action="?/login" class="flex flex-col space-y-2">
			{#if form?.loginfail}
				<p class="text-red-500">{form?.reason}</p>
			{/if}
			<label for="username" class="font-semibold">Username</label>
			<input name="username" autocomplete="username" type="text" placeholder="niecze" required id="username" class="w-full p-2 rounded-lg bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 border-gray-600 border"/>
			<label for="password" class="font-semibold">Password</label>
			<input name="password" autocomplete="current-password" type="password" required id="password" placeholder="password123" class="w-full p-2 rounded-lg bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 border-gray-600 border"/>
			<button type="submit" class="p-2 bg-blue-500 text-white rounded-lg">Log-In</button>
		</form>
	</div>
	<div class="flex flex-col space-y-6 border border-gray-500 bg-blue-950 max-w-xl p-4 rounded-lg m-8 ">
		<h1 class="font-bold text-2xl">Register</h1>
		<form method="POST" action="?/register" class="flex flex-col space-y-2">
			{#if form?.registerfail}
				<p class="text-red-500">{form?.reason}</p>
			{/if}
			<label for="new-username" class="font-semibold">Username</label>
			<input name="username" autocomplete="username" type="text" placeholder="niecze" required id="new-username" class="w-full p-2 rounded-lg bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 border-gray-600 border"/>
			<label for="new-password" class="font-semibold">Password</label>
			<input name="password" autocomplete="current-password" type="password" required id="new-password" placeholder="password123" class="w-full p-2 rounded-lg bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 border-gray-600 border"/>
			<button type="submit" class="p-2 bg-blue-500 text-white rounded-lg">Log-In</button>
		</form>
	</div>
</div>
