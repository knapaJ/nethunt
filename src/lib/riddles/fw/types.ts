export enum FwRiddleType {
	CommonDivisor = 0,
	IsPrime,
	IsFibonacci,
	IsPerfectSquare,
	IsPowerOfTwo,
}

export class FwRiddle {
	constructor(
		public type: FwRiddleType,
		public answer: number,
		public options: number[]
	) {
	}
}