/// <reference path="../base/ICondition.ts" />
module bt{
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description a simple explanation
	 */
	export class ConditionDecorator implements bt.ICondition {
		public child:bt.ICondition;

		public constructor() {
		}

		public execute( input:bt.BlackBoard ):boolean {
			return true;
		}

		public setChild( child:bt.ICondition ):bt.ICondition {
			this.child = child;
			return this;
		}
	}
}