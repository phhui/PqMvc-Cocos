import BaseCtl from "../base/BaseCtl";
import TopbarCmd from "./TopbarCmd";
import TopbarProxy from "./TopbarProxy";
import TopbarUi from "./TopbarUi";

export default class TopbarCtl extends BaseCtl{
    public static NAME:string='TopbarController';
    private pxy:TopbarProxy;
    private uiScript:TopbarUi;
    private data:any;
    private info:any;
    constructor(){
        super(TopbarCmd.MODULE_NAME);
    }
    public execute(param:Object=null,type:string=null){
        if(!this.pxy)this.pxy=this.getProxy(TopbarProxy.NAME);
        switch(type){
            case TopbarCmd.SHOW_WINDOW:
                this.show();
            break;
            case TopbarCmd.CLOSE_WINDOW:
                this.close();
            break;
            case TopbarCmd.UPDATE_INFO:
                this.info=param;
                if(this.uiScript)this.uiScript.bindData(param);
            break;
            case TopbarCmd.UPDATE_DATA:
                this.data=param;
                if(this.uiScript)this.uiScript.bindData(param);
            break;
        }
    }
    protected show(){
        if(!this.inited){
            this.loadPrefab("modules/topBar/TopBar",(pf)=>{
                if(this.inited)return;
                this.ui=cc.instantiate(pf);
                this.uiScript=this.ui.getComponent("TopbarUi");
                this.init();
                this.inited=true;
                this.showWindow();
            });
        }else this.showWindow();
    }
    public showWindow(){
        super.showWindow(4);
        if(this.data)this.uiScript.bindData(this.data);
        if(this.info)this.uiScript.bindData(this.info);
    }
    protected close(){
        if(!this.isShow)return;
        super.close();
    }
    public closeWindow(){
        super.closeWindow();
    }
    protected logic(){
        
    }
}