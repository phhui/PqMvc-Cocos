/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: Your name
 * @ Modified time: 2021-03-30 21:51:59
 * @ Description:
 */

class BaseObject implements IBaseObject{
    private _pool:Array<any>=[];
    private _poolType:string;
    constructor(){
        
    }
    public get(cls:any){
        if(this._pool.length>0)return this._pool.shift();
        return new cls();
    }
    public free(obj:any){
        if(obj==null)return;
        if(obj.destory)obj.destory();
        this._pool.push(obj);
    }
    public destory(){
        
    }
}