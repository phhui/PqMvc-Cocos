import BaseCtl from "../base/BaseCtl";
import SkillCmd from "./SkillCmd";
import SkillProxy from "./SkillProxy";
import SkillUi from "./SkillUi";

class SkillCtl extends BaseCtl{
    public static NAME:string='SkillController';
    private pxy:SkillProxy;
    private uiScript:SkillUi;
    constructor(){
        super(SkillCmd.MODULE_NAME);
    }
    public execute(param:Object=null,type:string=null){
        if(!this.pxy)this.pxy=this.getProxy(SkillProxy.NAME);
        switch(type){
            case SkillCmd.SHOW_WINDOW:
                this.pxy.parseData(param as Array<any>);
                this.show();
            break;
            case SkillCmd.CLOSE_WINDOW:
                this.close();
            break;
        }
    }
    protected show(){
        if(!this.inited){
            this.loadScene("modules/skill/Skill",(pf)=>{
                if(this.inited)return;
                this.ui=cc.instantiate(pf);
                this.uiScript=this.ui.getComponent("SkillUi");
                this.init();
                this.inited=true;
                this.showWindow();
            });
        }else this.showWindow();
    }
    public closeWindow(){
        this.uiScript.clear();
        super.closeWindow();
    }
    protected logic(){
        this.uiScript.bindData(this.pxy.skillList);
    }
}