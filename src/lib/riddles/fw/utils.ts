import db, { type FwRiddleSettings } from '$lib/db';
import type { OptionalId } from 'mongodb';
import { FwRiddle, FwRiddleType } from '$lib/riddles/fw/types';
import createCommonDivisorRiddle from '$lib/riddles/fw/common-divisor';
import createIsPrimeRiddle from '$lib/riddles/fw/is-prime';
import createIsFibonacciRiddle from '$lib/riddles/fw/is-fibonacci';
import createIsPerfectSquareRiddle from '$lib/riddles/fw/is-perfect-square';
import createIsPowerOfTwoRiddle from '$lib/riddles/fw/is-power-of-two';

function createFwRiddle(riddleType: FwRiddleType): FwRiddle {
	switch (riddleType) {
		case FwRiddleType.CommonDivisor:
			return createCommonDivisorRiddle();
		case FwRiddleType.IsPrime:
			return createIsPrimeRiddle();
		case FwRiddleType.IsFibonacci:
			return createIsFibonacciRiddle();
		case FwRiddleType.IsPerfectSquare:
			return createIsPerfectSquareRiddle();
		case FwRiddleType.IsPowerOfTwo:
			return createIsPowerOfTwoRiddle();
		default:
			throw new Error('Invalid riddle type or not implemented yet');
	}
}

export async function getCurrentRiddle(fw_id: string, reset: boolean = false): Promise<FwRiddle> {
	if (reset) {
		await resetCurrentRiddle(fw_id);
	}
	const currentFwSettingsCollection = db.collection<OptionalId<FwRiddleSettings>>('fw-settings');
	let currentFwSettings = await currentFwSettingsCollection.findOne({ fw_id: fw_id });
	if (!currentFwSettings) {
		const newRiddle = createFwRiddle(Math.floor(Math.random() * Object.keys(FwRiddleType).length / 2));
		const newFwSettings = {
			fw_id,
			current_riddle_type: newRiddle.type,
			options: newRiddle.options,
			answer: newRiddle.answer
		} satisfies FwRiddleSettings;
		const insertOneResult = await currentFwSettingsCollection.insertOne(newFwSettings);
		currentFwSettings = {
			_id: insertOneResult.insertedId,
			...newFwSettings
		};
	}

	return new FwRiddle(currentFwSettings.current_riddle_type, currentFwSettings.answer, currentFwSettings.options);
}

export async function resetCurrentRiddle(fw_id: string): Promise<void> {
	const currentFwSettingsCollection = db.collection<OptionalId<FwRiddleSettings>>('fw-settings');
	await currentFwSettingsCollection.deleteOne({ fw_id: fw_id });
}

export async function resetAllRiddles(): Promise<void> {
	const currentFwSettingsCollection = db.collection<OptionalId<FwRiddleSettings>>('fw-settings');
	await currentFwSettingsCollection.deleteMany({});
}
