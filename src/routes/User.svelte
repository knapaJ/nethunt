<script lang="ts">
	export let user: string|null = null;
</script>

{#if !user}
	<a href="/login" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log-In</a>
{:else}
	<div class="inline py-2 px-3 text-blue-900 dark:text-blue-400">Welcome, {user}</div>
{/if}