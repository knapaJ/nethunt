import type { LayoutServerLoad } from './$types';
import { getLoggedInUser } from '$lib/user';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = await getLoggedInUser(cookies);

	return {
		user: user?.username ?? null
	};
};