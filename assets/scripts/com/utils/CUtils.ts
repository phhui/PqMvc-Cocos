/**
 * @ Author: phhui
 * @ Create Time: 2020-12-02 15:01:15
 * @ Modified by: phhui
 * @ Modified time: 2021-09-09 11:25:02
 * @ Description:
 */

/**此类只是为了减少代码量设计的，无其它用途 */
export default class CUtils{
    /**获取节点世界坐标,不确定有没有BUG */
    public static getPos(nd:cc.Node){
        let x:number=nd.x;
        let y:number=nd.y;
        let tmp:cc.Node=nd.parent;
        while(tmp&&tmp.name!="Canvas"){
            x+=tmp.x;
            y+=tmp.y;
            tmp=tmp.parent;
        }
        tmp=null;
        return cc.v2(x,y);
    }
    /**矩形碰撞检测    
     * @param nd 碰撞对象
     * @param target 被碰撞对象
     * @param hitType 碰撞类型 0区域碰撞  1点对区域
     */
    public static checkHit(nd:cc.Node,target:cc.Node,hitType:number=0){
        let posA:cc.Vec3=cc.director.getScene().convertToNodeSpaceAR(nd.parent.convertToWorldSpaceAR(nd.position));
        let posB:cc.Vec3=cc.director.getScene().convertToNodeSpaceAR(target.parent.convertToWorldSpaceAR(target.position));
        if(hitType==0){
            let xHit:boolean=Math.abs(posA.x-posB.x)<(nd.width*Math.abs(nd.scaleX)+target.width*Math.abs(target.scaleX))*0.5;
            let yHit:boolean=Math.abs(posA.y-posB.y)<(nd.height*Math.abs(nd.scaleY)+target.height*Math.abs(target.scaleY))*0.5;
            return xHit&&yHit;
        }else{
            let xHit:boolean=Math.abs(posA.x-posB.x)<target.width*Math.abs(target.scaleX)*0.5;
            let yHit:boolean=Math.abs(posA.y-posB.y)<target.height*Math.abs(target.scaleY)*0.5;
            return xHit&&yHit;
        }
    }
}
window["CUtils"]=CUtils;