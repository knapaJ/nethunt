import { FwRiddle, FwRiddleType } from '$lib/riddles/fw/types';

function isPowerOfTwo(n: number): boolean {
	return (n & (n - 1)) === 0;
}

export default function createIsPowerOfTwoRiddle(): FwRiddle {
	const answer = Math.pow(2, Math.floor(Math.random() * 16));
	const options = [answer];
	while (options.length < 7) {
		const randomNumber = Math.floor(Math.random() * 65536);
		if (!isPowerOfTwo(randomNumber)) {
			options.push(randomNumber);
		}
	}

	return new FwRiddle(FwRiddleType.IsPowerOfTwo, answer, options);
}
