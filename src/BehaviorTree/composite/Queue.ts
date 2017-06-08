/// <reference path="./Composite.ts" />
/// <reference path="../base/ErrorCode.ts" />
/// <reference path="../BehaviorTree.ts" />

module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 队列执行所有节点后返回 success，无视子节点除running的状态
	 */
	export class Queue extends bt.Composite implements bt.INode {

		public constructor() {
			super();
			this.name = 'Queue';
		}

		public static create(): bt.Queue {
			return new bt.Queue();
		}

		execute(input: bt.BlackBoard): number {
			let len: number = this.children.length;
			if (len == 0) throw bt.ErrorCode.e1;
			let state = bt.State.success;
			let data = this.getAndCreateMethod(input);
			for (var idx = data.index; idx < len; idx++) {
				let node = this.children[idx];
				let nodestate = node.tick(input);
				if (nodestate == bt.State.running) {
					data.index = idx;
					state = bt.State.running;
					break;
				}
				else {
					node.clearMethod(input);
				}
			}
			if (state != bt.State.running) {
				data.index = 0;
			}
			return state;
		}
	}
}