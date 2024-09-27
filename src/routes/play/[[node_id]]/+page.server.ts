import type { PageServerLoad } from './$types';
import { nodeByGameId } from '$lib/node-map';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const node = await nodeByGameId(params.node_id ?? "1");
	if(!node) error(404, 'Connection reset');
	return { props: { go_find: node.location_hint}};
}