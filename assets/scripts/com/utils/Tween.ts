/*
 * @Author: phhui
 * @Date: 2021-02-04 09:03:27
 * @LastEditTime: 2021-03-04 11:42:15
 * @LastEditors: phhui
 * @Description: 根据个人喜好封装的类，仅是改变了下调用方法
 * @FilePath: \ro\assets\Script\com\utils\Tween.ts
 */

class Tween{
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
        if(param.opacity)nd.opacity=param.opacity;
        if(param.angle)nd.angle=param.angle;
        this.to(nd,time,toParam,easing);
    }
    private static t(nd:cc.Node,time:number,param:any,easing:any=null,to:boolean=true){
        if(!param)return;
        let delay=param.delay;
        let call=param.call;
        let target=param.target;
        delete param.call;
        delete param.delay;
        delete param.target;
        let t=cc.tween(nd);
        if(delay)t=t.delay(delay);
        if(to)t=t.to(time,param,easing);
        else t=t.by(time,param,easing);
        if(call)t=t.call(target?call.bind(target):call);
        t.start();
        return t;
    }
}
window["Tween"]=Tween;