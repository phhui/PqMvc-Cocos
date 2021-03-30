/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-01-28 16:52:44
 * @ Description:
 */

export default class DataHelper{
		static self: DataHelper = new DataHelper();
		private dict: Object = {};
		private total: Object = {};
		private dataDict: Object = {};
		constructor()
		{
		}
		/**
		 *共享数据
		 * @param key 钥匙
		 * @param data 数据
		 */
		public shareData(key: string, data: Object,cover:boolean=true): void{
			if(cover)this.dataDict[key] = data;
		}
		/**
		 *获取数据
		 * @param key 钥匙
		 * @return
		 */
		public getData(key: string): Object{
			let data=this.dataDict[key];
			if(typeof(data)=="function")return data();
            return this.dataDict[key];
		}
		public delData(key:string){
			if(this.dataDict[key]){
				this.dataDict[key]=null;
				delete this.dataDict[key];
			}
		}
		/**
		 *数据分页
		 * @param key 索引，根据该值通过getData方法获得分页后的数据
		 * @param data 数据源
		 * @param pageNum 每页数量
		 *
		 */
		public dataSplitPage(key: string, data: Array<any>, pageNum: number){
            this.dict[key] = [];
            this.dict[key][0] = data;
            var n: number = data.length;
            var page: number = 0;
            for (var i: number = 0; i < n; i++) {
                if (i % pageNum == 0) page++;
                if (this.dict[key][page] == null) this.dict[key][page] = [];
                this.dict[key][page].push(data[i]);
            }
            this.total[key] = page;
		}
		/**
		 *获取指定页数据
		 * @param key 分页索引
		 * @param page 页数 从1开始，第0页为全部数据
		 * @return
		 *
		 */
		public getSplitPageData(key: string, page: number= 1): Array<any>{
            if (this.dict[key] == null) return null;
            return this.dict[key][page];
		}
		/**获取指定数据的总页数**/
		public getTotalNum(key: string): number{
            return this.total[key];
		}
} 