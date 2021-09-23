import LangUtils from "../../scripts/com/utils/LangUtils";
import PqUi from "../../scripts/core/pqmvc/PqUi";
import array = cc.js.array;
const {ccclass, property} = cc._decorator;
@ccclass
export default class BaseUi extends PqUi{
    @property({type:cc.Prefab})
    public itemPf:cc.Prefab[]=[];
    private pool:Array<cc.Node>=[];
    private dict:any={};
    onLoad(){
        this.lang(this.node);
    }
    protected init() {
        super.init();
    }
    public NEW(type:number=0):cc.Node{
        if(!this.itemPf||!this.itemPf[type]){
            throw new Error("未设置怪物预制体,类别"+type);
        }
        let poolKey:string=this.uuid+"_"+type;
        let nd:cc.Node=this.pool[poolKey]&&this.pool[poolKey].length>0?this.pool[poolKey].shift():cc.instantiate(this.itemPf[type]);
        if(this.dict[nd.uuid])delete this.dict[nd.uuid];
        return nd;
    }
    public FREE(nd:cc.Node,type:number=0){
        if(!nd)return;
        if(this.dict[nd.uuid])return;
        nd.parent=null;
        let poolKey:string=this.uuid+"_"+type;
        if(this.pool[poolKey]&&this.pool[poolKey].length>200)nd.destroy();
        else{
            if(!this.pool[poolKey])this.pool[poolKey]=[];
            this.pool[poolKey].push(nd);
            this.dict[nd.uuid]=true;
        }
    }
    public FIND(uuid:number){
        return this.dict[uuid];
    }
    protected lang(nd:cc.Node,autoRefresh:boolean=false){
        LangUtils.auto(nd,autoRefresh);
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
    constructor(){
        super();
    }
}