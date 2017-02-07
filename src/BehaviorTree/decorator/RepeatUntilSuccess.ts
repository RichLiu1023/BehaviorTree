/// <reference path="./Decorator.ts" />
/// <reference path="../base/ErrorCode.ts" />
module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-16
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 重复执行，直到子节点返回成功为止，才返回成功
	 */
	export class RepeatUntilSuccess extends bt.Decorator implements bt.INode {

		public constructor() {
			super();
			this.name = 'RepeatUntilSuccess';
		}

		public static create():bt.RepeatUntilSuccess {
			return new bt.RepeatUntilSuccess();
		}

		execute( input:bt.BlackBoard ):number {
			if ( !this.child )throw bt.ErrorCode.e1;
			let state = this.child.tick( input );
			if ( state == bt.State.running ) {
				return bt.State.running;
			}
			if ( state == bt.State.success ) {
				return bt.State.success;
			}
			return bt.State.running;
		}

	}
}