
import BaseMgr from '../base/BaseMgr';
import TopbarCmd from './TopbarCmd';
import TopbarCtl from './TopbarCtl';
import TopbarProxy from './TopbarProxy';
export default class TopbarMgr extends BaseMgr{
    constructor(){
        super();
    }
    protected start():void{
	    if(this.isStart)return;
		this.regProxy(TopbarProxy.NAME,new TopbarProxy());
		this.regController(TopbarCtl.NAME,new TopbarCtl());
		this.isStart=true;
	}
	protected get EventList():Array<any>{
		return [TopbarCmd.SHOW_WINDOW,
				TopbarCmd.CLOSE_WINDOW,
                TopbarCmd.MODULE_NAME,
				TopbarCmd.INIT_DATA,
				TopbarCmd.UPDATE_INFO,
				TopbarCmd.UPDATE_DATA
			];
	}
	protected execute(type:string, param:Object=null):void{
		switch(type){
			case TopbarCmd.INIT_DATA:
				this.proxy(TopbarProxy.NAME,param,type);
			break;
			default:
				this.control(TopbarCtl.NAME,param,type);
			break;
		}
	}
}