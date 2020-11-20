import BaseController from "../base/BaseController";
import MapsCmd from "../maps/MapsCmd";
import PlayerCmd from "./PlayerCmd";
import PlayerProxy from "./PlayerProxy";
import PlayerView from "./PlayerView";

export default class PlayerController extends BaseController{
    static NAME:string="PlayerController";
    private pxy:PlayerProxy;
    private bgDict:Object;
    constructor(){
        super();
        this.target = this;
    }
    public execute(param:Object=null,type:string=null){
        switch(type){
            case PlayerCmd.SHOW_WINDOW:
                this.showWindow();
            break;
            case PlayerCmd.CLOSE_WINDOW:
                this.closeWindow();
            break;
            case PlayerCmd.MODULE_NAME:
                this.initView();
            break;
            case PlayerCmd.PLAYER_JUMP:
                if(this.inited)this.ui.jump();
            break;
            case PlayerCmd.PLAYER_WALK:
                if(this.inited)this.ui.walk();
            break;
            case PlayerCmd.PLAYER_STAND:
                if(this.inited)this.ui.stand();
            break;
            case MapsCmd.TOUCH:
                this.movePlayer(param);
            break;
        }
    }
    private initView(){
        this.ui=new PlayerView();
        this.inited=true;
        this.showWindow();
    }
    public showWindow(){
        if(!this.inited){
            this.initView();
            //this.call(SysCmd.LOAD_MODULE_RES,PlayerCmd.MODULE_NAME);
            return;
        }
        this.call(SysCmd.ADD_TO_STAGE,this.ui);
    }
    public closeWindow(){

    }
    private movePlayer(p){
        this.ui.moveTo(p);
    }
}