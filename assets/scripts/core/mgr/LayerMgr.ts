import SysCmd from "../../public/SysCmd";
import EventMgr from "../pqmvc/EventMgr";
import { LoadMgr } from "./loader/LoadMgr";
import ResInfo from "./loader/ResInfo";

export default class LayerMgr{
	private map:cc.Node;
	private scene:cc.Node;
	private menu:cc.Node;
	private win:cc.Node;
	private guide:cc.Node;
	private top:cc.Node; 
	private loading:cc.Node;
	private layerList:Array<any>;
	private curWinName:String;
	private curWin:Object;
	private init:Boolean=false;
	private winMap:any={};
    constructor(){
		cc.director.getScene().setAnchorPoint(cc.v2(0,0));
		this.map=this.createLayer("map");
		this.scene=this.createLayer("scene");
		this.menu=this.createLayer("menu");
		this.win=this.createLayer("win");
		this.guide=this.createLayer("top");
		this.top=this.createLayer("guide");
		this.loading=this.createLayer("loading");
		this.layerList=[this.map,this.scene,this.menu,this.win,this.top,this.guide,this.loading];
		EventMgr.on(SysCmd.SHOW_WINDOW,this.showWindow,this);
		EventMgr.on(SysCmd.CLOSE_WINDOW,this.remove,this);
		cc.view.setResizeCallback(this.resize);
	}
	private createLayer(name:string){
		let sp:cc.Node=new cc.Node();
		let parent:cc.Node=cc.director.getScene().getChildByName("Canvas");
		sp.name=name;
		sp.setAnchorPoint(cc.v2(0.5,0.5));
		sp.setPosition(cc.v2(0,0));
		sp.setContentSize(parent.getContentSize());
		let wdg:cc.Widget=sp.addComponent(cc.Widget);
		wdg=parent.getComponent(cc.Widget);
		wdg.updateAlignment();
		sp.parent=parent;
		return sp;
	}
	/**0地图,1场景，2菜单，3窗口，4菜单/公告 ，5引导，6进度条**/
	public getLayer(i:number):cc.Node{
		return this.layerList[i] as cc.Node;
	}
	public openWindow(path:string,layer:number=3){
		if(this.winMap[path])this.show(this.winMap[path],layer);
		else{
			LoadMgr.load(path,cc.Prefab,(ri:ResInfo)=>{
				this.winMap[path]=cc.instantiate(ri.res);
				this.show(this.winMap[path],layer);
			},this);
		}
	}
	public showWindow(nd:cc.Node,layer:number=3){
		this.show(nd,layer);
	}
	/**添加显示对象，layer添加到指定层次，0地图,1场景，菜单，3窗口，4公告 ，5引导，6进度条**/
	public show(nd:cc.Node,layer:number=3,x:number=0,y:number=0,offx:number=0,offy:number=0):void{
		if(layer==3){
			this.curWinName=nd.name;
			this.curWin=nd;
		}
		if(nd.parent)nd.parent=null;
		this.layerList[layer].addChild(nd);
	}
	/**移除显示对象**/
	public remove(obj:any):void{
		if(!obj||!obj.parent)return;
		if(obj.parent)obj.parent.removeChild(obj);
	}
	private keyDown(e:KeyboardEvent):void{
		//this.call(SysCmd.KEY_BOARD_DOWN,e);
	}
	private keyUp(e:KeyboardEvent):void{
		//this.call(SysCmd.KEY_BOARD_UP,e);
	}
	private resize(e:Event):void{
		EventMgr.emit(SysCmd.RESIZE,e);
	}
}