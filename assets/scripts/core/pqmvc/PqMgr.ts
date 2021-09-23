/**
 * @ Author: phhui
 * @ Create Time: 2021-08-20 09:56:17
 * @ Modified by: phhui
 * @ Modified time: 2021-08-27 17:45:22
 * @ Description:
 */

import PqMvc from "./PqMvc";

export default class PqMgr extends PqMvc{
    private commandDict:Object={};
	private controlDict:Object={};
	protected isStart:Boolean=false;
    constructor() {
    	super();
	    this.EventList.forEach(key=>{
        	this.onCtl(key,this.eventHandle,this);
        });
		this.start();
	}
	private eventHandle(...args):void{
		this.execute.apply(this,args);
	}
	protected start():void{
		if(this.isStart)return;
		this.isStart=true;
	}
	protected execute(type:string,param:Object=null):void{
		//todo
	}
	protected get EventList():Array<any>{
		return [];//add your eventType(string)
	}
	protected regController(name:string,prototype:any):void{
		this.controlDict[name]=prototype;
		this.controlDict[name].Mgr=this;
	}
	public control(name:string,param:Object=null,type:string=null):void{
		if(this.controlDict[name])this.controlDict[name].execute(param,type);
		else throw new Error(name+"未注册");
	}
	protected regCommand(name:string):void{
		this.commandDict[name]=Object.create(window[name].prototype);
		this.commandDict[name].Mgr=this;
	}
	public command(name:string,param:Object=null,type:string=null):void{
		if(this.commandDict[name])this.commandDict[name].execute(param,type);
		else throw new Error(name+"未注册");
	}
}