import db, { type NaturalIdToGameId } from '$lib/db';
import type { OptionalId } from 'mongodb';

type NetworkNode = {
	name: string,
	type: 'firewall' | 'host',
	natural_id: number,
	neighbours: number[],
	description: string,
	cipher_text?: string,
	answer_text?: string[],
	answer_description?: string,
	answer_data?: string
	goal?: boolean
	location_hint: string
}

export const nodeMap:NetworkNode[] = 	[
	{
		name: 'Perimeter Firewall',
		type: 'firewall',
		natural_id: 1,
		neighbours: [2],
		description: 'Ok, fine, let\'s start with the basics. First line of defense, firewall. It\'s job is to filter out the bad traffic from the good traffic. It\'s like a bouncer at a club, letting in only the people with the right credentials. Now, only if you were able to find the one odd unguarded door...',
		answer_description: 'Good job! You found the backdoor. Now, let\'s move on to the next node.',
		location_hint: '"Time for a good coffee", it says. I wouldn\'t say it\'s a good coffee, but it\'s a coffee.'
	},
	{
		name: 'Central Router',
		type: 'host',
		natural_id: 2,
		neighbours: [1,3,4],
		description: 'The router is the traffic cop of the network. It directs the traffic to the right destination. It\'s like the postman, making sure the mail reaches the right address. But if you want to know where the mail is going, you need to be the postman. Or you just can get into the postman\'s head...',
		cipher_text: 'For all I can tell, the router is protected by a master password. Sniffing around, I managed to capture a hash. It aint no known hashing algo, but I\'m sure you can crack it. The hash is: 0x1DC19DF4A9A0B3AE24A7',
		answer_text: ['networkpanic'],
		answer_description: 'Good. Now let\'s get crankin\'.',
		location_hint: 'Sometimes the homeless under the bridge get the most work done.'
	},
	{
		name: 'Web Server',
		type: 'host',
		natural_id: 3,
		neighbours: [2],
		description: 'The web server is like a library. Maybe public, maybe private, but it aint no security vault. Still, might be of some use...',
		cipher_text: 'Password hint: For milenia they walk earth, always the same. In the morning they crawl on four legs, in the afternoon they walk on two legs, and in the evening they walk on three legs. What are they? Or a much better question, who am I?',
		answer_text: ['sphinx'],
		answer_description: 'As expected, not much here. Just some logs and shit... Wait! This could be usefull... The admin always logs into this machine form the host IPXy003 under the username \'aiedail\'',
		location_hint: "They say this stairway is from Harry Potter. Moving under your feet, and once you go down it, it disappears behind you, as if it changed place."
	},
	{
		name: "DMZ Firewall",
		type: 'firewall',
		natural_id: 4,
		neighbours: [2,5],
		description: "The DMZ firewall divides the DMZ, where traffic from the external and internal network is allowed, and the internal network. No external traffic is allowed there, so that's where all the juicy bits are!",
		answer_description: "This is like it. The private part of the network.",
		location_hint: "Refreshments! Get your refreshments here!"
	},
	{
		name: "Switch",
		type: 'host',
		natural_id: 5,
		neighbours: [4,6,7,8,9],
		description: "Switch is like a crossroads, it won't tell you much, just show you many roads for you to choose which to go down...",
		location_hint: "When you want to go over, but you don't want to get wet. I, personally, prefer to be carried."
	},
	{
		name: "PCl011",
		type: 'host',
		natural_id: 6,
		neighbours: [5],
		description: "Well, a host. Some kind of nondescript machine connected to the network. But you know what is stored on machines? Data!",
		cipher_text: "This one seems to be a bit tougher, it needs two things. First part, a username (no idea what that is), and second, a password. Luckily there is a password hint: 'The time it takes for a bird to become a bird again.' I guess we'll find out, how well you know 'The Librarian', won't we?",
		answer_text: ['shintsusu', "25939"],
		answer_description: "Heureka! Not the pot of gold, but a pot of data. There is a certificate here, might be useful later on. 'cGVlcG9QYW5pY25lc3RpaGFtamV0b2J1bHNoaXRtZWxqc2VtdG9kZWxhdGRyaXY='",
		location_hint: "Drink up me hearties, yo ho!"
	},
	{
		name: "IPXy003",
		type: 'host',
		natural_id: 7,
		neighbours: [5],
		description: "Another host, another machine. But this one seems to be a bit more interesting. The admin logs in from here, so there might be some useful information here...",
		cipher_text: "That's weird, no password needed, just a number. The machine seems to be impenetrable, but this number might be OSINT. Try looking for the personal number of the lead dev for the 'My BUT' app.",
		answer_text: ['161823'],
		answer_description: "Now. This is no ordinary host. This is a proxy server. It's job is to relay the traffic between the internal and external network. It's like a middleman, but a middleman that can be easily manipulated. Let's see what we can do with it... No files, some logs... hold on, a username. 'しゅんつす'",
		location_hint: "Library is closed now. But have you tried the back door?"
	},
	{
		name: "PCh021",
		type: 'host',
		natural_id: 8,
		neighbours: [5],
		description: "Well, a host. Some kind of nondescript machine connected to the network. But you know what is stored on machines? Data!",
		cipher_text: "This machine is basically wide open, hacked it for you already. There was basically only one file of interest there, pulled it out of the password manager. 'ZGVybWVudGFyaWU6cG90b2Znb2xk' Can you decipher it for me? For... uhm... research purposes.",
		answer_text: ['dermentarie:potofgold'],
		answer_description: "Well, this is interesting. Nothing to see here, move along.",
		location_hint: "In the old brewery, underneath the stairs. My grandma used to say that the best beer is from the 7th step."
	},
	{
		name:"Internal Firewall",
		type: 'firewall',
		natural_id: 9,
		neighbours: [5,10],
		description: "The internal firewall is the last line of defense. It's like the last door in a dungeon, the one that leads to the treasure. But you need to find the key first...",
		answer_description: "I smell goodies...",
		location_hint: "The ducks like it, they seem happy to be honest. Sitting under the tree is more my speed though."
	},
	{
		name: "Secure Database Server",
		type: 'host',
		natural_id: 10,
		neighbours: [9],
		description: "The database server is like a treasure chest. It's where all the valuable information is stored. But you need to know how to open it...",
		cipher_text: "To the chase: 1. admin username, 2. admin password, 3. certificate. They sould be laying somewhere around here...",
		answer_text: ['aiedail', 'potofgold', 'cGVlcG9QYW5pY25lc3RpaGFtamV0b2J1bHNoaXRtZWxqc2VtdG9kZWxhdGRyaXY='],
		answer_description: "Mine now... You never saw me...",
		goal: true,
		location_hint: "Sometimes you just need a drink... Not beer you alcoholic, a drink, a good refreshing glass of water. Still or sparkling?"
	}
];




async function getMappingToGameIds(){
	const nodeNaturalToGameIdMappingCollection = db.collection<OptionalId<NaturalIdToGameId>>('nodeNaturalToGameId');
	for (const node of nodeMap){
		const natural_id = node.natural_id;
		const mapping = await nodeNaturalToGameIdMappingCollection.findOne({natural_id});
		if (!mapping){
			const new_game_id = natural_id===1? "1" : Math.random().toString(36).substring(2, 8);
			await nodeNaturalToGameIdMappingCollection.insertOne({natural_id: natural_id, game_id: new_game_id});
		}
	}

	return await nodeNaturalToGameIdMappingCollection.find().toArray();
}

export async function nodeByGameId(gameId:string):Promise<NetworkNode|null>{
	const mapping = await getMappingToGameIds();
	return nodeMap.find(node => mapping.find(m => m.game_id === gameId)?.natural_id === node.natural_id) ?? null;
}

export async function gameIdByNaturalId(naturalId:number):Promise<string|null>{
	const mapping = await getMappingToGameIds();
	return mapping.find(m => m.natural_id === naturalId)?.game_id ?? null;
}