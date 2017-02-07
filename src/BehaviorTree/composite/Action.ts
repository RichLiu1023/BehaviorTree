/// <reference path="../base/BaseNode.ts" />
/// <reference path="../base/INode.ts" />


module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 动作类、叶子类
	 */
	export class Action extends BaseNode implements bt.INode {
		public name: string = 'Action';
		public constructor() {
			super();
		}
		public setCondition(condition: bt.ICondition): bt.INode {
			this.condition = condition;
			return this;
		}
	}
}