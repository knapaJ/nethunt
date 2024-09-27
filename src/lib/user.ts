import db, { type User } from '$lib/db';
import type { Cookies } from '@sveltejs/kit';
import type { OptionalId } from 'mongodb';
import { gameIdByNaturalId, type NetworkNode } from './node-map';

export async function getLoggedInUser(cookies: Cookies): Promise<User | null> {
	const cookieUser = cookies.get('user');
	if (!cookieUser) return null;
	const userCollection = db.collection<OptionalId<User>>('users');
	const user = await userCollection.findOne({ username: cookieUser });
	if (!user) return null;
	return user;
}

export async function createUser(username: string, password: string): Promise<boolean> {
	const userCollection = db.collection<User>('users');
	const existingUser = await userCollection.findOne({ username });
	if (existingUser) return false;
	await userCollection.insertOne({ username, password, solved_fw: [], solved_nodes: [], found_nodes: [], visible_nodes: ["1"] }); // TODO: Add "1" to visible_nodes
	return true;
}

export async function checkLoginUser(username: string, password: string): Promise<boolean> {
	const userCollection = db.collection<User>('users');
	const user = await userCollection.findOne({ username, password });
	return !!user;
}

export async function getFoundNodes(username: string): Promise<string[]> {
	const userCollection = db.collection<User>('users');
	const user = await userCollection.findOne({ username });
	if(!user) throw new Error('User not found in a bad stage');
	return user.found_nodes;
}

export async function addToVisibleNodes(username: string, node_id: string): Promise<void> {
	const userCollection = db.collection<User>('users');
	await userCollection.updateOne({ username }, { $push: { visible_nodes: node_id } });
}

export async function addSolvedNode(username: string, node_id: string): Promise<void> {
	const userCollection = db.collection<User>('users');
	await userCollection.updateOne({ username }, { $push: { solved_nodes: node_id } });
}

export async function solvedNode(node: NetworkNode, username: string, firewall:boolean = false): Promise<void> {
	for (const neighbor_natural_id of node.neighbours) {
		const neighbor_id = await gameIdByNaturalId(neighbor_natural_id);
		if (!neighbor_id) throw new Error('Neighbor not found');
		await addToVisibleNodes(username, neighbor_id);
	}

	if (firewall) {
		const userCollection = db.collection<User>('users');
		await userCollection.updateOne({ username }, { $push: { solved_fw: await gameIdByNaturalId(node.natural_id) } });
	}else{
		const userCollection = db.collection<User>('users');
		await userCollection.updateOne({ username }, { $push: { solved_nodes: node.natural_id } });
	}

}


