/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-03-30 21:56:55
 * @ Description:
 */

class Config{
	static urlList: Array<any> = [];
	public static configDict:any={};
	constructor()
	{
	}
	static getConfig(name:string){
		return this.configDict[name];
	}
} 