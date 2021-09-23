import Timer from "./Timer";

/*
 * @Author: phhui
 * @Date: 2021-02-04 09:03:27
 * @LastEditTime: 2021-03-04 11:42:15
 * @LastEditors: phhui
 * @Description: 根据个人喜好封装的类，仅是改变了下调用方法
 * @FilePath: \ro\assets\Script\com\utils\Tween.ts
 */
const {ccclass, property} = cc._decorator;
@ccclass
export default class Tween extends cc.Component{
    /**
     * @description: 从当前缓动到B
     * @param {cc} nd 缓动节点
     * @param {number} time 缓动时间
     * @param {any} param 缓动参数
     * @param {any} easing 缓动效果
     * @return {*} cc.tween
     */
    public static to(nd:cc.Node,time:number,param:any,easing:any=null){
        return this.t(nd,time,param,easing);
    }
    /**
     * @description: 
     * @param {cc} nd 缓动节点
     * @param {number} time 缓动时间
     * @param {any} param 缓动参数
     * @param {any} easing 缓动效果
     * @return {*} cc.tween
     */
    public static by(nd:cc.Node,time:number,param:any,easing:any=null){
        return this.t(nd,time,param,easing,false);
    }
    /**
     * @description: 从A缓动到当前，仅支持position,x,y,opacity,angle等参数，其它参数需要重构
     * @param {cc} nd 缓动节点
     * @param {number} time 缓动时间
     * @param {any} param 缓动参数
     * @param {any} easing  缓动效果
     * @return {*}
     */
    public static from(nd:cc.Node,time:number,param:any,easing:any=null){
        let toParam={position:nd.position,opacity:nd.opacity,angle:nd.angle,delay:param.delay,call:param.call};
        if(param.position)nd.setPosition(param.position);
        if(param.x)nd.x=param.x;
        if(param.y)nd.y=param.y;
        if(param.opacity||param.opacity==0)nd.opacity=param.opacity;
        if(param.angle||param.angle==0)nd.angle=param.angle;
        this.to(nd,time,toParam,easing);
    }
    public static stop(nd:cc.Node){
        let t=cc.tween(nd);
        t.stop();
        cc.Tween.stopAllByTarget(nd);
        this.checkRepeat(nd);
    }
    private static t(nd:cc.Node,time:number,param:any,easing:any=null,to:boolean=true){
        if(!param)return;
        Tween.stop(nd);
        let delay=param.delay;
        let call=param.call;
        let target=param.target;
        delete param.call;
        delete param.delay;
        delete param.target;
        let t=cc.tween(nd);
        cc.Tween.stopAllByTarget(nd);
        if(delay)t=t.delay(delay);
        if(to)t=t.to(time,param,easing);
        else t=t.by(time,param,easing);
        if(call)t=t.call(target?call.bind(target):call);
        t.start();
        return t;
    }
    private static tweenList:any=[];
    private fixT:number=0;
    /**此方法有BUG，待修复 */
    public static moveTo(nd:cc.Node,time:number,param:any){
        this.checkRepeat(nd);
        let data:any={};
        if(param.opacity)data.opacity=param.opacity-nd.opacity;
        if(param.scale)data.scale=param.scale-nd.scale;
        if(param.scaleX)data.scaleX=param.scaleX-nd.scaleX;
        if(param.scaleY)data.scaleY=param.scaleY-nd.scaleY;
        if(param.angle)data.angle=param.angle-nd.angle;
        if(param.x)data.x=param.x-nd.x;
        if(param.y)data.y=param.y-nd.y;
        if(param.position){
            data.position={x:param.position.x-nd.x,y:param.position.y-nd.y};
        }
        this.tweenList.push({nd:nd,time:time<0.1?0.1:time,t:0,param:data});
    }
    private static checkRepeat(nd:cc.Node){
        let n:number=this.tweenList.length;
        for(let i:number=0;i<n;i++){
            if(this.tweenList[i].nd.uuid==nd.uuid){
                this.tweenList.splice(i,1);
                n=this.tweenList.length;
                i--;
            }
        }
    }
    update(dt){
        this.fixT+=dt;
        if(this.fixT<1/60)return;
        this.fixT=0;
        let n:number=Tween.tweenList.length;
        if(n<1)return;
        let speed=1/60;
        for(let i:number=0;i<n;i++){
            let obj=Tween.tweenList[i];
            if(!obj)continue;
            let param=obj.param;
            obj.t+=speed;
            speed=speed/obj.time;
            if(param.opacity!=null)obj.nd.opacity+=param.opacity*speed;
            if(param.scale!=null)obj.nd.scale+=param.scale*speed;
            if(param.scaleX!=null)obj.nd.scaleX+=param.scaleX*speed;
            if(param.scaleY!=null)obj.nd.scaleY+=param.scaleY*speed;
            if(param.angle!=null)obj.nd.angle+=param.angle*speed;
            if(param.x!=null)obj.nd.x+=param.x*speed;
            if(param.y!=null)obj.nd.y+=param.y*speed;
            if(param.position!=null){
                obj.nd.x+=param.position.x*speed;
                obj.nd.y+=param.position.y*speed;
            }
            if(obj.t>=obj.time){
                Tween.tweenList.splice(i,1);
                n=Tween.tweenList.length;
                i--;
            }
        }
    }
}
window["Tween"]=Tween;