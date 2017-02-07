/// <reference path="../BlackBoard.ts" />

module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description 条件接口
	 */
	export interface ICondition {
		execute( input:bt.BlackBoard ):boolean;
	}
}