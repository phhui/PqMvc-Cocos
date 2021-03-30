/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-02-02 15:43:02
 * @ Description:
 */

export default class EventMgr{
    public static listenList:Object={};
    public static _objPool:Array<any>=[];
    public static _ctrl:Object={};
    public static once(key:string,func:Function,target:any){
        this._listener(key,func,target,true);
    }
    public static onCtl(key:string,func:Function,target:any){
        this._ctrl[key]=1;
        this._listener(key,func,target);
    }
    public static on(key:string,func:Function,target:any){
        this._listener(key,func,target);
    }
    public static _listener(key:string,func:Function,target:any,once:boolean=false){
        if(EventMgr.checkRepeat(key,func,target))return;
        if(this.listenList[key])this.listenList[key].push(this._newObj(key,func,target,once));
        else this.listenList[key]=[this._newObj(key,func,target,once)];
    }
    public static checkRepeat(key:string,func:Function,target:any){
        if(!this.listenList[key])return false;
        let n:number=this.listenList[key].length;
        for(let i:number=0;i<n;i++){
            let obj:any=this.listenList[key][i];
            if(obj.key==key&&obj.target.uuid===target.uuid)return true;
        }
        return false;
    }
    public static sys_clear_all_listen(){
        EventMgr.listenList={};
    }
    public static off(key:string,target:any=null){
        if(this.listenList[key]){
            if(target){
                let n:number=this.listenList[key].length;
                for(let i:number=0;i<n;i++){
                    let obj:any=this.listenList[key][i];
                    if(obj.key==key&&obj.target.uuid===target.uuid){
                        this._freeObj(this.listenList[key][i]);
                        this.listenList[key][i]=null;
                        this.listenList[key].splice(i,1);
                        return;
                    }
                }
            }else if(this.listenList[key].length>1){
                throw new Error("event【"+key+"】is multiple listener,remove must target param");
            }else{
                this.listenList[key]=null;
                delete this.listenList[key];
            }
        }
    }
    public static emit(key:string,...args){
        if(this._ctrl[key])args.unshift(key);
        if(this.listenList[key]){
            let list=this.listenList[key];
            let n:number=list.length;
            for(let i:number=0;i<n;i++){
                let obj:any=list[i];
                if(obj.once){
                    this.listenList[key][i]=null;
                    this.listenList[key].splice(i,1);
                }
                obj.func.apply(obj.target,args);
                if(obj.once)this._freeObj(obj);
            }
        }else{

        } 
    }
    public static send(e: any, eventType: Array<any>, func: Array<any>, target: any) {
        var n: number = eventType.length;
        for (var i: number = 0; i < n; i++) {
            if ((typeof(eventType[i])=="string"&&e.target.name == eventType[i])||(typeof(eventType[i])=="object"&&e.target.uuid==eventType[i].uuid)) {
                    func[i].apply(target, [eventType[i], e]);
                return;
            }
        } 
	}

    public static _newObj(key:string,func:Function,target:any,once:boolean=false){
        let obj;
        if(this._objPool.length){
            obj=this._objPool.shift();
            obj.key=key;
            obj.func=func;
            obj.target=target;
            obj.once=once;
        }
        else obj={key:key,func:func,target:target,once:once};
        return obj;
    }
    public static _freeObj(obj){
        obj.key=null;
        obj.func=null;
        obj.target=null;
        obj.once=null;
        this._objPool.push(obj);
    }
}
window["EventMgr"]=EventMgr;