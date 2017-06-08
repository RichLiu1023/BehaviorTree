/// <reference path="../BlackBoard.ts" />

module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 节点接口
	 */
	export interface INode {
		/**
		 * 前置条件，默认应该为 true ，行为树运行时会遍历整棵树的前置条件
		 */
		precondition(input: bt.BlackBoard): boolean;
		execute(input: bt.BlackBoard): number;
		tick(input: bt.BlackBoard): number;
		clearMethod(input: bt.BlackBoard): void;
	}
}