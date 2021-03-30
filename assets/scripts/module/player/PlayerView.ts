import BaseUi from "../base/BaseUi";
import PlayerCmd from "./PlayerCmd";

class PlayerView extends BaseUi{
    private p:Player;
    constructor(){
        super();
        this.createPlayer();
    }
    protected init(){
        
    }
    protected execute():void{
        
    }
    public moveTo(p){
        this.p.moveTo(p);
    }
    private createPlayer(){
        let v:PlayerVo=new PlayerVo();
        v.name="211";
        this.p=new Player(v);
        this.p.parent=this.node;
    }
}