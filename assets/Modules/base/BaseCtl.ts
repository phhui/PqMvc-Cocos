import { LoadMgr } from "../../scripts/core/mgr/loader/LoadMgr";
import PqCtl from "../../scripts/core/pqmvc/PqCtl";
import SysCmd from "../../scripts/public/SysCmd";


export default class BaseCtl extends PqCtl{
    static NAME:string="BaseController";
    protected moduleName:string;
	protected isLoaded:boolean=false;
    constructor(_moduleName:string=null){
        super();
        this.moduleName=_moduleName;
    }
    /**界面初始化后调用 */
    public init(){
        this.script.node.on(cc.Node.EventType.CHILD_REMOVED,this.destory,this);
    }
    protected show(){
        if(this.isLoaded)this.showWindow();
        else if(this.script){
            this.isLoaded=true;
            this.showWindow();
        }else{
            this.loadRes(this.moduleName+"/res/"+this.moduleName,(pf:cc.Prefab)=>{
                let nd:cc.Node=cc.instantiate(pf);
                this.script=nd.getComponent(this.moduleName+"Ui");
                this.showWindow();
            },this);
        }
    }
	public showWindow(layer:number=3) {
        super.showWindow();
        this.emit(SysCmd.SHOW_WINDOW,this.script.node,layer);
        this.logic();
	}
	public closeWindow() {
        if(!this.script)return;
        super.closeWindow();
        this.emit(SysCmd.CLOSE_WINDOW,this.script.node);
    } 
    protected logic(){

    }
    protected loadRes(path:string|Array<string>,cb:Function,cbTarget:any){
        // LoadMgr.load("Modules/"+path,cb,cbTarget);
        LoadMgr.loadRes(path,"Modules",cb,cbTarget);
    }
    /**场景宽度 */
    protected get sceneWidwh():number{
        return cc.view.getCanvasSize().width;
    }
    /**场景高度 */
    protected get sceneHeight():number{
        return cc.view.getCanvasSize().height;
    }
    /**屏幕宽度 */
    protected get frameWidth():number{
        return cc.view.getFrameSize().width;
    }
    /**屏幕高度 */
    protected get frameHeight():number{
        return cc.view.getFrameSize().height;
    }
    /**可见区域宽度 */
    protected get winWidth():number{
        return cc.view.getVisibleSize().width;
    }
    /**可见区域高度 */
    protected get winHeight():number{
        return cc.view.getVisibleSize().height;
    }
    destory(){
        this.close();
        this.active=false;
        this.script=null;
        this.inited=false;
    }
}