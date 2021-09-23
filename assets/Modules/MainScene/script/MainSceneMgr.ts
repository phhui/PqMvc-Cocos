import SysCmd from "../../../scripts/public/SysCmd";
import BaseMgr from "../../base/BaseMgr";
import MainSceneCmd from "./MainSceneCmd";
import MainSceneCtl from "./MainSceneCtl";
import MainSceneProxy from "./MainSceneProxy";
const {ccclass} = cc._decorator;

@ccclass
export default class MainSceneMgr extends BaseMgr {
    protected start():void{
	    if(this.isStart)return;
		this.isStart=true;
		this.regProxy(MainSceneProxy.NAME,new MainSceneProxy());
		this.regController(MainSceneCtl.NAME,new MainSceneCtl());
	}
	protected get EventList():Array<any>{
		return [MainSceneCmd.SHOW_WINDOW,
                MainSceneCmd.CLOSE_WINDOW,
                MainSceneCmd.MODULE_NAME,
				SysCmd.GAME_INIT,
                MainSceneCmd.INIT_DATA];
	}
	protected execute(type:string, param:Object=null):void{
		switch(type){
			case MainSceneCmd.INIT_DATA:
				this.proxy(MainSceneProxy.NAME,param,type);
			break;
			default:
				this.control(MainSceneCtl.NAME,param,type);
			break;
		}
	}
}
