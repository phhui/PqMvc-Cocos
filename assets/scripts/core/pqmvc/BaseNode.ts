import EventMgr from "./EventMgr";

const {ccclass, property} = cc._decorator;
@ccclass
export default class BaseNode extends cc.Component{
    protected eventList:any={};
    protected on(event:string,func:Function,target:any){
        EventMgr.on(event,func,target);
    }
    protected once(event:string,func:Function,target:any){
        EventMgr.once(event,func,target);
    }
    protected emit(event:string,...args){
        args.unshift(event);
        EventMgr.emit.apply(EventMgr,args);
    }
    protected off(event:string,target:any){
        EventMgr.off(event,target);
    }
    public onEv(nd:cc.Node,eventType:string,cb:Function,useCapture:boolean=false){
        let key:string=nd.name+"_"+nd.uuid+eventType;
        if(this.eventList[key])return;
        this.eventList[key]=[nd,eventType,cb,useCapture];
        nd.on(eventType,cb,this,useCapture);
    }
    public offEvent(nd:cc.Node,eventType:string){
        let key:string=nd.name+"_"+nd.uuid+eventType;
        nd.off(eventType,this.eventList[key][2],this.eventList[key][3]);
        if(this.eventList[key])delete this.eventList[key];
    }
}