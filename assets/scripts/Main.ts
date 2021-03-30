import Register from "./core/Register";
import MapsCmd from "./module/maps/MapsCmd";

const {ccclass, property} = cc._decorator;
@ccclass
class Main extends cc.Component {
    onLoad () {
        new Register();
        EventHelper.on(SysCmd.CONFIG_COMPLETE,this.createGame,this);
        EventHelper.emit(SysCmd.LOAD_CONFIG);
    }
    start () {
    }
    createGame(){
        EventHelper.emit(MapsCmd.SHOW_WINDOW);
    }
    // update (dt) {}
}