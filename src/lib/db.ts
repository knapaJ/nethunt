import { MongoClient, type ObjectId } from 'mongodb';
import { DB_URI } from '$env/static/private';

console.log('Connecting to database...');
console.log('DB_URI:', DB_URI);

const client = new MongoClient(DB_URI);
await client.connect();

export default client.db('nnf-data');

export interface SiteSettings {
	num_reloads: number;
	_id?: ObjectId;
}

export interface FwRiddleSettings {
	fw_id: string;
	current_riddle_type: number;
	options: number[];
	answer: number;
	_id?: ObjectId;
}

export interface User {
	username: string;
	password: string;
	solved_nodes: number[];
	solved_fw: string[];
	found_nodes: string[];
	visible_nodes: string[];
	_id?: ObjectId;
}

export interface NaturalIdToGameId{
	natural_id: number;
	game_id: string;
	_id?: ObjectId;
}