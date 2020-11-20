class Player extends cc.Node{
    private v:PlayerVo;
    private txt_name:cc.Label;
    private model:cc.Node;
    private lfooder:cc.Node;
    private rfooder:cc.Node;
    private to:any;
    private fooderStatus:boolean;
    private fooderFix:number=3;
    constructor(_v:PlayerVo){
        super();
        this.v=_v;
        this.createView();
    }
    private createView(){

    }
    public moveTo(p){
        this.to=p;
    }
    private move(){

    }
    public stand(){
        
    }
    public walk(){

    }
    public jump(){

    }
}