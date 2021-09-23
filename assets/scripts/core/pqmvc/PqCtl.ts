/**
 * @ Author: phhui
 * @ Create Time: 2021-08-20 09:56:17
 * @ Modified by: phhui
 * @ Modified time: 2021-08-27 17:45:19
 * @ Description:
 */

import PqBase from "./PqBase";
export default class PqCtl extends PqBase implements IControl{
	//static NAME:String="继承此类必需定义该NAME，且名字和文件名一样,如文件名为XXController,则NAME值为XXController";
	private _inited:Boolean=false;
	/**等待处理的事件列表，inited为false时所有事件都存储在这里，为true后遍历触发**/
	protected delayList:Array<any>=[];
	protected eventList:Array<any>=[];
	protected btnNameList: Array<any> = [];
	protected funcList: Array<any> = [];
	protected target: any;
	protected script:any;
	protected active:boolean=false;
	constructor(){
		super();
    }
	protected get inited():Boolean	{
		return this._inited;
	}
	protected set inited(value:Boolean){
		this._inited = value;
		if(value&&this.delayList){
			while(this.delayList.length>0){
				this.execute(this.delayList[0][1],this.delayList[0][0])
				this.delayList.shift();
			}
		}
	}
	public execute(param:Object=null, type:string=null):void
	{
		if(!this.active)return;
		// TODO Auto-generated method stub
		
	}
	public init(){

	}
	protected show(){
		this.inited=true;
		this.showWindow();
	}
	protected close(){
		this.closeWindow();
	}
	public showWindow() {
		this.active=true;
	}
	public closeWindow() {
		this.active=false;
	}
	/**发送指令到模块内部command处理**/
	public command(name:string,param:Object=null,type:string=null):void{
		this.__md.command(name,param,type);
	}
	/**如果界面还没初始化则延迟到初始化后再执行**/
	protected delay(name:string,param:Object=null):void{
		this.delayList.push([name,param]);
	}
	/**调用模块内部controller**/
	public control(name:string,data:Object=null,type:string=null):void{
		this.__md.control(name,data,type);
	}
	protected onClick(e:cc.Event.EventTouch): void{

	}
}