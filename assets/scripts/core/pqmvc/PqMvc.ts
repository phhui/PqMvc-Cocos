/**
 * @ Author: phhui
 * @ Create Time: 2021-08-20 09:56:17
 * @ Modified by: phhui
 * @ Modified time: 2021-08-27 17:47:46
 * @ Description:
 */

import BaseObject from "./BaseObject";
import DataHelper from "./DataHelper";
import EventMgr from "./EventMgr";
import ProxyMgr from "./ProxyMgr";

export default class PqMvc extends BaseObject{
	public static pxyDict:any={};
	constructor(){
		super();
	}
	public once(e:string,func:Function,target:any){
		EventMgr.once(e,func,target);
	}
	public onCtl(event:string,func:Function,target:any){
		EventMgr.onCtl(event,func,target);
	}
	public on(event:string,func:Function,target:any){
		EventMgr.on(event,func,target);
	}
	public emit(event:string,...args){
		args.unshift(event);
		EventMgr.emit.apply(EventMgr,args);
	}
	public remove(event:string,func:Function=null,target:any=null){
		EventMgr.off(event,target);
	}
	protected regProxy(name:string,mod:any):void{
		ProxyMgr.reg(name,mod);
		mod.Mgr=this;
	}
	protected proxy(name:string,param:Object,type:string=null):void{
		let pxy=ProxyMgr.getPxy(name);
		if(pxy)pxy.execute(param,type);
		else throw new Error("proxy :"+name+"未注册");
	}
	/**获取proxy**/
	public getProxy(name:string):any{
		return ProxyMgr.getPxy(name);
	}
	public shareData(key: string, data: any): void{
		DataHelper.self.shareData(key, data);
	}
    public getData(key: string): any{
       return DataHelper.self.getData(key);
	}
	public delData(key:string){
		DataHelper.self.delData(key);
	}
}