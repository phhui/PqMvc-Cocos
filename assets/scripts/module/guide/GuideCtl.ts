class GuideCtl extends BaseCtl{
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
        }else this.showWindow(5);
    }
    public logic(){
        this.uiScript.bindData(this.g);
    }
}