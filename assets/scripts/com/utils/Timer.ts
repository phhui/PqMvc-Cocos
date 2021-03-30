/**
 * @ Author: phhui
 * @ Create Time: 2021-01-27 09:09:18
 * @ Modified by: phhui
 * @ Modified time: 2021-01-28 16:54:00
 * @ Description:
 */

class Timer{
    public static frame:number=60;
    public static farmeCount:number=0;
    public static s: number = 50;//计时间隔(毫秒)
    private static timeEventList: Object={};
    private static inited: Boolean = false;
    private static runTimer:boolean=false;
    private static _objPool:Array<any>=[];
    private static time:any;
    constructor() {
    }
    static init() {
        Timer.inited = true;
    }
    /**
     *创建计时器
     * @param key 名字
     * @param interval 间隔(秒)
     * @param callBack 回调方法
     * @param target  回调目标
     * @param param 回调参数
     * @param execNum 执行次数
     *
     */
    static addListen(key: string, interval: number, callBack: Function, target: any, param: any = null, execNum: number = -1): void {
        if (!Timer.inited) Timer.init()
        if (Timer.timeEventList[key]) return;
        if (interval*1000 < Timer.s) interval = Timer.s;
        Timer.timeEventList[key] = Timer._newObj(key,callBack,target,param,Timer.farmeCount, interval*1000, execNum);
        if(!Timer.runTimer){
            Timer.time=setInterval(Timer.run,Timer.s);
            Timer.runTimer=true;
        }
    }
    static setTimeOut(key: string, interval: number, callBack: Function, target: any, param: any = null): void {
        Timer.addListen(key, interval, callBack, target, param, 1);
    }
    static hasEvent(key:string):boolean{
        return Timer.timeEventList[key];
    }
    /**
     *删除指定计时
     * @param key 名字
     *
     */
    static removeListen(key: string): void {
        Timer._freeObj(Timer.timeEventList[key]);
        Timer.timeEventList[key] = null;
    }
    static sys_remove_all_listen(){
        for(let i in Timer.timeEventList){
            Timer.removeListen(i);
        }
        Timer.timeEventList={};
    }
    static run(): void {
        Timer.farmeCount+=1;
        let hasItem:boolean=false;
        for (let i in Timer.timeEventList) {
            let o:any = Timer.timeEventList[i];
            if(o)hasItem=true;
            if (o != null && o.func != null && (Timer.farmeCount - o.time) * Timer.s >= o.interval) {
                if(o.execNum!=-1){
                    o.execNum--;
                    if(o.execNum<1){
                        Timer.timeEventList[i]=null;
                        delete Timer.timeEventList[i];
                    }
                }
                if (o.param != null) o.func.apply(o.target,[o.param]);
                else o.func.apply(o.target,null);
                if (o.execNum ==0)Timer._freeObj(o);
                else o.time = Timer.farmeCount;
            }
        }
        if(!hasItem){
            // console.log("not timer task,timer stop!");
            clearInterval(Timer.time);
            Timer.runTimer=false;
        }
    }
    static _newObj(key,func, target, param, time=null, interval=null, execNum=null){
        let obj;
        if(Timer._objPool.length){
            obj=Timer._objPool.shift();
            obj.key=key;
            obj.func=func;
            obj.target=target;
            obj.param=param;
            obj.time=time;
            obj.interval=interval;
            obj.execNum=execNum;
        }else obj={key:key,func: func, target: target, param: param, time:time, interval: interval, execNum: execNum};
        return obj;
    }
    static _freeObj(obj){
        if(!obj)return;
        obj.key=null;
        obj.func=null;
        obj.target=null;
        obj.once=null;
        obj.param=null;
        obj.time=null;
        obj.interval=null;
        obj.execNum=null;
        Timer._objPool.push(obj);
    }
}
window["Timer"]=Timer;