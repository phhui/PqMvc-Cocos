const {ccclass, property} = cc._decorator;
@ccclass
export default class Main extends cc.Component {
    onLoad () {
        new Register();
        this.node.addChild(Loading.self);
        EventHelper.on(SysCmd.CONFIG_COMPLETE,this.createGame,this);
        EventHelper.emit(SysCmd.LOAD_CONFIG);
    }
    start () {
    }
    createGame(){
        let lm:LayerMgr=new LayerMgr();
        this.node.addChild(lm);
        EventHelper.emit(MapsCmd.SHOW_WINDOW);
    }
    // update (dt) {}
}
