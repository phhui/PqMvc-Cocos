import AniUtils from "../../com/utils/AniUtils";
import Timer from "../../com/utils/Timer";
import Monster from "../fight/Item/Monster";
import ResPxy from "../proxy/ResPxy";
import BuffVo from "./vo/BuffVo";

class BuffEff{
    private parent:cc.Node;
    private v:BuffVo;
    private target:Monster;
    public bindData(bv:BuffVo,m:Monster,parent:cc.Node){
        this.parent=parent;
        this.v=bv;
        this.target=m;
        this.playEffs(this.v);
    }
    /**加载并播放特效 */
    protected playEffs(bv:BuffVo){
        ResPxy.loadBuffPf(bv.Resource,(pf)=>{
            let bnd:cc.Node=AniUtils.initAni(pf,this.parent,(nd:cc.Node)=>{
                nd.parent=null;
                nd.destroy();
            });
            let ani=bnd.getComponent(cc.Animation);
            if(ani.getClips()[1])ani.getClips()[1].wrapMode=cc.WrapMode.Normal;
            if(bv.ClipName&&ani)ani.play(bv.ClipName);
            Timer.setTimeOut("autoRemoveSkillBuff"+bnd.uuid,this.v.Time[this.target.vo.Form-1]*0.001,()=>{
                bnd.parent=null;
                bnd.destroy();
            },this);
        },this);
    }
}