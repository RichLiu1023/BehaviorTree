/// <reference path="../base/BaseNode.ts" />
/// <reference path="../base/INode.ts" />

module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 装饰器
	 */
	export class Decorator extends bt.BaseNode {
		protected child: bt.INode;

		public constructor() {
			super();
		}

		public setCondition(condition: bt.ICondition): bt.Decorator {
			this.condition = condition;
			return this;
		}

		public setChild(child: bt.INode): bt.Decorator {
			this.child = child;
			return this;
		}
	}
}