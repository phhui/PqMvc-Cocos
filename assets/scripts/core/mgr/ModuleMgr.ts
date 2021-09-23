import { LoadMgr } from "./loader/LoadMgr";

export default class ModuleMgr{
    public static loadModule(bundleName:string,cb:Function=null,target:any=null){
        LoadMgr.loadBundle(bundleName,()=>{
            if(cb&&target)cb.apply(target,null);
        },this);
    }
}