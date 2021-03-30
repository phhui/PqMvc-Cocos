/**
 * @ Author: phhui
 * @ Create Time: 2020-12-02 15:01:15
 * @ Modified by: phhui
 * @ Modified time: 2020-12-14 16:49:02
 * @ Description:
 */

/**此类只是为了减少代码量设计的，无其它用途 */
class CUtils{
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
}
window["CUtils"]=CUtils;