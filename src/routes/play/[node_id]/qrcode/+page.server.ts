import type { PageServerLoad } from './$types';
import { getLoggedInUser } from '$lib/user';
import { error, redirect } from '@sveltejs/kit';
import { gameIdByNaturalId, nodeByGameId, nodeMap } from '$lib/node-map';
import db, { type User } from '$lib/db';

/// !!! NODE ID IN THIS FILE IS NOT GAME ID BUT NATURAL ID !!!
export const load: PageServerLoad = async ({ cookies, params }) => {
	const user = await getLoggedInUser(cookies);

	if (!user) throw redirect(303, '/login');
	const node_natural_id = parseInt(params.node_id);
	const node = nodeMap.find(node => node.natural_id === node_natural_id);
	if (!node) error(404, 'Node not found, something went wrong!');

	const node_game_id = await gameIdByNaturalId(node_natural_id);
	if (!node_game_id) error(404, 'Node not found, something went wrong!');

	if(!(user.visible_nodes.includes(node_game_id)) && node_natural_id !== 1) error(404, 'No path to host. You have to be doing something funky!');

	if(!(user.found_nodes.includes(node_game_id))){
		const userCollection = db.collection<User>('users');
		await userCollection.updateOne({ username: user.username }, { $push: { found_nodes: node_game_id } });
	}
	console.log(node_game_id);
	redirect(303, `/play/${node_game_id}`);
};
