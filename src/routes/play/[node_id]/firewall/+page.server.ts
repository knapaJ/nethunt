import type { Actions, PageServerLoad } from './$types';
import { addToVisibleNodes, getLoggedInUser, solvedNode } from '$lib/user';
import { error, redirect } from '@sveltejs/kit';
import { gameIdByNaturalId, nodeByGameId } from '$lib/node-map';
import { getCurrentRiddle, resetAllRiddles } from '$lib/riddles/fw/utils';

function shuffle(array: any[]) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}
}


export const load: PageServerLoad = async ({ cookies, params }) => {
	const user = await getLoggedInUser(cookies);

	if (!user) throw redirect(303, '/login');
	const node = await nodeByGameId(params.node_id);
	if (!node) error(404, 'Connection reset');
	if (node?.type !== 'firewall') redirect(303, `/play/${params.node_id}`);

	const riddle = await getCurrentRiddle(params.node_id);

	shuffle(riddle.options);

	console.log(riddle.answer);

	const neighbor_game_ids = await Promise.all(node.neighbours.map(async (neighbor_natural_id) => {
		return await gameIdByNaturalId(neighbor_natural_id);
	}));




	return { props: { node, options: riddle.options, solved: user.solved_fw.includes(params.node_id),
		neighbors: neighbor_game_ids } };
};

export const actions = {
	submit_option: async ({ cookies, params, request }) => {
		const data = await request.formData();
		// @ts-expect-error nevim
		const selectedOption = parseInt(data.get('option'));

		if(!selectedOption) return error(400, 'No option selected');

		const riddle = await getCurrentRiddle(params.node_id);
		const user = await getLoggedInUser(cookies);
		const node = await nodeByGameId(params.node_id);

		if (!user) return error(401, 'Unauthorized');
		if (!node) return error(404, 'Connection reset');

		console.log(riddle.options.includes(selectedOption));


		if(!(riddle.options.includes(selectedOption))) redirect(303, `/play/${params.node_id}`);
		if(riddle.answer !== selectedOption) {
			console.log('Wrong answer by user', user.username, "for node", node.natural_id, "Resetting all riddles");
			await resetAllRiddles();
			redirect(303, `/play/${params.node_id}`);
		}

		await solvedNode(node, user.username, true);


		return {success: true};

	}
} satisfies Actions;