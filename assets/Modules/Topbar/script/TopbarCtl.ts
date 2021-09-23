import Log from "../../../scripts/core/mgr/Log";
import SysCmd from "../../../scripts/public/SysCmd";
import BaseCtl from "../../base/BaseCtl";
import MainSceneCmd from "../../MainScene/script/MainSceneCmd";
import TopbarCmd from "./TopbarCmd";
import TopbarUi from "./TopbarUi";

export default class TopbarCtl extends BaseCtl{
    public static NAME:string='TopbarController';
    protected script:TopbarUi;
    constructor(){
        super(TopbarCmd.MODULE_NAME);
    }
    public execute(param:Object=null,type:string=null){
        switch(type){
            case TopbarCmd.SHOW_WINDOW:
                this.show();
            break;
            case TopbarCmd.CLOSE_WINDOW:
                this.close();
            break;
            case SysCmd.UPDATE_DATA:
            case TopbarCmd.UPDATE:
                if(this.script)this.script.bind(param);
            break;
            case TopbarCmd.SHOW_EFF:
                if(this.script)this.script.showEff();
            break;
        }
    }
    public showWindow(){
        super.showWindow(4);
        Log.log("打开顶栏");
    }
    public logic(){
        this.script.bind(null);
    }
}