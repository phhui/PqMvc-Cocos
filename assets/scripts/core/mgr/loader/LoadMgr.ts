/**
 * @ Author: phhui
 * @ Create Time: 2020-12-10 16:12:07
 * @ Modified by: phhui
 * @ Modified time: 2021-08-27 10:55:14
 * @ Description:
 */

import ResArgs from "./ResArgs";
import ResInfo from "./ResInfo";

/**
 * @example    
 *      LoadMgr.load("http://www.aaa.com/test.png",(clip:ResInfo)=>{    
 *          this.itemIcon.getComponent(cc.Sprite).spriteFrame=clip.spriteFrame;    
 *      },this);     
 * @example    
 *      LoadMgr.load("icon/item_coin",(clip:ResInfo)=>{    
 *          this.itemIcon.getComponent(cc.Sprite).spriteFrame=clip.res;    
 *      },this);
 * @class LoadMgr
 */
export class LoadMgr{
    protected static resMap={};
    protected static bundleList:any={};
    protected static loadList:Array<ResInfo>=[];
    protected static loading:boolean=false;
    protected static curLoad:ResInfo;

    protected static curArr:any;
    protected static curArrFinishNum:number=0;
    protected static arrResList:Array<any>=[];
    private static tempData:any={};
    public static getRes(resPath:string):ResInfo{
        if(this.resMap[resPath].status==2)return this.resMap[resPath];
        return null;
    }
    public static loadImg(resPath:string,cb:Function=null,target:any=null,priority:number=0){
        this.load(resPath,cc.SpriteFrame,cb,target,null,priority);
    }
    public static loadAudio(resPath:string,cb:Function=null,target:any=null,priority:number=0){
        this.load(resPath,cc.AudioClip,cb,target,null,priority);
    }
    public static load(resPath:string,resType:any,progress:Function,cb:Function,target:any,priority?:number):void;
    public static load(resPath:string,progress:Function,cb:Function,target:any,priority?:number):void;
    public static load(resPath:string,resType:any,cb:Function,target:any,priority?:number):void;
    public static load(resPath:string,cb:Function,target:any,priority?:number):void;
    public static load(resPath:string,resType:any,priority?:number):void;
    public static load(resPath:string,priority?:number):void;
    public static load(){
        let args:ResArgs=ResArgs.create.apply(ResArgs,arguments);
        if(this.resMap[args.resPath]){
            args.callback.apply(args.target,[this.resMap[args.resPath]]);
            return;
        }
        this.addRes(args);
        this._load();
    }
    
    public static loadArr(resArr:Array<string|ResArgs>,onProgress:Function,onComplete:Function,target:any,priority?:number):void;
    public static loadArr(resArr:Array<string|ResArgs>,onComplete:Function,target:any,priority?:number):void;
    public static loadArr(resArr:Array<string|ResArgs>,priority?:number):void;
    public static loadArr(){
        if(arguments.length>0){
            this.arrResList.push(arguments[0]);
            if(this.arrResList.length>2)return;
        }else if(this.arrResList.length<1)return;
        let args:Array<any>=[];
        let n:number=arguments.length;
        for(let i:number=0;i<n;i++){
            args.push(arguments[i]);
        }
        let prity:number=typeof(args[args.length-1])=="number"?args.pop():0;
        let progress=args.length>3?args[1]:null;
        let complete=args.length>3?args[2]:(args.length>1?args[1]:null);
        let target=args.length>3?args[3]:(args.length>1?args[2]:null);
        this.curArr={res:this.arrResList.shift(),onProgress:progress,onComplete:complete,target:target};
        this.curArr.total=this.curArr.res.length;
        n=this.curArr.res.length;
        this.curArrFinishNum=0;
        for(let i:number=0;i<n;i++){
            if(typeof(this.curArr.res[i])=="string")this.load(this.curArr.res[i],this.arrProgress,this.arrComplete,this,prity);
            else this.load(this.curArr.res[i].resPath,this.arrProgress,this.arrComplete,this,prity);
        }
    }
    protected static arrProgress(finishNum:number,totalNum:number){
        let finish:number=(this.curArrFinishNum/this.curArr.total)+(finishNum/totalNum)/this.curArr.total;
        this.curArr.onProgress(finish,this.curArr.total);
    }
    protected static arrComplete(){
        this.curArrFinishNum++;
        if(this.curArrFinishNum==this.curArr.total){
            this.curArr.onComplete.apply(this.curArr.target,null);
        }
    }
    public static loadBundle(bundleName:string,cb:Function=null,cbTarget:any=null,param:any=null){
        let bundle:cc.AssetManager.Bundle=this.bundleList[bundleName];
        if(bundle&&cb)cb.apply(cbTarget,[param]);
        else{
            cc.assetManager.loadBundle(bundleName, (err, bundle) => {
                if(err)cc.log("load bundle error:"+err);
                else{
                    this.bundleList[bundleName]=bundle;
                    if(cb)cb.apply(cbTarget,[param]);
                }
            });
        }
    }
    public static loadRes(resPath:string|Array<string>,bundleName:string,cb:Function=null,cbTarget:any=null){
        if(this.resMap[bundleName+"_"+resPath]){
            if(cb)cb.apply(cbTarget,[this.resMap[bundleName+"_"+resPath]]);
            return;
        }
        let bundle:cc.AssetManager.Bundle=this.bundleList[bundleName];
        if(bundle){
            if(resPath){
                if(typeof resPath=="string"){
                    bundle.load(resPath,(err,asset)=>{
                        if(err)console.log(err);
                        else if(cb){
                            this.resMap[bundleName+"_"+resPath]=asset;
                            cb.apply(cbTarget,[asset]);
                        }
                    });
                }else{
                    let key:string="loadResList_"+bundleName+"_"+resPath.toString();
                    LoadMgr.tempData[key]=resPath.length;
                    for(let i:number=0;i<resPath.length;i++){
                        bundle.load(resPath[i],(err,asset)=>{
                            let n:number=LoadMgr.tempData[key];
                            n--;
                            if(!err)this.resMap[bundleName+"_"+resPath[i]]=asset;
                            if(err)cc.log(err);
                            else if(cb&&n<=0){
                                let res:Array<any>=[];
                                for(let j:number=0;j<resPath.length;j++){
                                    res.push(this.resMap[bundleName+"_"+resPath[j]]);
                                }
                                cb.apply(cbTarget,[res]);
                                delete LoadMgr.tempData[key];
                            }else LoadMgr.tempData[key]=n;
                        });
                    }
                }
            }else return bundle;
        }else LoadMgr.loadBundle(bundleName,(resPath)=>{LoadMgr.loadRes(resPath,bundleName,cb,cbTarget);},this,resPath);
    }
    public static loadDir(bundleName:string,dirPath:string,cb:Function=null,cbTarget:any=null){
        let bundle:cc.AssetManager.Bundle=this.bundleList[bundleName];
        if(bundle){
            bundle.loadDir(dirPath,(err,asset)=>{
                if(err)cc.log(err);
                else if(cb)cb.apply(cbTarget,[asset]);
            });
        }else LoadMgr.loadBundle(bundleName,(dirPath)=>{LoadMgr.loadRes(dirPath,bundleName,cb,cbTarget);},this,dirPath);
    }
    private static addRes(args:ResArgs){
        let n:number=this.loadList.length;
        for(let i:number=0;i<n;i++){
            let ri:ResInfo=this.loadList[i];
            if(ri.resPath==args.resPath){
                ri.addCb(args.target,args.callback);
                return;
            }
        }
        this.loadList.push(new ResInfo(args));
        this.loadList.sort((a,b)=>{return b.priority-a.priority});
    }
    public static _load(){
        if(this.loadList.length<1||(this.curLoad&&this.curLoad.status==1))return;
        this.curLoad=this.loadList[0];
        this.curLoad.status=1;
        if(this.curLoad.resPath.substr(0,4)=="http"){
            cc.assetManager.loadRemote(this.curLoad.resPath, this.loaded);
        }else{
            cc.resources.load(this.curLoad.resPath, this.curLoad.resType, (completeNum,totalNum)=>{
                this.curLoad.onProgress(completeNum,totalNum);
            }, this.loaded);
        }
    }
    private static loaded(err,clip){
        LoadMgr.loadList.shift();
        if(err!=null)cc.log("load failed >>>  "+LoadMgr.curLoad.resPath+" err:"+err);
        else{
            LoadMgr.curLoad.res=clip;
            LoadMgr.resMap[LoadMgr.curLoad.resPath]=LoadMgr.curLoad;
            LoadMgr.curLoad.onComplete();
        }
        LoadMgr._load();
    }
    public static release(name:string){
        let ri:ResInfo=this.getRes(name);
        if(!ri)return;
        cc.resources.release(ri.res);
        this.resMap[name]=null;
        delete this.resMap[name];
    }
    public static releaseBundle(bundleName:string){
        let bundle:cc.AssetManager.Bundle=this.bundleList[bundleName];
        bundle.releaseAll();
        delete this.bundleList[bundleName];
    }
}