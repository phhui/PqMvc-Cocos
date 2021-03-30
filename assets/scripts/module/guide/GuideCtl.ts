import Timer from "../../com/utils/Timer";
import BaseCtl from "../base/BaseCtl";
import GuideCmd from "./GuideCmd";
import GuideProxy from "./GuideProxy";
import GuideUi from "./GuideUi";
import GuideVo from "./item/GuideVo";

export default class GuideCtl extends BaseCtl{
    public static NAME:string='GuideController';
    private pxy:GuideProxy;
    private uiScript:GuideUi;
    private g:GuideVo;
    constructor(){
        super(GuideCmd.MODULE_NAME);
    }
    public execute(param:Object=null,type:string=null){
        if(!this.pxy)this.pxy=this.getProxy(GuideProxy.NAME);
        switch(type){
            case GuideCmd.SHOW_WINDOW:
                this.g=param as GuideVo;
                if(this.g.Delay)Timer.setTimeOut("delayShowGuide"+this.g.Tid,this.g.Delay,()=>{
                    this.show();
                },this);
                else this.show();
            break;
            case GuideCmd.CLOSE_WINDOW:
                this.close();
            break;
            case GuideCmd.TRIGGER:
                if(this.uiScript)this.uiScript.bindData(param as GuideVo);
            break;
        }
    }
    protected show(){
        if(!this.inited){
            this.loadPrefab("modules/guide/Guide",(pf)=>{
                if(this.inited)return;
                this.ui=cc.instantiate(pf);
                this.uiScript=this.ui.getComponent("GuideUi");
                this.init();
                this.inited=true;
                this.showWindow(5);
            });
        }else this.showWindow(5);
    }
    public logic(){
        this.uiScript.bindData(this.g);
    }
}