import Tween from "../../../scripts/com/utils/Tween";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Loading extends cc.Component {
    @property(cc.Node)
    private bg:cc.Node = null;
    @property(cc.ProgressBar)
    private progress:cc.ProgressBar=null;
    @property(cc.Label)
    private msg:cc.Label=null;
    onEnable(){
        this.node.opacity=0;
        Tween.to(this.node,0.3,{opacity:1});
    }
}
