import AniType from "../../const/AniType";

/*
 * @Author: phhui
 * @Date: 2021-03-17 10:00:22
 * @LastEditTime: 2021-03-17 11:39:24
 * @LastEditors: phhui
 * @Description: 
 * @FilePath: \ro\assets\Script\com\utils\AniUtils.ts
 */
export default class AniUtils{
    /**初始化动画预制体并添加结束回调 */
    public static initAni(pf:cc.Prefab,parent:cc.Node=null,cb:Function=null,target:any=null):cc.Node{
        let nd:cc.Node=cc.instantiate(pf);
        if(parent)nd.parent=parent;
        if(!cb)return nd;
        let ani:cc.Animation=nd.getComponent(cc.Animation);
        ani.on(AniType.FINISHED,()=>{
            if(cb)cb.apply(target,[nd]);
        },this);
        return nd;
    }
}