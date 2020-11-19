class LayerMgr{
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
    constructor(){
		this.map=this.createLayer("map");
		this.scene=this.createLayer("scene");
		this.menu=this.createLayer("menu");
		this.win=this.createLayer("win");
		this.guide=this.createLayer("top");
		this.top=this.createLayer("guide");
		this.loading=this.createLayer("loading");
		this.layerList=[this.map,this.scene,this.menu,this.win,this.top,this.guide,this.loading];
		EventHelper.on(SysCmd.ADD_TO_STAGE,this.show,this);
		EventHelper.on(SysCmd.REMOVE_FROM_STAGE,this.remove,this);
		cc.view.setResizeCallback(this.resize);
	}
	private createLayer(name:string){
		let sp:cc.Node=new cc.Node();
		sp.name=name;
		sp.parent=cc.director.getScene();
		return sp;
	}
	/**0地图,1场景，2菜单，3窗口，4菜单/公告 ，5引导，6进度条**/
	public getLayer(i:number):cc.Node{
		return this.layerList[i] as cc.Node;
	}
	/**添加显示对象，layer添加到指定层次，0地图,1场景，菜单，3窗口，4公告 ，5引导，6进度条**/
	public show(event:string,obj:any,layer:number=3,x:number=0,y:number=0,offx:number=0,offy:number=0):void{
		if(layer==3){
			this.curWinName=obj.name;
			this.curWin=obj;
		}
		this.layerList[layer].addChild(obj);
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
		EventHelper.emit(SysCmd.RESIZE,e);
	}
}