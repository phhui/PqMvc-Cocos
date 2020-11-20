import BaseController from '../base/BaseController';
import PlayerCmd from '../player/PlayerCmd';
import MapsCmd from './MapsCmd';
import MapsView from './MapsView';
export default class MapsController extends BaseController{
    static NAME:string="MapsController";
    private pxy:MapsProxy;
    private bgDict:Object;
    constructor(){
        super();
        this.target = this;
    }
    public execute(param:Object=null,type:string=null){
        super.execute();
        switch(type){
            case MapsCmd.SHOW_WINDOW:
                this.showWindow();
            break;
            case MapsCmd.CLOSE_WINDOW:
                this.closeWindow();
            break;
            case MapsCmd.MODULE_NAME:
                this.init();
            break;
        }
    }
    public init(){
        super.init();
        this.ui=new MapsView();
        this.inited=true;
        this.showWindow();
    }
    public showWindow(){
        if(!this.inited){
            this.call(SysCmd.LOAD_MODULE_RES,MapsCmd.MODULE_NAME);
            return;
        }
        this.call(SysCmd.ADD_TO_STAGE,this.ui);
        //this.createMap();
        this.call(PlayerCmd.SHOW_WINDOW);
    }
    public closeWindow(){
        super.closeWindow();
    }
    private createMap(){
        this.ui.removeChildren();
        MapsCreater.create(this.ui,this.ui.stage.stageWidth,this.ui.stage.stageHeight);
    }
    protected gameClick(e){
        this.call(MapsCmd.TOUCH,cc.v2(e.localX,e.localY));
    }
}