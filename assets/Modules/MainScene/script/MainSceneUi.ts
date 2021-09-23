import PointUtils from "../../../scripts/com/utils/PointUtils";
import Timer from "../../../scripts/com/utils/Timer";
import Log from "../../../scripts/core/mgr/Log";
import Register from "../../../scripts/core/Register";
import SysCmd from "../../../scripts/public/SysCmd";
import BaseUi from "../../base/BaseUi";
import MainSceneCmd from "./MainSceneCmd";
import MainSceneMgr from "./MainSceneMgr";

const {ccclass, property} = cc._decorator;
@ccclass
export default class MainSceneUi extends BaseUi{
    @property(cc.Node)
    private clickArea:cc.Node=null;
    @property(cc.Node)
    private plotList:Array<cc.Node>=[];
    @property(cc.Node)
    private testNd:cc.Node=null;
    @property(cc.Node)
    private expendList:Array<cc.Node>=[];
    private startPos:cc.Vec3=new cc.Vec3();
    private defPos:cc.Vec3=new cc.Vec3();
    private hitCheckList:any={};
    private t:number=0;
    private curScale:number=1;
    private expendIdx:number=0;
    private isNeedEff:boolean=false;
    constructor(){
        super();
        Register.regModule(MainSceneCmd.MODULE_NAME,MainSceneMgr);
    }
    onLoad(){
        super.onLoad();
    }
}