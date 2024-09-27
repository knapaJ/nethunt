import { FwRiddle, FwRiddleType } from './types';

export default function createCommonDivisorRiddle(): FwRiddle {
	const answerDivisor = Math.floor(Math.random() * 10) + 1;

	const maxMultiple = Math.floor(65535 / answerDivisor);
	const randomMultiple = Math.floor(Math.random() * maxMultiple) + 1;
	const answer = answerDivisor * randomMultiple;

	const numbers = new Set<number>(); // Použijeme Set pro unikátní čísla

	while (numbers.size < 7) {
		// Generujeme náhodné číslo mezi 0 a 65535
		const randomNumber = Math.floor(Math.random() * 65536);

		// Pokud číslo není dělitelné daným dělitelem, přidáme ho do množiny
		if (randomNumber % answerDivisor !== 0) {
			numbers.add(randomNumber);
		}
	}
	const options = Array.from(numbers); // Převod na pole
	options.push(answer); // Přidání správné odpovědi

	return new FwRiddle(FwRiddleType.CommonDivisor, answer, options);
}