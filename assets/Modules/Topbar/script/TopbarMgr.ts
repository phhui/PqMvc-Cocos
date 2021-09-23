import SysCmd from "../../../scripts/public/SysCmd";
import BaseMgr from "../../base/BaseMgr";
import MainSceneCmd from "../../MainScene/script/MainSceneCmd";
import TopbarCmd from "./TopbarCmd";
import TopbarCtl from "./TopbarCtl";
const {ccclass} = cc._decorator;

@ccclass
export default class TopbarMgr extends BaseMgr {
    protected start():void{
	    if(this.isStart)return;
		this.isStart=true;
		this.regController(TopbarCtl.NAME,new TopbarCtl());
	}
	protected get EventList():Array<any>{
		return [TopbarCmd.SHOW_WINDOW,
                TopbarCmd.CLOSE_WINDOW,
                TopbarCmd.MODULE_NAME,
				TopbarCmd.UPDATE,
                TopbarCmd.INIT_DATA,
				TopbarCmd.SHOW_EFF,
				SysCmd.UPDATE_DATA,
                SysCmd.INIT_DATA];
	}
	protected execute(type:string, param:Object=null):void{
		this.control(TopbarCtl.NAME,param,type);
	}
}
