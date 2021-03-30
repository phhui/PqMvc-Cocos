/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-01-29 14:29:03
 * @ Description:
 */

import SysCmd from "../../modules/public/SysCmd";
import EventMgr from "../pqmvc/EventMgr";

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
	private inited:Boolean=false;
	private winMap:any={};
	public static self:LayerMgr;
    constructor(){
		// EventMgr.on(SysCmd.OPEN_WINDOW,this.openWindow,this);
		EventMgr.on(SysCmd.SHOW_WINDOW,this.showWindow,this);
		EventMgr.on(SysCmd.ADD_TO_STAGE,this.show,this);
		EventMgr.on(SysCmd.REMOVE_FROM_STAGE,this.remove,this);
		cc.view.setResizeCallback(this.resize);
		LayerMgr.self=this;
	}
	private init(){
		if(this.inited)return;
		this.inited=true;
		cc.director.getScene().setAnchorPoint(cc.v2(0,0));
		this.map=this.createLayer("map");
		this.scene=this.createLayer("scene");
		this.menu=this.createLayer("menu");
		this.win=this.createLayer("win",1);
		this.guide=this.createLayer("top",1,990);
		this.top=this.createLayer("guide",1,991);
		this.loading=this.createLayer("loading",1,992);
		this.layerList=[this.map,this.scene,this.menu,this.win,this.top,this.guide,this.loading];
	}
	private createLayer(name:string,layer:number=0,zindex:number=0){
		let sp:cc.Node=new cc.Node();
		sp.name=name;
		sp.setAnchorPoint(cc.v2(0.5,0.5));
		sp.setPosition(cc.v2(0,0));
		if(layer==0)sp.parent=cc.director.getScene().getChildByName("Canvas").getChildByName("sceneRoot");
		else sp.parent=cc.director.getScene().getChildByName("Canvas").getChildByName("uiManagerRoot");
		sp.width=sp.parent.width;
		sp.height=sp.parent.height;
		sp.zIndex=zindex;
		let wg:cc.Widget=sp.addComponent(cc.Widget);
		wg.top=0;
		wg.left=0;
		wg.right=0;
		wg.bottom=0;
		wg.target=sp.parent;
		return sp;
	}
	/**0地图,1场景，2菜单，3窗口，4菜单/公告 ，5引导，6进度条**/
	public getLayer(i:number):cc.Node{
		return this.layerList[i] as cc.Node;
	}
	// public openWindow(path:string,layer:number=3){
	// 	if(this.winMap[path])this.show(this.winMap[path],layer);
	// 	else{
	// 		LoadMgr.load(path,cc.Prefab,(ri:ResInfo)=>{
	// 			this.winMap[path]=cc.instantiate(ri.res);
	// 			this.show(this.winMap[path],layer);
	// 		},this);
	// 	}
	// }
	public showWindow(nd:cc.Node,layer:number=3){
		this.show(nd,layer);
	}
	/**添加显示对象，layer添加到指定层次，0地图,1场景，菜单，3窗口，4公告 ，5引导，6进度条**/
	public show(nd:cc.Node,layer:number=3,x:number=0,y:number=0,offx:number=0,offy:number=0):void{
		if(!this.inited)this.init();
		if(!nd)return;
		if(layer==3){
			this.curWinName=nd.name;
			this.curWin=nd;
		}
		if(nd.parent!=this.layerList[layer])nd.parent=null;
		if(!nd.parent)this.layerList[layer].addChild(nd);
	}
	/**移除显示对象**/
	public remove(event:string,obj:any):void{
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
window["LayerMgr"]=LayerMgr;