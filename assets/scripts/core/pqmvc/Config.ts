/**
 * @ Author: phhui
 * @ Create Time: 2021-08-20 09:56:17
 * @ Modified by: phhui
 * @ Modified time: 2021-08-27 17:44:47
 * @ Description:
 */

export default class Config{
	static urlList: Array<any> = [];
	public static configDict:any={};
	constructor()
	{
	}
	static getConfig(name:string){
		return this.configDict[name];
	}
} 