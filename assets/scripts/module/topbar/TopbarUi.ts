
import NumUtils from '../../com/utils/NumUtils';
import BaseUi from '../base/BaseUi';
import UiPxy from '../proxy/UiPxy';
const {ccclass, property} = cc._decorator;
@ccclass
export default class TopbarUi extends BaseUi{
    @property(cc.Label)
    private expLb:cc.Label=null;
    @property(cc.Label)
    private pexpLb:cc.Label=null;
    @property(cc.Label)
    private goldLb:cc.Label=null;
    @property(cc.Label)
    private disLb:cc.Label=null;
    @property(cc.Node)
    private disNd:cc.Node=null;
    @property(cc.Node)
    private expBarNd:cc.Node=null;
    start(){
        //todo
    }
    public bindData(data){
        //todo
        if(data.MaxExp)this.expLb.string=NumUtils.numCompress(data.Exp)+"/"+NumUtils.numCompress(data.MaxExp);
        if(data.PubHeroExp)this.pexpLb.string=NumUtils.numCompress(data.PubHeroExp);
        if(data.Gold)this.goldLb.string=NumUtils.numCompress(data.Gold);
        if(data.Diamond)this.disLb.string=NumUtils.numCompress(data.Diamond);
        if(data.MaxExp)this.expBarNd.scaleX=Math.min(data.Exp/data.MaxExp,1);
    }
    private recharge(){
        UiPxy.openShop();
    }
    destory(){
        //todo
    }
}