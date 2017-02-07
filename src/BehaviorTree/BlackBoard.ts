module bt {
	/**
	 * Create by richliu1023
	 * @date 2016-08-15
	 * @email richliu1023@gmail.com
	 * @github https://github.com/RichLiu1023
	 * @description a simple explanation
	 */
	export class BlackBoard {
		/**行为树内部必须使用的参数，外部不可用**/
		public btMethod: any = {};
		/**自定义数据集合，动态的数据可以使用此属性绑定，非行为树内部属性**/
		public content: any = {};

		public constructor() {
		}

		public static create(): bt.BlackBoard {
			return new bt.BlackBoard();
		}
		/**擦除 */
		clear(): void {
			this.content = {};
			this.btMethod = {};
		}
	}
}