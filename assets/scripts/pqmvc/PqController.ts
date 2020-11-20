import PqUi from "./PqUi";

export default class PqController extends PqBase implements IControl{
	//static NAME:String="继承此类必需定义该NAME，且名字和文件名一样,如文件名为XXController,则NAME值为XXController";
	private _inited:Boolean=false;
	/**等待处理的事件列表，inited为false时所有事件都存储在这里，为true后遍历触发**/
	protected delayList:Array<any>=[];
	protected eventList:Array<any>=[];
	protected btnNameList: Array<any> = [];
	protected funcList: Array<any> = [];
	protected target: any;
	protected ui: any;
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
		// TODO Auto-generated method stub
		if(this._inited)this.init();
	}
	public init(){
		this.ui=new PqUi();
	}
	public showWindow() {
		if(this._inited)this.regEvent();
	}
	public closeWindow() {
		if(this._inited)this.removeEvent();
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
	/**获取proxy，仅能获取当前模块的proxy，无法获取其它模块的proxy，其它模块proxy的数据通过shareData()和getData获取**/
	protected getProxy(name:string):any{
		return this.__md.getProxy(name);
	}
	protected regEvent(){
		// this.ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameClick,this);
		this.ui.node.on(cc.Node.EventType.TOUCH_END,this.gameClick,this);
	}
	protected removeEvent(){
		this.ui.node.off(cc.Node.EventType.TOUCH_END,this.gameClick,this);
	}
	protected gameClick(e): void{
        EventHelper.send(e, this.btnNameList, this.funcList, this.target);
	}
}