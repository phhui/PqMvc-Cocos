import { LoadMgr } from "../core/mgr/loader/LoadMgr";
import ResInfo from "../core/mgr/loader/ResInfo";
import EventMgr from "../core/pqmvc/EventMgr";
import LoadCmd from "./const/LoadCmd";

export default class ResMgr{
    private static conf:cc.JsonAsset;
    private static groupDict:any={};
    private static resDict:any={};
    constructor(){
        EventMgr.on(LoadCmd.LOAD_RES,this.loadRes,this);
        EventMgr.on(LoadCmd.LOAD_CONFIG,this.loadConfig,this);
        EventMgr.on(LoadCmd.LOAD_GROUP,this.loadGroup,this);
        // this.preload();
    }
    public preload(){
        LoadMgr.load("res",cc.JsonAsset,()=>{
            let ri:ResInfo=LoadMgr.getRes("res");
            ResMgr.conf=ri.res;
            ResMgr.readRes();
            ResMgr.readGroup();
            EventMgr.emit(LoadCmd.CONFIG_COMPLETE);
        },this);
    }
    private loadConfig(){

    }
    private loadGroup(name:string){
        LoadMgr.loadArr(ResMgr.getGroup(name),()=>{
            EventMgr.emit(LoadCmd.GROUP_LOAD_COMPLETE,name);
        },this);
    }
    private loadRes(name:string,cb:Function,target:any,priority:number=0){
        LoadMgr.load(ResMgr.getResPath(name),cb,target,priority);
    }
    public static getRes(name:string):ResInfo{
        return LoadMgr.getRes(ResMgr.getResPath(name));
    }
    public static getGroup(name:string){
        return ResMgr.groupDict[name];
    }
    public static getResPath(name:string){
        return ResMgr.resDict[name];
    }
    private static readRes(){
        let res:Array<any>=ResMgr.conf.json["resources"];
        let n:number=res.length;
        for(let i:number=0;i<n;i++){
            ResMgr.resDict[res[i].name]=res[i].url;
        }
    }
    private static readGroup(){
        let g:Array<any>=ResMgr.conf.json["groups"];
        let n:number=g.length;
        for(let i:number=0;i<n;i++){
            ResMgr.groupDict[g[i].name]=ResMgr.keyToPath(g[i].keys.split(','));
        }
    }
    private static keyToPath(arr:Array<string>){
        let n:number=arr.length;
        let res:Array<string>=[];
        for(let i:number=0;i<n;i++){
            res.push(ResMgr.getResPath(arr[i]));
        }
        return res;
    }
}