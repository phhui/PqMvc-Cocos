import { LoadMgr } from "./mgr/loader/LoadMgr";
import LayerMgr from "./mgr/LayerMgr";
import ResMgr from "../public/ResMgr";
import LangUtils from "../com/utils/LangUtils";
// import MenuMgr from "../../Modules/Menu/script/MenuMgr";

export default class Register{
    public static dict:any={};
    constructor(){
        this.init();
        this.reg();
    }
    private reg(){
        new LoadMgr();
        new LayerMgr();
        // Register.regModule(MenuMgr);
        //todo
        //register your module on here
        //end
        new ResMgr();
    }
    public static regModule(key:string,cls:any){
        let mdl=Register.dict;
        let obj=mdl[key];
        if(obj)return;
        new cls();
        Register.dict[key]=true;
    }
    private init(){
        LangUtils.init();
    }
}
window["Register"]=Register;