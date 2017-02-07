/// <reference path="./Decorator.ts" />
/// <reference path="../base/ErrorCode.ts" />
module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 不管子节点返回什么，都返回成功
	 */
	export class Succeeder extends bt.Decorator implements bt.INode {

		public constructor() {
			super();
			this.name = 'Succeeder';
		}

		public static create():bt.Succeeder {
			return new bt.Succeeder();
		}

		execute( input:bt.BlackBoard ):number {
			if ( !this.child )throw bt.ErrorCode.e1;
			let state = this.child.tick( input );
			if ( state == bt.State.running ) {
				return bt.State.running;
			}
			return bt.State.success;
		}
	}
}