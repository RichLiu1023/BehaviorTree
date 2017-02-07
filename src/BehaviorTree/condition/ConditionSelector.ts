/// <reference path="./ConditionComposite.ts" />

module bt{
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 条件选择器，只要有一个为 true ，则返回 true，否则 false
	 */
	export class ConditionSelector extends bt.ConditionComposite {
		public constructor() {
			super();
		}

		public static create():bt.ConditionSelector {
			return new bt.ConditionSelector();
		}

		public execute( input:bt.BlackBoard ):boolean {
			let len:number = this.children.length;
			if ( len == 0 )return true;
			for ( var idx = 0; idx < len; idx++ ) {
				let node = this.children[ idx ];
				let result = node.execute( input );
				if ( result ) {
					return true;
				}
			}
			return false;
		}
	}
}