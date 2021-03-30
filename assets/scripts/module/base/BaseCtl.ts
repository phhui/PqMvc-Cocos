class BaseCtl extends PqController{
    static NAME:string="BaseController";
    protected moduleName:string;
    constructor(_moduleName:string=null){
        super();
        this.moduleName=_moduleName;
    }
    /**界面初始化后调用 */
    public init(){
        this.ui.on(cc.Node.EventType.CHILD_REMOVED,this.destory,this);
    }
    protected show(){
        this.showWindow();
    }
	public showWindow(layer:number=3) {
        super.showWindow();
        this.emit(SysCmd.SHOW_WINDOW,this.ui,layer);
        this.emit("hideLoading");
        this.logic();
	}
	public closeWindow() {
        super.closeWindow();
        this.emit(SysCmd.CLOSE_WINDOW,this.ui);
        this.ui.active=false;
    }
    protected logic(){

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
        this.active=false;
    }
}