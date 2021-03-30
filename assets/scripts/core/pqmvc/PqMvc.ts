/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:19
 * @ Modified by: phhui
 * @ Modified time: 2021-01-28 16:52:59
 * @ Description:
 */

import BaseObject from "./BaseObject";
import DataHelper from "./DataHelper";
import EventMgr from "./EventMgr";

export default class PqMvc extends BaseObject{
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