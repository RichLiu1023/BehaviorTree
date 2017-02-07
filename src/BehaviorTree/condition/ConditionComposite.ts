/// <reference path="../base/ICondition.ts" />

module bt{
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 条件集合
	 */
	export class ConditionComposite implements bt.ICondition {
		protected children:bt.ICondition[] = [];

		public constructor() {
		}

		public addCondition( node:bt.ICondition ):bt.ConditionComposite {
			this.children.push( node );
			return this;
		}

		execute( input:bt.BlackBoard ):boolean {
			return true;
		}
	}
}