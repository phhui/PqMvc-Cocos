import NumUtils from "../../../scripts/com/utils/NumUtils";
import Register from "../../../scripts/core/Register";
import BaseNode from "../../base/BaseNode";
import TopbarCmd from "./TopbarCmd";
import TopbarMgr from "./TopbarMgr";

const {ccclass, property} = cc._decorator;
@ccclass
export default class TopbarUi extends BaseNode {
    @property(cc.Label)
    private earnSpeed:cc.Label=null;
    @property(cc.Label)
    private balance:cc.Label=null;
    @property(cc.Node)
    private item2:cc.Node=null;
    constructor(){
        super();
        Register.regModule(TopbarCmd.MODULE_NAME,TopbarMgr);
    }
    public bind(data:any){
        data={blance:999};
        let baseNum:number=500;
        let earn:Array<number>=[baseNum*10,baseNum*100,baseNum*1000,baseNum*10000];
        if(data.balance)this.balance.string=NumUtils.numCompress(data.balance);
    }
    public showEff(){
        this.item2.getComponent(cc.Animation).play("item2Dollar",0);
    }
}
