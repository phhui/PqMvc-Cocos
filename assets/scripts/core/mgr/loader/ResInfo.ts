/**
 * @ Author: phhui
 * @ Create Time: 2020-12-04 10:42:43
 * @ Modified by: phhui
 * @ Modified time: 2021-01-18 17:10:49
 * @ Description:
 */
import CSVReader from "../../../com/utils/CSVReader";
import ResArgs from "./ResArgs";

export default class ResInfo{
    public resPath:string;
    public resType:any;
    public cbList:Array<any>=[];
    public progressList:Array<any>=[];
    private _res:any;
    public priority:number=0;
    private _use:number=0;
    private _csvDict:any;
    /**资源加载状态0未加载，1加载中，2已加载 */
    public status:number=0;
    constructor(_args:ResArgs){
        this.resPath=_args.resPath;
        this.resType=_args.resType;
        if(_args.callback&&_args.target)this.cbList.push({cb:_args.callback,target:_args.target});
        if(_args.progress&&_args.target)this.progressList.push({progress:_args.progress,target:_args.target});
        this.priority=_args.priority;
    }
    public set res(val:any){
        this._res=val;
    }
    /**加载的资源 */
    public get res(){
        this._use++;
        return this._res;
    }
    /**获取spriteFrame(仅用于获取加载的网络图片(带后缀名)精灵 return new cc.SpriteFrame(this.res))，如果是图集请使用getSpriteFrame(name) */
    public get spriteFrame():cc.SpriteFrame{
        return new cc.SpriteFrame(this._res);
    }
    /**获取图集中的资源 */
    public getSpriteFrame(name:string):cc.SpriteFrame{
        return this._res.getSpriteFrame(name);
    }
    /**如果加载的是prefab则可以用此属性直接获取对应的node,即返回cc.instantiate(res); */
    public get node():cc.Node{
        return cc.instantiate(this._res);
    }
    public get use(){
        return this._res;
    }
    /**加载CSV格式文件时才能使用此属性 */
    public get csv():CSVReader{
        let csv:CSVReader=new CSVReader();
        csv.loadCallbackFunc(null,this._res);
        return csv;
    }
    public get csvDict():any{
        if(!this._csvDict){
            let as:cc.TextAsset=this.res;
            let arr:Array<string>=as.text.split('----------------\r\n');
            this._csvDict={};
            let n:number=arr.length;
            for(let i:number=0;i<n;i++){
                let name:string=arr[i].substring(0,arr[i].indexOf("\r\n"));
                let ct:string=arr[i].substring(arr[i].indexOf("\r\n")+2);
                this._csvDict[name]=ct;
            }
        }
        return this._csvDict;
    }
    /**加载cc.JsonAssets的时候才可通过此属性获取数据 */
    public get json():any{
        let as:cc.JsonAsset=this.res;
        return as.json;
    }
    /**添加回调，如果资源未加载完成则返回true,如果已加载完成则会直接调用回调并返回false */
    public addCb(target,func:Function){
        if(this.status!=2){
            this.cbList.push({cb:func,target:target});
            return true;
        }else func.apply(target,[this.res]);
        return false;
    }
    public onProgress(complateNum:number,totalNum:Number){
        let n:number=this.progressList.length;
        for(let i:number=0;i<n;i++){
            if(this.cbList[i].progress)this.progressList[i].progress.apply(this.progressList[i].target,[complateNum,totalNum]);
        }
    }
    public onComplete(){
        this.status=2;
        while(this.cbList.length>0){
            let obj=this.cbList.shift();
            obj.cb.apply(obj.target,[this]);
        }
    }
    public disUse(){
        this._use--;
    }
}