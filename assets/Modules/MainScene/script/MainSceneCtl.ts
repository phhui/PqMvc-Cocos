import Log from "../../../scripts/core/mgr/Log";
import SysCmd from "../../../scripts/public/SysCmd";
import BaseCtl from "../../base/BaseCtl";
import TopbarCmd from "../../Topbar/script/TopbarCmd";
import MainSceneCmd from "./MainSceneCmd";
import MainSceneProxy from "./MainSceneProxy";
import MainSceneUi from "./MainSceneUi";

export default class MainSceneCtl extends BaseCtl{
    public static NAME:string='MainSceneController';
    private Proxy:MainSceneProxy;
    protected script:MainSceneUi;
    constructor(){
        super(MainSceneCmd.MODULE_NAME);
    }
    public execute(param:Object=null,type:string=null){
        if(!this.Proxy)this.Proxy=this.getProxy(MainSceneProxy.NAME);
        switch(type){
            case SysCmd.GAME_INIT:
            case MainSceneCmd.SHOW_WINDOW:
                this.show();
            break;
            case MainSceneCmd.CLOSE_WINDOW:
                this.close();
            break;
        }
    }
	protected show(){
		super.show();
	}
    public showWindow(){
        super.showWindow();
        Log.log("打开主场景");
        this.emit(TopbarCmd.SHOW_WINDOW);
    }
    public logic(){
        
    }
}