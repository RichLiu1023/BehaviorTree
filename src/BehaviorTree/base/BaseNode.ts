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

		protected getAndCreateMethod(input: bt.BlackBoard): any {
			if (input.btMethod[this.hashid]) {
				return input.btMethod[this.hashid];
			}
			else {
				let data = { index: 0 };
				if (!input) return data;
				input.btMethod[this.hashid] = data;
				return input.btMethod[this.hashid];
			}
		}

		clearMethod(input: bt.BlackBoard): void {
			if (input.btMethod[this.hashid]) {
				input.btMethod[this.hashid] = null;
			}
		}
	}
}