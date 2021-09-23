import EventMgr from "./core/pqmvc/EventMgr";
import Register from "./core/Register";
import ModuleMgr from "./public/ModuleMgr";
import SysCmd from "./public/SysCmd";


const {ccclass, property} = cc._decorator;
@ccclass
class Main extends cc.Component {
    start () {
        new Register();
        cc.debug.setDisplayStats(false);
    }
    onEnable(){
        let manager = cc.director.getCollisionManager(); 
        manager.enabled = true;
        manager.enabledDebugDraw=true;
        ModuleMgr.loadModule("Modules",()=>{
            EventMgr.emit(SysCmd.GAME_INIT);
        },this);
    }
}