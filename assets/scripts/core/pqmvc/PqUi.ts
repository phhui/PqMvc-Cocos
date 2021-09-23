/**
 * @ Author: phhui
 * @ Create Time: 2021-08-20 09:56:17
 * @ Modified by: phhui
 * @ Modified time: 2021-08-27 17:45:30
 * @ Description:
 */

import BaseNode from "./BaseNode";
import EventMgr from "./EventMgr";

const {ccclass, property} = cc._decorator;
@ccclass
export default class PqUi extends BaseNode{
    protected inited:boolean=false;
    constructor(){
        super();
    }
    protected init(){
        if(this.inited)return;
        this.inited=true;
    }
    on(event:string,func:Function,target:any){
        EventMgr.on(event,func,target);
    }
    once(event:string,func:Function,target:any){
        EventMgr.once(event,func,target);
    }
    emit(event:string,...args){
        args.unshift(event);
        EventMgr.emit.apply(EventMgr,args);
    }
    off(event:string,target:any){
        EventMgr.off(event,target);
    }
    start(){
        if(!this.inited)this.init();
    }
    onDestroy(){
        this.inited=false;
    }
    getAction(nd:cc.Node){
        return nd.getComponent(nd.name);
    }
    getChild(name:string,nd:cc.Node=null){
        return nd?nd.getChildByName(name):this.node.getChildByName(name);
    }
}