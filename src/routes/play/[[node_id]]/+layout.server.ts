import type { LayoutServerLoad } from './$types';
import { getLoggedInUser } from '$lib/user';
import { error, redirect } from '@sveltejs/kit';
import { nodeByGameId } from '$lib/node-map';

export const load: LayoutServerLoad = async ({ cookies, params }) => {
	const user = await getLoggedInUser(cookies);

	if (!user) throw redirect(303, '/login');
	if (!params.node_id) redirect(303, '/play/1');
	const node = await nodeByGameId(params.node_id);
	if (!node) error(404, 'Connection reset');
	if(!(user.found_nodes.includes(params.node_id))) {
		return {}
	}

	switch (node?.type) {
		case 'firewall':
			redirect(303, `/play/${params.node_id}/firewall`);
			break;
		case 'host':
			redirect(303, `/play/${params.node_id}/host`);
			break;
		default:
			throw new Error('Invalid node type');
	}
}