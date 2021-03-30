
import BaseUi from '../base/BaseUi';
import ObjPxy from '../proxy/ObjPxy';
import GuideCmd from './GuideCmd';
import GuideVo from './item/GuideVo';
const {ccclass, property} = cc._decorator;
@ccclass
export default class GuideUi extends BaseUi{
    @property(cc.Node)
    private tip:cc.Node=null;
    @property(cc.Node)
    private arrow:cc.Node=null;
    @property(cc.Node)
    private halo:cc.Node=null;
    @property(cc.Node)
    private mask:cc.Node=null;
    @property(cc.Node)
    private maskTop:cc.Node=null;
    @property(cc.Node)
    private maskBottom:cc.Node=null;
    @property(cc.Node)
    private maskLeft:cc.Node=null;
    @property(cc.Node)
    private maskRight:cc.Node=null;
    @property(cc.Label)
    private info:cc.Label=null;
    private gv:GuideVo;
    start(){
        this.halo.on(cc.Node.EventType.TOUCH_END,this.click,this,true);
        (this.halo as any)._touchListener.setSwallowTouches(false);
    }
    public bindData(g:GuideVo){
        this.gv=g;
        this.info.string=ObjPxy.uiLang.getConfigTxt(g.Description);
        let sw:number=this.winWidth;
        let sh:number=this.winHeight;
        let x:number=g.Position[0];
        let y:number=g.Position[1];
        let offsetX:number=g.Position[2];
        let offsetY:number=g.Position[3];
        this.node.x=sw*x-sw*0.5+offsetX;
        this.node.y=sh*y-sh*0.5+offsetY;

        this.tip.x=g.Deviation[0];
        this.tip.y=g.Deviation[1];
        this.mask.active=g.IsForced;
        this.maskTop.width=sw*2;
        this.maskTop.height=sh;
        this.maskBottom.width=sw*2;
        this.maskBottom.height=sh;
        this.maskLeft.width=sw;
        this.maskRight.width=sw;
    }
    click(e){
        this.emit(GuideCmd.CLOSE_WINDOW);
        if(this.gv.Next)this.emit(GuideCmd.TRIGGER_TARGET,this.gv.Next);
    }
    destory(){
        //todo
    }
}