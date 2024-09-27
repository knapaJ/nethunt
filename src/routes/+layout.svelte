<script lang="ts">
	import "../app.css"
	import User from './User.svelte';
	import { page } from '$app/stores';
	import Logout from './Logout.svelte';

	let showMenu = false;
	function toggleNavbar() {
		showMenu = !showMenu;
	}
</script>


<main>

	<!-- Navbar: source=https://flowbite.com/docs/components/navbar/ -->
	<nav class="bg-white border-gray-200 dark:bg-gray-900 top-0 sticky">
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
				<img src="/NetHunt_wide.png" class="h-8" alt="NetHunt Logo" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NetHunt</span>
			</a>
			<button on:click={toggleNavbar} type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
				<span class="sr-only">Open main menu</span>
				<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
				</svg>
			</button>
			<div class="{showMenu?'flex':'hidden'} w-full md:block md:w-auto justify-end" id="navbar-default">
				<ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
					<li>
						<User user={$page.data.user}/>
					</li>
					<li>
						<a href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Network Monitor</a>
					</li>
					<li>
						<a href="/play" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Play Game</a>
					</li>
					<Logout user={$page.data.user}/>
				</ul>
			</div>
		</div>
	</nav>
	<div class="h-screen dark:bg-gray-950 dark:text-white text-black">
		<slot></slot>
	</div>
	<footer class="text-gray-900 text-center dark:bg-gray-900 dark:text-white p-1 fixed bottom-0 w-full bg-white flex justify-between">
		<div class="text-sm">NetHunt game by <a href="https://discordapp.com/users/643923835288027137/" class="hover:text-blue-700" target="_blank ">@niecze</a></div>
		<div>
			Contact me: <a href="https://discord.gg/WujRFcEKRu" class="hover:text-blue-700" target="_blank ">Discord</a>
		</div>
	</footer>
</main>