import { FwRiddle, FwRiddleType } from '$lib/riddles/fw/types';

function isPerfectSquare(n: number): boolean {
	const sqrt = Math.sqrt(n);
	return sqrt === Math.floor(sqrt);
}

export default function createIsPerfectSquareRiddle(): FwRiddle {
	const maxSquareRoot = Math.floor(Math.sqrt(65535));
	let answer = Math.floor(Math.random() * 65535);
	while (isPerfectSquare(answer)) {
		answer = Math.floor(Math.random() * 65535);
	}

	const options = [answer];
	while (options.length < 7) {
		const factor = Math.floor(Math.random() * maxSquareRoot);
		const option = factor * factor;
		if (!options.includes(option)) {
			options.push(option);
		}
	}

	return new FwRiddle(FwRiddleType.IsPerfectSquare, answer, options);
}