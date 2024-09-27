import { FwRiddle, FwRiddleType } from '$lib/riddles/fw/types';

// fibonacci numbers up to 65535
const fibonacciNumbers = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
	2584, 4181, 6765, 10946, 17711, 28657, 46368];

export default function createIsFibonacciRiddle(): FwRiddle {
	const answer = fibonacciNumbers[Math.floor(Math.random() * fibonacciNumbers.length)];
	let options = [answer];
	while (options.length < 7) {
		const randomNumber = Math.floor(Math.random() * 65536);
		if (!fibonacciNumbers.includes(randomNumber)) {
			options.push(randomNumber);
		}
	}

	return new FwRiddle(FwRiddleType.IsFibonacci, answer, options);
}