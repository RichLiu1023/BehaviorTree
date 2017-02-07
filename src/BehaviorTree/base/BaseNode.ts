/// <reference path="./ICondition.ts" />
/// <reference path="../BlackBoard.ts" />
/// <reference path="../BehaviorTree.ts" />


module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 基本节点
	 */
	export class BaseNode {
		public static hashid: number = 1;

		public name: string = 'Node';
		public condition: bt.ICondition;
		public hashid: number = 0;
		public constructor() {
			this.hashid = BaseNode.hashid++;
		}

		precondition(input: bt.BlackBoard): boolean {
			if (this.condition) {
				return this.condition.execute(input);
			}
			return true;
		}

		tick(input: bt.BlackBoard): number {
			if (!this.precondition(input)) {
				return bt.State.failure;
			}
			return this.execute(input);
		}

		execute(input: bt.BlackBoard): number {
			return bt.State.failure;
		}
	}
}