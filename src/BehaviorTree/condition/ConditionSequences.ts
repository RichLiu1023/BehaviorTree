/// <reference path="./ConditionComposite.ts" />

module bt{
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 条件序列，并行条件，只要有一个为 false，则返回 false ，否则 true
	 */
	export class ConditionSequences extends bt.ConditionComposite {

		public constructor() {
			super();
		}

		public static create():bt.ConditionSequences {
			return new bt.ConditionSequences();
		}

		execute( input:bt.BlackBoard ):boolean {
			let len:number = this.children.length;
			if ( len == 0 )return true;
			for ( var idx = 0; idx < len; idx++ ) {
				let node = this.children[ idx ];
				let result = node.execute( input );
				if ( result == false ) {
					return false;
				}
			}
			return true;
		}
	}
}