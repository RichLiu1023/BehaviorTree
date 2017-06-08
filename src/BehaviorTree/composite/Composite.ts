/// <reference path="../base/BaseNode.ts" />
/// <reference path="../base/INode.ts" />

module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 行为集合
	 */
	export class Composite extends bt.BaseNode {
		protected children: bt.INode[] = [];

		public constructor() {
			super();
		}

		public setCondition(condition: bt.ICondition): bt.Composite {
			this.condition = condition;
			return this;
		}

		public addNote(node: bt.INode): bt.Composite {
			this.children.push(node);
			return this;
		}

		public clearMethod(input: bt.BlackBoard): void {
			super.clearMethod(input);
			let len: number = this.children.length;
			for (var idx = 0; idx < len; idx++) {
				let node = this.children[idx];
				node.clearMethod(input);
			}
		}
	}
}