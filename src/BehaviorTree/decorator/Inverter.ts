/// <reference path="./Decorator.ts" />
/// <reference path="../base/ErrorCode.ts" />

module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 反转 BTState 状态，running状态不反转
	 */
	export class Inverter extends bt.Decorator implements bt.INode {

		public constructor() {
			super();
			this.name = 'Inverter';
		}

		public static create():bt.Inverter {
			return new bt.Inverter();
		}

		execute( input:bt.BlackBoard ):number {
			if ( !this.child )throw bt.ErrorCode.e1;
			let state = this.child.tick( input );
			if ( state == bt.State.failure )state = bt.State.success;
			if ( state == bt.State.success )state = bt.State.failure;
			return state;
		}

	}
}