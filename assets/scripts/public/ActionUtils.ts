/*
 * @Author: phhui
 * @Date: 2021-02-01 09:57:19
 * @LastEditTime: 2021-02-04 10:03:04
 * @LastEditors: phhui
 * @Description: 别人写的，能用，凑合着用
 * @FilePath: \ro\assets\Script\modules\public\ActionUtils.ts
 */
export default class ActionUtils{
    public static maxNum:number=10;
    public static flyTo(arr:Array<cc.Node>,parent:cc.Node,toPos:cc.Vec3,cb?:Function):void;
    public static flyTo(pf:cc.Prefab,parent:cc.Node,toPos:cc.Vec3,cb?:Function):void;
    public static flyTo(){
        if(arguments.length<1)return;
        let parent:cc.Node=arguments[1];
        let toPos:cc.Vec3=arguments[2];
        let cb:Function=arguments[3];
        let n:number=this.maxNum;
        let pf:cc.Prefab;
        let ndList:Array<cc.Node>;
        if(typeof(arguments[0])!="object")pf=arguments[0];
        else {
            ndList=arguments[0];
            n=ndList.length;
        }
        for(let i:number=0;i<n;i++){
            let nd:cc.Node=pf?cc.instantiate(pf):ndList[i];
            parent.addChild(nd);
            nd.parent=parent;
            if(nd.x==nd.y&&nd.y==0)nd.setPosition(Math.random()*400-200,Math.random()*200-100);
            cc.tween(nd).delay(i*0.1).to(0.6,{position:toPos}).call(()=>{
                if(cb)cb(nd);
                // nd.destroy();
            }).start();
        }
    }
    //场景文字提示:文字上升后移除
    public static playFloatText(node:cc.Node)
    {
        let src_x = node.x,src_y=node.y;
        node.opacity =0;
        cc.tween(node)
            .to(0.2, { opacity: 255 })
            .delay(0.8) // 延迟 3s
            .to(0.2,{scale:0.2,opacity: 0, position:cc.v3(src_x, src_y+200,0)})//
            .call(() => { node.removeFromParent(); })
            .start();
    }
    /**整型数字跳动 DigitNode 文本框，prefixStr 前缀（比如+号），suffixStr 后缀，srcDigit 原来的数字 
    *destDigit目标数字 scPerAnimate多少秒跳动一次数字，scTotal 总共用多少秒完成动画*/
   public static DigitAni(DigitNode:cc.Node,prefixStr:string="",srcDigit:number,destDigit:number,suffixStr:string="",scPerAnimate=0.4,scTotal=0.4)
   {
        // srcDigit=Math.round(srcDigit*100)/100;
        // destDigit=Math.round(destDigit*100)/100;
        let AnimationCount = Math.max(1,Math.floor(scTotal/scPerAnimate) );//跳动次数 最少跳1次
        let digitPerCount=  (destDigit-srcDigit)/AnimationCount;//每次跳多少
        let DigitLabel=DigitNode.getComponent(cc.Label);
        DigitLabel.string=prefixStr+srcDigit.toString()+suffixStr;
        let ScaleAction=cc.sequence(cc.scaleTo(0.2,1.5,1.5),cc.delayTime(0.05),cc.scaleTo(0.1,1,1));
        let actArray=[];
        for(let i=0;i<=AnimationCount-1;++i){
            if( i== AnimationCount-1){
                actArray.push(cc.callFunc(function(target, data) {
                    if(Math.floor(destDigit) === destDigit){
                        DigitLabel.string=prefixStr+destDigit+suffixStr;
                    }else{
                        DigitLabel.string=prefixStr+destDigit.toFixed(2)+suffixStr;
                    }
                    
                },this));//最后一次跳动
            }else{
                actArray.push(cc.callFunc(function(target, data) {
                    let DigitNow:string;
                    if(Math.floor(destDigit) === destDigit){
                        DigitNow = Math.floor(srcDigit+digitPerCount*i +0.5).toString();
                    }
                    else
                    {//小数，保留2位
                        DigitNow =(srcDigit+digitPerCount*i).toFixed(2);
                    }
                    DigitLabel.string=prefixStr+DigitNow+suffixStr;
                },this));//跳动
                actArray.push(cc.delayTime(scPerAnimate));
            }
        }
        //同步执行缩放和跳动
        DigitNode.runAction(cc.spawn(ScaleAction,cc.sequence(actArray) ));
   }
}