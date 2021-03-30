class GuideMgr extends BaseMgr{
    constructor(){
        super();
    }
    protected start():void{
	    if(this.isStart)return;
		this.regProxy(GuideProxy.NAME,new GuideProxy());
		this.regController(GuideCtl.NAME,new GuideCtl());
		this.isStart=true;
	}
	protected get EventList():Array<any>{
		return [GuideCmd.SHOW_WINDOW,
				GuideCmd.CLOSE_WINDOW,
                GuideCmd.MODULE_NAME,
				GuideCmd.TRIGGER,
				GuideCmd.TRIGGER_TARGET,
				GuideCmd.INIT_DATA];
	}
	protected execute(type:string, param:Object=null):void{
		switch(type){
			case GuideCmd.INIT_DATA:
			case GuideCmd.TRIGGER:
			case GuideCmd.TRIGGER_TARGET:
				this.proxy(GuideProxy.NAME,param,type);
			break;
			default:
				this.control(GuideCtl.NAME,param,type);
			break;
		}
	}
}