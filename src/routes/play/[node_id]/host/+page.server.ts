import type { Actions, PageServerLoad } from './$types';
import { getLoggedInUser, solvedNode } from '$lib/user';
import { type Action, error, redirect } from '@sveltejs/kit';
import { gameIdByNaturalId, nodeByGameId } from '$lib/node-map';
import { getCurrentRiddle } from '$lib/riddles/fw/utils';

export const load: PageServerLoad = async ({ cookies, params}) => {
	const user = await getLoggedInUser(cookies);

	if (!user) throw redirect(303, '/login');
	const node = await nodeByGameId(params.node_id);
	if (!node) error(404, 'Connection reset');
	if (node?.type !== 'host') redirect(303, `/play/${params.node_id}`);

	if(!node.answer_text && !user.solved_nodes.includes(node.natural_id)) {
		await solvedNode(node, user.username, false);
	}

	const options: number[] = [];
	for (let i = 0; i < (node.answer_text?.length ?? 0); i++) {
		options.push(i);
	}
	console.log(node.answer_text);
	const neighbor_game_ids = await Promise.all(node.neighbours.map(async (neighbor_natural_id) => {
		return await gameIdByNaturalId(neighbor_natural_id);
	}));

	return {props: {name: node.name, solved: user.solved_nodes.includes(node.natural_id),
			description: node.description,
			cipher_text: node.cipher_text,
			options: options,
			answer_description: node.answer_description,
			neighbors: neighbor_game_ids,
			goal: node.goal
	}};
};

export const actions = {
	submit: async ({ cookies, params, request }) => {
		const data = await request.formData();

		const user = await getLoggedInUser(cookies);
		const node = await nodeByGameId(params.node_id);

		if (!user) return error(401, 'Unauthorized');
		if (!node) return error(404, 'Connection reset');

		for (let i = 0; i < (node.answer_text?.length ?? 0); i++) {
			const answer = data.get(`${i}`);
			if (node.answer_text[i] !== answer) {
				return {form_message: 'Wrong answer'};
			}
		}

		await solvedNode(node, user.username, false);
	}
}satisfies Actions